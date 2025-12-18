import { Hero } from "@/components/Hero"
import { WineCarousel } from "@/components/WineCarousel"
import { StoryScroll } from "@/components/StoryScroll"
import { DiscoverySection } from "@/components/DiscoverySection";
import { getHeroSection } from "@/lib/hero-api";
import { getCollectionWines } from "@/lib/collection-api";

export default async function Home() {
  const heroData = await getHeroSection();
  const collectionWines = await getCollectionWines();

  return (
    <main className="flex flex-col min-h-screen">
      <Hero data={heroData} />
      <WineCarousel wines={collectionWines} />
      <StoryScroll />
      <DiscoverySection />
    </main>
  )
}
