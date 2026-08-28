import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const isEnglish = locale === 'en';

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`, {
            next: { revalidate: 3600, tags: ['products'] },
        });
        if (res.ok) {
            const categories = await res.json();
            const category = categories.find((c: any) => c.slug === slug);

            if (category) {
                const name = isEnglish && category.nameEn ? category.nameEn : category.name;
                const title = isEnglish ? `${name} Wines | Ocho Tierras` : `Vinos ${name} | Ocho Tierras`;
                const description = isEnglish
                    ? `Shop our ${name} wines from the Limarí Valley, Chile.`
                    : `Descubre nuestros vinos de la categoría ${name}, del Valle del Limarí, Chile.`;

                return {
                    title,
                    description,
                    alternates: buildAlternates(`/tienda/categoria/${slug}`, locale),
                    openGraph: { title, description },
                };
            }
        }
    } catch (e) {}

    return {
        title: 'Categoría | Ocho Tierras',
        alternates: buildAlternates(`/tienda/categoria/${slug}`, locale),
    };
}

export default function CategoriaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
