"use client"

import { Hero } from "@/components/Hero"
import { WineCarousel } from "@/components/WineCarousel"
import { StoryScroll } from "@/components/StoryScroll"
import { DiscoverySection } from "@/components/DiscoverySection";
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <WineCarousel />
      <StoryScroll />
      <DiscoverySection />
    </main>
  )
}
