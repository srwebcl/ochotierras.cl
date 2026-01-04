"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { StoreProductGrid } from "@/components/StoreProductGrid"
import { StoreHeroCarousel } from "@/components/StoreHeroCarousel"
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

            {/* Sticky Floating Filters */}
            <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-md shadow-md border-y border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center py-4 overflow-x-auto no-scrollbar gap-2 md:gap-4">
                        <button
                            onClick={() => handleCategoryClick('todos')}
                            className={cn(
                                "whitespace-nowrap px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium tracking-wide",
                                selectedCategory === 'todos'
                                    ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105"
                                    : "bg-transparent text-gray-600 border-gray-200 hover:border-brand-dark/50 hover:text-brand-dark"
                            )}
                        >
                            {t('filters.all')}
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={cn(
                                    "whitespace-nowrap px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium tracking-wide uppercase",
                                    selectedCategory === cat.slug
                                        ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105"
                                        : "bg-transparent text-gray-600 border-gray-200 hover:border-brand-dark/50 hover:text-brand-dark"
                                )}
                            >
                                {isEnglish && cat.nameEn ? cat.nameEn : cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <Section id="product-grid" className="pb-32 bg-gray-50 min-h-[600px]">
                <div className="container mx-auto px-4">
                    <StoreProductGrid filterCategory={selectedCategory} />
                </div>
            </Section>
        </div>
    )
}
