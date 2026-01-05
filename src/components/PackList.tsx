"use client"

import { useState, useEffect, useRef } from "react"
import { PackCard } from "./PackCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PackList({ locale }: { locale: string }) {
    const [packs, setPacks] = useState<any[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/packs`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPacks(data)
                }
            })
            .catch(err => console.error("Error fetching packs:", err))
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (packs.length === 0) return null;

    return (
        <div className="relative w-full">
            <div className="flex items-center gap-4">

                {/* Left Arrow - Always Visible, Outside */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll('left')}
                    className="hidden md:flex shrink-0 rounded-full border-white/20 text-white bg-white/5 hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold shadow-md h-12 w-12 z-10 transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className={cn(
                        "flex-1 flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar",
                        // Center items logic is handled by flex distribution and width
                        packs.length <= 3 ? "md:justify-center" : ""
                    )}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {packs.map(pack => (
                        <div
                            key={pack.id}
                            // Width logic: 
                            // Mobile: 85vw (peek next)
                            // Desktop: STRICT 1/3 width to prevent content from expanding card
                            className="min-w-[85vw] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] md:max-w-[calc(33.333%-1rem)] snap-center shrink-0"
                        >
                            <PackCard product={pack} locale={locale} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow - Always Visible, Outside */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll('right')}
                    className="hidden md:flex shrink-0 rounded-full border-white/20 text-white bg-white/5 hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold shadow-md h-12 w-12 z-10 transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
    )
}
