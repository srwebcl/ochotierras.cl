import { Hero } from "@/components/Hero"
import { NuestraVina } from "@/components/NuestraVina"
import { StoryScroll } from "@/components/StoryScroll"
import { DiscoverySection } from "@/components/DiscoverySection";

interface HeroSection {
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  buttonText?: string;
  buttonTextEn?: string;
  buttonPrimaryUrl?: string;
  buttonSecondaryText?: string;
  buttonSecondaryTextEn?: string;
  buttonSecondaryUrl?: string;
  image?: string;
}

async function getHeroSections(): Promise<HeroSection[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/hero-section`, {
      next: { revalidate: 3600, tags: ['heroes'] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data) return [data];
    return [];
  } catch (e) {
    console.error('Failed to fetch hero sections:', e);
    return [];
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  const heroes = await getHeroSections();

  // Misma transformación que antes hacía Hero.tsx en el navegador (título,
  // subtítulo y botones según el idioma) — ahora se resuelve en el servidor
  // para que el hero aparezca ya armado en el primer HTML, sin depender de
  // que el navegador vuelva a pedirlo.
  const heroSlides = heroes.map(hero => ({
    title: isEnglish ? (hero.titleEn || hero.title) : (hero.title || "Ochotierras"),
    subtitle: isEnglish ? (hero.subtitleEn || hero.subtitle) : (hero.subtitle || "Valle del Limarí"),
    button_primary_text: isEnglish ? (hero.buttonTextEn || hero.buttonText) : hero.buttonText,
    button_primary_url: hero.buttonPrimaryUrl,
    button_secondary_text: isEnglish ? (hero.buttonSecondaryTextEn || hero.buttonSecondaryText) : hero.buttonSecondaryText,
    button_secondary_url: hero.buttonSecondaryUrl,
    images: hero.image ? [hero.image] : undefined,
  }));

  return (
    <main className="flex flex-col min-h-screen">
      <Hero data={heroSlides.length > 0 ? heroSlides : undefined} />
      <NuestraVina />
      <StoryScroll />
      <DiscoverySection />
    </main>
  )
}
