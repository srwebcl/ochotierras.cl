import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Our Wines | Ocho Tierras' : 'Nuestros Vinos | Ocho Tierras';
    const description = isEnglish
        ? 'Explore the wine collection from Viña Ochotierras — Cabernet Sauvignon, Syrah and more, a unique expression of the Limarí Valley.'
        : 'Explora la colección de vinos de Viña Ochotierras — Cabernet Sauvignon, Syrah y más, una expresión única del Valle del Limarí.';

    return {
        title,
        description,
        alternates: buildAlternates('/nuestros-vinos', locale),
        openGraph: { title, description },
    };
}

export default function NuestrosVinosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
