import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`);
        if (res.ok) {
            const products = await res.json();
            const product = products.find((p: any) => p.slug === slug);
            
            if (product) {
                const title = locale === 'en' && product.nameEn ? product.nameEn : product.name;
                const desc = locale === 'en' && product.descriptionEn ? product.descriptionEn : product.description;
                
                return {
                    title: `${title} | Ocho Tierras`,
                    description: desc?.substring(0, 160),
                    openGraph: {
                        title: title,
                        description: desc?.substring(0, 160),
                        images: product.image ? [product.image] : [],
                    }
                };
            }
        }
    } catch (e) {}

    return {
        title: 'Vino | Ocho Tierras'
    };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
