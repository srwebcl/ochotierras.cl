"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { StoreProductGrid } from "@/components/StoreProductGrid"
import { StoreHeroCarousel } from "@/components/StoreHeroCarousel"
import { PackList } from "@/components/PackList"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

import { useTranslations, useLocale } from "next-intl"

interface Category {
    id: number;
    name: string;
    nameEn?: string;
    slug: string;
}

export default function Tienda() {
    const t = useTranslations('Tienda');
    const locale = useLocale();
    const isEnglish = locale === 'en';

    const [selectedCategory, setSelectedCategory] = useState<string>('todos')
    const [categories, setCategories] = useState<Category[]>([])

    // Fetch categories on mount
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data)
                }
            })
            .catch(err => console.error("Error fetching categories:", err))
    }, [])

    const handleCategoryClick = (slug: string) => {
        setSelectedCategory(slug)
        // Smooth scroll to grid (optional, but nice)
        const grid = document.getElementById('product-grid')
        if (grid) {
            const yOffset = -150; // Offset for sticky header
            const y = grid.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Mobile-First Hero Carousel */}
            <StoreHeroCarousel />


            {/* Packs Section - Full Width Dark Strip (Now Outside Section for True Full Width) */}
            {(selectedCategory === 'todos' || selectedCategory === 'packs') && (
                <div className="w-full bg-neutral-900 py-16 shadow-2xl relative z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-brand-gold/50 flex-1"></div>
                            <h2 className="text-3xl md:text-4xl font-serif text-white font-bold uppercase tracking-widest text-center">
                                Packs de Vinos <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold animate-gradient-x">Ochotierras</span>
                            </h2>
                            <div className="h-px bg-brand-gold/50 flex-1"></div>
                        </div>
                        <PackList locale={locale} />
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <Section id="product-grid" className="bg-gray-50 min-h-[600px] pb-32 pt-16">
                <div className="container mx-auto px-4">
                    {/* Standard Wine Grid */}
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xl md:text-2xl font-serif text-gray-400 font-medium uppercase tracking-widest">
                            Nuestros Vinos
                        </h2>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <StoreProductGrid filterCategory={selectedCategory} />
                </div>
            </Section>
        </div>
    )
}
