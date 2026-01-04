"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
    accentColorHex?: string
}

interface CategorySectionProps {
    id?: string
    index: number
    title: string
    description: string
    wines: Wine[]
    theme?: 'light' | 'dark' | 'gold'
    reversed?: boolean
}

export function CategorySection({ id, index, title, description, wines, theme = 'light', reversed = false }: CategorySectionProps) {
    const t = useTranslations('NuestrosVinos');
    const [activeIndex, setActiveIndex] = useState(0);

    const nextWine = () => {
        setActiveIndex((prev) => (prev + 1) % wines.length);
    };

    const prevWine = () => {
        setActiveIndex((prev) => (prev - 1 + wines.length) % wines.length);
    };

    const activeWine = wines[activeIndex];
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    // Theme Configuration
    const themeStyles = {
        light: {
            bg: "bg-[#F5F5F7]",
            text: "text-gray-900",
            subtext: "text-gray-600",
            accent: "bg-brand-gold",
            navBtn: "border-gray-300 text-gray-500 hover:bg-brand-dark hover:text-white",
            dotActive: "bg-brand-dark",
            dotInactive: "bg-gray-300 hover:bg-gray-400",
            bigType: "text-gray-200"
        },
        dark: {
            bg: "bg-brand-dark",
            text: "text-white",
            subtext: "text-gray-300",
            accent: "bg-brand-gold",
            navBtn: "border-gray-600 text-gray-300 hover:bg-white hover:text-brand-dark",
            dotActive: "bg-white",
            dotInactive: "bg-white/20 hover:bg-white/40",
            bigType: "text-white/5"
        },
        gold: {
            bg: "bg-[#F9F6F0]",
            text: "text-brand-dark",
            subtext: "text-gray-700",
            accent: "bg-brand-dark",
            navBtn: "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white",
            dotActive: "bg-[#D4AF37]",
            dotInactive: "bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40",
            bigType: "text-[#D4AF37]/10"
        }
    };

    const currentTheme = themeStyles[theme];

    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) return '/images/bottles/placeholder.webp';

        const staticMap: Record<string, string> = {
            'reserva-privada-carmenere.jpg': '/images/bottles/Reserva Privada Carmenere.webp',
            'gran-reserva-ensamblaje.jpg': '/images/bottles/vino-gran-reserva-24-barricas.webp',
            'gran-reserva-syrah.jpg': '/images/bottles/GR 10 Barricas.webp'
        };

        const filename = imagePath.split('/').pop();
        if (filename && staticMap[filename]) {
            return staticMap[filename];
        }

        if (imagePath.startsWith('/storage')) {
            const baseUrl = (process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage').replace(/\/storage\/?$/, '');
            return `${baseUrl}${imagePath}`;
        }

        if (imagePath.includes('api.ochotierras.cl/storage')) {
            const localBase = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';
            if (localBase.includes('localhost') || localBase.includes('127.0.0.1')) {
                return imagePath.replace('https://api.ochotierras.cl/storage', localBase.replace(/\/$/, ''));
            }
        }

        return imagePath;
    };

    return (
        <section id={id} className={cn("min-h-[85vh] flex items-center py-12 md:py-16 relative overflow-hidden", currentTheme.bg)}>

            {/* Cinematic Big Type Background */}
            <div className={cn("absolute top-0 left-0 text-[15rem] md:text-[20rem] font-serif font-bold leading-none select-none pointer-events-none z-0 mix-blend-multiply opacity-50", currentTheme.bigType)}
                style={{ transform: reversed ? 'translateX(50%)' : 'translateX(-20%)' }}>
                {formattedIndex}
            </div>

            {theme === 'dark' && (
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent pointer-events-none" />
            )}

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Column 1: Editorial Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("lg:col-span-5 flex flex-col justify-center", reversed ? "lg:order-2 lg:col-start-8" : "lg:order-1")}
                    >
                        <span className={cn("text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-70", currentTheme.text)}>
                            Nuestros Vinos
                        </span>

                        <h2 className={cn("text-5xl md:text-7xl font-serif font-bold mb-6 leading-[0.9]", currentTheme.text)}>
                            {title}
                        </h2>

                        <div className={cn("w-full h-[1px] mb-6 opacity-30", theme === 'dark' ? "bg-white" : "bg-black")} />

                        <p className={cn("text-lg md:text-xl font-light leading-relaxed mb-8 text-justify lg:text-left max-w-md", currentTheme.subtext)}>
                            {description}
                        </p>

                        {/* Navigation Controls - Removed from here, moved to image side */}
                    </motion.div>

                    {/* Column 2: Cinematic Carousel */}
                    <div className={cn("lg:col-span-7 relative h-[400px] md:h-[550px] w-full flex items-center justify-center perspective-1000 group", reversed ? "lg:order-1 lg:col-end-7" : "lg:order-2")}>

                        {/* Desktop Navigation Arrows */}
                        {wines.length > 1 && (
                            <>
                                <button
                                    onClick={prevWine}
                                    className={cn("hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95", currentTheme.navBtn)}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextWine}
                                    className={cn("hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95", currentTheme.navBtn)}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeWine.id}
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full h-full flex flex-col items-center justify-center pt-10"
                            >
                                {/* Floating Background Text - Centered */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 mix-blend-difference w-full pointer-events-none"
                                >
                                    <span className={cn("text-[8rem] md:text-[10rem] font-serif font-bold opacity-10 leading-none select-none whitespace-nowrap text-center", theme === 'dark' ? "text-white" : "text-black")}>
                                        {(() => {
                                            const lowerName = activeWine.name.toLowerCase();
                                            if (lowerName.includes('ensamblaje')) return 'Ensamblaje';
                                            if (lowerName.includes('cabernet')) return 'Cabernet';
                                            if (lowerName.includes('syrah')) return 'Syrah';
                                            if (lowerName.includes('carmenere')) return 'Carmenere';
                                            if (lowerName.includes('chardonnay')) return 'Chardonnay';
                                            if (lowerName.includes('merlot')) return 'Merlot';
                                            if (lowerName.includes('pinot')) return 'Pinot';
                                            if (lowerName.includes('sauvignon')) return 'Sauvignon';
                                            return activeWine.subtitle.split(' ')[0];
                                        })()}
                                    </span>
                                </motion.div>

                                {/* Bottle Image */}
                                <Link
                                    href={`/coleccion/${activeWine.slug}`}
                                    className="relative h-[75%] w-full flex items-center justify-center group cursor-pointer z-30"
                                >
                                    {/* Dynamic Glow */}
                                    <div
                                        className="absolute w-[300px] h-[300px] rounded-full opacity-20 group-hover:opacity-40 blur-[80px] transition-opacity duration-1000"
                                        style={{ backgroundColor: activeWine.accentColorHex || '#D4AF37' }}
                                    />

                                    <Image
                                        src={getImageUrl(activeWine.image)}
                                        alt={activeWine.name}
                                        fill
                                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
                                        priority
                                        unoptimized
                                    />
                                </Link>

                                {/* Minimalist CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 text-center z-30"
                                >
                                    <h3 className={cn("text-2xl md:text-3xl font-serif font-bold mb-4", currentTheme.text)}>
                                        {activeWine.name}
                                    </h3>

                                    <Link
                                        href={`/coleccion/${activeWine.slug}`}
                                        className={cn(
                                            "inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 group/link border-b pb-1",
                                            theme === 'dark'
                                                ? "text-white border-white/30 hover:border-white"
                                                : "text-brand-dark border-brand-dark/30 hover:border-brand-dark"
                                        )}
                                    >
                                        {t('view_detail')}
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-2" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Controls Overlay */}
                        {wines.length > 1 && (
                            <>
                                {/* Arrows (Just below the neck of the bottle) */}
                                <button
                                    onClick={prevWine}
                                    className={cn("lg:hidden absolute left-2 top-[35%] -translate-y-1/2 z-40 p-3 rounded-full border backdrop-blur-sm transition-all duration-300 active:scale-95", currentTheme.navBtn)}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={nextWine}
                                    className={cn("lg:hidden absolute right-2 top-[35%] -translate-y-1/2 z-40 p-3 rounded-full border backdrop-blur-sm transition-all duration-300 active:scale-95", currentTheme.navBtn)}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>


                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
