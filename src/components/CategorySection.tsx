"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    // Theme Configuration
    const themeStyles = {
        light: {
            bg: "bg-[#F5F5F7]",
            text: "text-gray-900",
            subtext: "text-gray-600",
            accent: "bg-brand-gold",
            bigType: "text-gray-200"
        },
        dark: {
            bg: "bg-brand-dark",
            text: "text-white",
            subtext: "text-gray-300",
            accent: "bg-brand-gold",
            bigType: "text-white/5"
        },
        gold: {
            bg: "bg-[#F9F6F0]",
            text: "text-brand-dark",
            subtext: "text-gray-700",
            accent: "bg-brand-dark",
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

        return imagePath;
    };

    return (
        <section id={id} className={cn("min-h-[70vh] flex items-center py-16 md:py-20 relative overflow-hidden", currentTheme.bg)}>

            {/* Cinematic Big Type Background */}
            <div className={cn("absolute top-0 left-0 text-[18rem] md:text-[25rem] font-serif font-bold leading-none select-none pointer-events-none z-0 mix-blend-multiply opacity-50", currentTheme.bigType)}
                style={{ transform: reversed ? 'translateX(50%)' : 'translateX(-20%)' }}>
                {formattedIndex}
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Column 1: Category Details */}
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("lg:col-span-5 flex flex-col justify-center", reversed ? "lg:order-2 lg:col-start-8" : "lg:order-1")}
                    >
                        <span className={cn("text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-70", currentTheme.text)}>
                            Nuestra Colección
                        </span>

                        <h2 className={cn("text-5xl md:text-7xl font-serif font-bold mb-8 leading-[0.9]", currentTheme.text)}>
                            {title}
                        </h2>

                        <div className={cn("w-24 h-[2px] mb-10", theme === 'dark' ? "bg-brand-gold" : "bg-brand-dark")} />

                        <p className={cn("text-base md:text-lg font-light leading-relaxed mb-12 text-justify lg:text-left italic font-serif", currentTheme.subtext)}>
                            {description}
                        </p>

                        {/* Strains Display if any */}
                        {wines.length > 0 && (
                            <div className="flex flex-wrap gap-4 opacity-40">
                                {Array.from(new Set(wines.map(w => w.name.split(' ').pop()))).map(strain => (
                                    <span key={strain} className={cn("text-[10px] font-bold uppercase tracking-widest border px-3 py-1 rounded-full", currentTheme.text, currentTheme.text === 'text-white' ? 'border-white/20' : 'border-black/20')}>
                                        {strain}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Column 2: Varieties Display (Two Columns Grid within this column) */}
                    <div className={cn("lg:col-span-7 relative h-full w-full", reversed ? "lg:order-1 lg:col-end-7" : "lg:order-2")}>
                        <div className={cn("grid gap-8 md:gap-12", wines.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                            {wines.map((wine, i) => (
                                <motion.div
                                    key={wine.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    className="group flex flex-col items-center"
                                >
                                    <Link 
                                        href={`/coleccion/${wine.slug}`} 
                                        className="relative h-[260px] md:h-[380px] w-full flex items-center justify-center cursor-pointer"
                                    >
                                        {/* Subtle Aura */}
                                        <div 
                                            className="absolute w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-1000"
                                            style={{ backgroundColor: wine.accentColorHex || '#D4AF37' }}
                                        />
                                        
                                        <Image
                                            src={getImageUrl(wine.image)}
                                            alt={wine.name}
                                            fill
                                            className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.2)] group-hover:scale-105 group-hover:-translate-y-6 transition-transform duration-1000 cubic-bezier(0.25, 1, 0.5, 1)"
                                            unoptimized
                                        />
                                    </Link>

                                    <div className="mt-8 text-center px-4">
                                        <span className={cn("block text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-50", currentTheme.text)}>
                                            {wine.subtitle}
                                        </span>
                                        <h3 className={cn("text-xl md:text-2xl font-serif font-bold mb-4 min-h-[3.5rem] flex items-center justify-center", currentTheme.text)}>
                                            {wine.name}
                                        </h3>
                                        <Link
                                            href={`/coleccion/${wine.slug}`}
                                            className={cn(
                                                "inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b pb-1 mx-auto",
                                                theme === 'dark' ? "text-white/60 border-white/20 hover:text-white hover:border-white" : "text-brand-dark/60 border-brand-dark/20 hover:text-brand-dark hover:border-brand-dark"
                                            )}
                                        >
                                            {t('view_detail')}
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
