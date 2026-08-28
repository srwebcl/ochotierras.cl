import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Shop Our Wines | Ocho Tierras' : 'Tienda de Vinos | Ocho Tierras';
    const description = isEnglish
        ? 'Buy wines online from Viña Ochotierras: Cabernet Sauvignon, Syrah, gift packs and more, shipped across Chile.'
        : 'Compra vinos online de Viña Ochotierras: Cabernet Sauvignon, Syrah, packs de regalo y más, con despacho a todo Chile.';

    return {
        title,
        description,
        alternates: buildAlternates('/tienda', locale),
        openGraph: { title, description },
    };
}

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
