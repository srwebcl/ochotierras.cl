import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'About Us | Ocho Tierras' : 'Nosotros | Ocho Tierras';
    const description = isEnglish
        ? 'Since 1993, Viña Ochotierras has been crafting limited-production wines by hand in the heart of Chile\'s Limarí Valley.'
        : 'Desde 1993, Viña Ochotierras elabora vinos de producción limitada, prácticamente a mano, en el corazón del Valle del Limarí, Chile.';

    return {
        title,
        description,
        alternates: buildAlternates('/nosotros', locale),
        openGraph: { title, description },
    };
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
