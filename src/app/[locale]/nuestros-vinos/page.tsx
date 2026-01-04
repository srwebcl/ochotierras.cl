"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { CategorySection } from '@/components/CategorySection'
import { CinematicHero } from "@/components/CinematicHero"
import { cn } from '@/lib/utils'

interface Wine {
    id: number
    name: string
    nameEn?: string
    subtitle: string
    subtitleEn?: string
    slug: string
    image: string | null
    price: number
    stock: number
    bgGradient: string
}

interface Category {
    id: number
    name: string
    nameEn?: string
    slug: string
    wines: Wine[]
}

export default function NuestrosVinosPage() {
    const t = useTranslations('NuestrosVinos');
    const locale = useLocale();
    const isEnglish = locale === 'en';

    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Filter categories:
                    // 1. Must have wines.
                    // 2. Must NOT be 'packs' or 'estuches'.
                    const filtered = data.filter(cat =>
                        cat.wines.length > 0 &&
                        !cat.slug.toLowerCase().includes('pack') &&
                        !cat.slug.toLowerCase().includes('estuche')
                    );

                    setCategories(filtered);
                    if (filtered.length > 0) {
                        setActiveCategoryId(filtered[0].id);
                    }
                }
            })
            .catch(err => console.error("Failed to fetch categories:", err))
            .finally(() => setIsLoading(false));
    }, []);

    // Helper to get description
    const getCategoryDescription = (slug: string) => {
        if (slug.includes('reserva-especial')) return t('categories.reserva_especial.description');
        if (slug.includes('reserva-privada')) return t('categories.reserva_privada.description');
        if (slug.includes('gran-reserva')) return t('categories.gran_reserva.description');
        return "";
    };

    const getTheme = (index: number) => {
        const themes: ('light' | 'dark' | 'gold')[] = ['light', 'dark', 'gold'];
        return themes[index % themes.length];
    };

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 70; // Adjust for sticky header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center items-center bg-[#F5F5F7]">
                <div className="animate-pulse text-xl font-serif text-brand-dark">{t('loading')}</div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#F5F5F7]">
            {/* Cinematic Hero Section - Standardized Component */}
            <CinematicHero
                title={t('title_main')}
                badge={t('collection_subtitle')}
                description={t('description')}
                backgroundImage="/images/general/back-tienda.jpeg"
            />

            {/* Sticky Navigation Bar - Premium Redesign */}
            <div className="sticky top-0 z-50 transition-all duration-300">
                {/* Solid Black Background */}
                <div className="absolute inset-0 bg-black border-b border-white/10" />

                <div className="container mx-auto px-4 relative">
                    <div className="flex justify-start md:justify-center items-center py-4 md:py-6 overflow-x-auto scrollbar-hide snap-x">
                        <div className="flex items-center gap-8 md:gap-16">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        scrollToCategory(cat.slug);
                                        setActiveCategoryId(cat.id);
                                    }}
                                    className={cn(
                                        "relative text-[10px] md:text-sm font-sans font-bold uppercase tracking-[0.25em] transition-all duration-300 py-2 whitespace-nowrap group",
                                        activeCategoryId === cat.id
                                            ? "text-brand-gold opacity-100"
                                            : "text-white/60 hover:text-white hover:opacity-100"
                                    )}
                                >
                                    {isEnglish && cat.nameEn ? cat.nameEn : cat.name}

                                    {/* Active Indicator Line */}
                                    <span className={cn(
                                        "absolute -bottom-1 left-0 w-full h-[1px] bg-brand-gold transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100",
                                        activeCategoryId === cat.id ? "scale-x-100" : ""
                                    )} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Render All Categories */}
            <div className="flex flex-col relative">
                {/* Global Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -z-10 hidden md:block" />

                {categories.map((cat, idx) => (
                    <CategorySection
                        key={cat.id}
                        id={cat.slug}
                        index={idx}
                        title={isEnglish && cat.nameEn ? cat.nameEn : cat.name}
                        description={getCategoryDescription(cat.slug)}
                        wines={cat.wines.map(w => ({
                            ...w,
                            name: isEnglish && w.nameEn ? w.nameEn : w.name,
                            subtitle: isEnglish && w.subtitleEn ? w.subtitleEn : w.subtitle
                        }))}
                        theme={getTheme(idx)}
                        reversed={idx % 2 !== 0}
                    />
                ))}
            </div>

            {categories.length === 0 && !isLoading && (
                <div className="text-center py-20 bg-white">
                    <p className="text-gray-500 text-lg">{t('empty_message')}</p>
                </div>
            )}
        </main>
    )
}
