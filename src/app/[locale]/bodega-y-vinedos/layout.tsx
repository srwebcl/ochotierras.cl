import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Winery & Vineyards | Ocho Tierras' : 'Bodega & Viñedos | Ocho Tierras';
    const description = isEnglish
        ? 'Discover our underground gravity-fed winery and the vineyards of the Limarí Valley, where every Ochotierras wine is born.'
        : 'Conoce nuestra bodega subterránea, diseñada para usar la gravedad en la elaboración, y los viñedos del Valle del Limarí donde nacen nuestros vinos.';

    return {
        title,
        description,
        alternates: buildAlternates('/bodega-y-vinedos', locale),
        openGraph: { title, description },
    };
}

export default function BodegaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
