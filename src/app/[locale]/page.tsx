import { Hero } from "@/components/Hero"
import { WineCarousel } from "@/components/WineCarousel"
import { StoryScroll } from "@/components/StoryScroll"
import { DiscoverySection } from "@/components/DiscoverySection";
import { getHeroSection } from "@/lib/hero-api";
import { getCollectionWines } from "@/lib/collection-api";

export default async function Home() {
  // Client components now handle their own fetching for reliability
  const collectionWines = await getCollectionWines();

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <WineCarousel wines={collectionWines} />
      <StoryScroll />
      <DiscoverySection />
    </main>
  )
}
