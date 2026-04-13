import { Hero } from "@/components/Hero"
import { NuestraVina } from "@/components/NuestraVina"
import { StoryScroll } from "@/components/StoryScroll"
import { DiscoverySection } from "@/components/DiscoverySection";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <NuestraVina />
      <StoryScroll />
      <DiscoverySection />
    </main>
  )
}
