"use client"

import { Section } from "@/components/ui/Section"
import { useSearchParams } from "next/navigation"
import { StoreProductGrid } from "@/components/StoreProductGrid"
import { StoreHeroCarousel } from "@/components/StoreHeroCarousel"
import { PackList } from "@/components/PackList"
import { useState, useEffect } from "react"

interface TiendaClientProps {
    locale: string
    products: any[]
    packs: any[]
    banners: any[]
}

export default function TiendaClient({ locale, products, packs, banners }: TiendaClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('todos')

    const searchParams = useSearchParams()

    // Handle URL query param for category
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam) {
            setSelectedCategory(categoryParam)
            // Wait for render then scroll
            setTimeout(() => {
                const targetId = categoryParam === 'packs' ? 'packs' : 'product-grid';
                const section = document.getElementById(targetId)
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500)
        } else {
            // Handle Hash Scroll specifically for direct links (e.g. from Hero)
            if (window.location.hash) {
                const targetId = window.location.hash.substring(1); // remove #
                setTimeout(() => {
                    const section = document.getElementById(targetId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    }, [searchParams])

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Mobile-First Hero Carousel */}
            <StoreHeroCarousel banners={banners} />

            {/* Packs Section - Full Width Dark Strip */}
            {(selectedCategory === 'todos' || selectedCategory === 'packs') && (
                <div id="packs" className="w-full bg-neutral-900 py-16 shadow-2xl relative z-20 scroll-mt-4">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-brand-gold/50 flex-1"></div>
                            <h2 className="text-3xl md:text-4xl font-serif text-white font-bold uppercase tracking-widest text-center">
                                Packs de Vinos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold animate-gradient-x">Ochotierras</span>
                            </h2>
                            <div className="h-px bg-brand-gold/50 flex-1"></div>
                        </div>
                        <PackList packs={packs} locale={locale} />
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <Section id="product-grid" className="bg-gray-50 min-h-[600px] pb-32 pt-16 scroll-mt-4">
                <div className="container mx-auto px-4">
                    {/* Standard Wine Grid */}
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xl md:text-2xl font-serif text-gray-400 font-medium uppercase tracking-widest">
                            Nuestros Vinos
                        </h2>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <StoreProductGrid products={products} filterCategory={selectedCategory} />
                </div>
            </Section>
        </div>
    )
}
