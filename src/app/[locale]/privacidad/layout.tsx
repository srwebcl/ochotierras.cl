import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Privacy Policy | Ocho Tierras' : 'Política de Privacidad | Ocho Tierras';

    return {
        title,
        robots: { index: false, follow: true },
        alternates: buildAlternates('/privacidad', locale),
    };
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
