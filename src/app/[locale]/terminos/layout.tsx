import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Terms & Conditions | Ocho Tierras' : 'Términos y Condiciones | Ocho Tierras';

    return {
        title,
        robots: { index: false, follow: true },
        alternates: buildAlternates('/terminos', locale),
    };
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
