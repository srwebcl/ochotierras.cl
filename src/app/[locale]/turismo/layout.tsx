import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Wine Tourism | Ocho Tierras' : 'Turismo Enológico | Ocho Tierras';
    const description = isEnglish
        ? 'Visit Viña Ochotierras in the Limarí Valley: guided tours and wine tastings through our vineyards and underground winery.'
        : 'Visita Viña Ochotierras en el Valle del Limarí: recorridos guiados y degustaciones de vino por nuestros viñedos y bodega subterránea.';

    return {
        title,
        description,
        alternates: buildAlternates('/turismo', locale),
        openGraph: { title, description },
    };
}

export default function TurismoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
