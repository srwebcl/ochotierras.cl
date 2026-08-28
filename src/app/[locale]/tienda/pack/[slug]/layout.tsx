import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

async function getPack(slug: string) {
    try {
        // Next dedupea automáticamente este fetch con el de generateMetadata.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/packs`, {
            next: { revalidate: 3600, tags: ['products'] },
        });
        if (!res.ok) return null;
        const packs = await res.json();
        return packs.find((p: any) => p.slug === slug) ?? null;
    } catch (e) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const isEnglish = locale === 'en';
    const pack = await getPack(slug);

    if (pack) {
        const name = isEnglish && pack.nameEn ? pack.nameEn : pack.name;
        const desc = isEnglish && pack.descriptionEn ? pack.descriptionEn : pack.description;
        const title = `${name} | Ocho Tierras`;

        return {
            title,
            description: desc?.substring(0, 160),
            alternates: buildAlternates(`/tienda/pack/${slug}`, locale),
            openGraph: {
                title,
                description: desc?.substring(0, 160),
                images: pack.image ? [pack.image] : [],
            },
        };
    }

    return {
        title: 'Pack de Vinos | Ocho Tierras',
        alternates: buildAlternates(`/tienda/pack/${slug}`, locale),
    };
}

export default async function PackLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const pack = await getPack(slug);

    return (
        <>
            {pack && (
                // Renderizado en el servidor: la página del pack trae sus datos
                // con useEffect en el cliente, así que el JSON-LD tiene que vivir
                // acá para estar en el HTML inicial que lee Google.
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": locale === 'en' && pack.nameEn ? pack.nameEn : pack.name,
                            "image": pack.image || pack.includes?.[0]?.image || undefined,
                            "description": locale === 'en' && pack.descriptionEn ? pack.descriptionEn : pack.description,
                            "sku": pack.id.toString(),
                            "offers": {
                                "@type": "Offer",
                                "url": `https://www.ochotierras.cl/${locale}/tienda/pack/${slug}`,
                                "priceCurrency": "CLP",
                                "price": pack.stock === 0 ? "0" : pack.price.toString(),
                                "availability": pack.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
                            },
                            "brand": {
                                "@type": "Brand",
                                "name": "Ocho Tierras"
                            }
                        })
                    }}
                />
            )}
            {children}
        </>
    );
}
