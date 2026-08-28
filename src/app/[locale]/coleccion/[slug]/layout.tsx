import { Metadata } from 'next';
import { buildAlternates, SITE_URL } from '@/lib/seo';

// "Colección" muestra el mismo producto que ya vive en /tienda/{slug} — para
// no generar contenido duplicado, el canonical apunta a la ficha real en
// /tienda en vez de declararse a sí misma como la versión canónica.
export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`, {
            next: { revalidate: 3600, tags: ['products'] },
        });
        if (res.ok) {
            const products = await res.json();
            const product = products.find((p: any) => p.slug === slug);

            if (product) {
                const isEnglish = locale === 'en';
                const title = isEnglish && product.nameEn ? product.nameEn : product.name;
                const desc = isEnglish && product.descriptionEn ? product.descriptionEn : product.description;
                const alternates = buildAlternates(`/tienda/${slug}`, locale);

                return {
                    title: `${title} | Ocho Tierras`,
                    description: desc?.substring(0, 160),
                    alternates,
                };
            }
        }
    } catch (e) {}

    return {
        alternates: { canonical: `${SITE_URL}/${locale}/tienda` },
    };
}

export default function ColeccionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
