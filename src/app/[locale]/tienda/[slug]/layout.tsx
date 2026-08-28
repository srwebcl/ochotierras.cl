import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

async function getProduct(slug: string) {
    try {
        // Next dedupea automáticamente este fetch con el de generateMetadata
        // (misma URL + opciones), no se pide dos veces por request.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`, {
            next: { revalidate: 3600, tags: ['products'] },
        });
        if (!res.ok) return null;
        const products = await res.json();
        return products.find((p: any) => p.slug === slug) ?? null;
    } catch (e) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const product = await getProduct(slug);

    if (product) {
        const title = locale === 'en' && product.nameEn ? product.nameEn : product.name;
        const desc = locale === 'en' && product.descriptionEn ? product.descriptionEn : product.description;

        return {
            title: `${title} | Ocho Tierras`,
            description: desc?.substring(0, 160),
            alternates: buildAlternates(`/tienda/${slug}`, locale),
            openGraph: {
                title: title,
                description: desc?.substring(0, 160),
                images: product.image ? [product.image] : [],
            }
        };
    }

    return {
        title: 'Vino | Ocho Tierras',
        alternates: buildAlternates(`/tienda/${slug}`, locale),
    };
}

export default async function ProductLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const product = await getProduct(slug);

    return (
        <>
            {product && (
                // Renderizado en el servidor a propósito: la página del producto
                // trae sus datos con useEffect en el cliente, así que si el
                // JSON-LD viviera solo ahí, no estaría en el HTML inicial que
                // lee Google — acá sí, sin depender de la hidratación.
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": locale === 'en' && product.nameEn ? product.nameEn : product.name,
                            "image": product.image,
                            "description": locale === 'en' && product.descriptionEn ? product.descriptionEn : product.description,
                            "sku": product.id.toString(),
                            "offers": {
                                "@type": "Offer",
                                "url": `https://www.ochotierras.cl/${locale}/tienda/${slug}`,
                                "priceCurrency": "CLP",
                                "price": product.stock === 0 ? "0" : product.price.toString(),
                                "availability": product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
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
