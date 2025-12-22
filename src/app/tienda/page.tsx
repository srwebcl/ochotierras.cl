"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { StoreProductGrid } from "@/components/StoreProductGrid"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function Tienda() {
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
            {/* Powerful Hero */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/general/tienda-fondo.jpeg"
                        alt="Tienda Background"
                        fill
                        className="object-cover opacity-50 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/90 z-10" />
                </div>

                <div className="container relative z-20 text-center px-4 max-w-5xl">
                    <span className="inline-block py-1 px-3 border border-brand-gold/50 rounded-full text-brand-gold text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in backdrop-blur-sm">
                        Catálogo Oficial
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight drop-shadow-2xl animate-fade-in-up">
                        Nuestros Vinos
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        Descubre la expresión única del <span className="text-brand-gold font-serif italic">Valle del Limarí</span>.
                        Vinos con carácter, creados con pasión.
                    </p>
                </div>
            </section>

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
                            TODOS
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
                                {cat.name}
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
