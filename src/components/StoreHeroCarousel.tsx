"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function StoreHeroCarousel() {
    interface Banner {
        id: number
        image: string
        mobile_image?: string | null
        title: string
        highlighted_text?: string
        subtitle?: string
        pre_title?: string
        cta_text?: string
        cta_link?: string
    }

    const [banners, setBanners] = useState<Banner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    // Fetch banners
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/store-banners`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setBanners(data)
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch banners:", err)
                setIsLoading(false)
            })
    }, [])

    // Handle resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const paginate = (newDirection: number) => {
        if (banners.length === 0) return
        let newIndex = index + newDirection
        if (newIndex < 0) newIndex = banners.length - 1
        if (newIndex >= banners.length) newIndex = 0
        setIndex(newIndex)
    }

    // Auto-advance
    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 8000); // 8 seconds per slide for cinematic feel
        return () => clearInterval(timer);
    }, [index, banners.length]);

    if (isLoading) return <div className="w-full h-[600px] flex items-center justify-center text-gray-400">Cargando experiencia...</div>
    if (banners.length === 0) return null

    const currentBanner = banners[index];

    // Helper to split title with highlight
    const renderTitle = (title: string, highlight?: string) => {
        if (!highlight) {
            return title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
            ));
        }

        // Escape special regex characters in the highlight string
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = title.split(new RegExp(`(${escapedHighlight})`, 'gi'));

        return parts.map((part, i) => {
            if (part.toLowerCase() === highlight.toLowerCase()) {
                return (
                    <span key={i} className="inline-block relative px-2 -mx-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic pr-3">
                            {part}
                        </span>
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="relative w-full overflow-hidden bg-brand-dark pb-12 pt-0 md:pt-4">
            {/* Cinematic Wrapper */}
            <div className="relative w-full md:w-[98%] mx-auto h-[600px] md:h-[650px] 2xl:h-[750px] md:rounded-3xl overflow-hidden shadow-2xl group">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBanner.id}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Ken Burns Background Image */}
                        <motion.div
                            className="relative w-full h-full"
                            animate={{ scale: [1, 1.15] }}
                            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        >
                            <Image
                                src={isMobile ? (currentBanner.mobile_image || currentBanner.image) : currentBanner.image}
                                alt={currentBanner.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                        </motion.div>

                        {/* Smart Overlay - Multi-layer for depth */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />
                    </motion.div>
                </AnimatePresence>

                {/* Content Container */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <div key={currentBanner.id} className="max-w-3xl space-y-6">

                            {/* Pre-title */}
                            {currentBanner.pre_title && (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="h-[1px] w-12 bg-brand-gold"></div>
                                    <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-sm md:text-base">
                                        {currentBanner.pre_title}
                                    </span>
                                </motion.div>
                            )}

                            {/* Main Title - Dynamic Highlight */}
                            <motion.h1
                                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            >
                                {renderTitle(currentBanner.title, currentBanner.highlighted_text)}
                            </motion.h1>

                            {/* Subtitle */}
                            {currentBanner.subtitle && (
                                <motion.p
                                    className="text-lg md:text-2xl text-gray-200 font-light italic max-w-2xl border-l-4 border-brand-gold/50 pl-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    {currentBanner.subtitle}
                                </motion.p>
                            )}

                            {/* CTA Button - Glassmorphism */}
                            {currentBanner.cta_text && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="pt-8"
                                >
                                    <a
                                        href={currentBanner.cta_link || '#'}
                                        className="group/btn relative inline-flex items-center gap-4 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 rounded-sm overflow-hidden"
                                    >
                                        <span className="relative z-10 text-white group-hover/btn:text-black font-bold tracking-[0.2em] uppercase text-sm transition-colors duration-300">
                                            {currentBanner.cta_text}
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-brand-gold group-hover/btn:text-black relative z-10 transition-transform group-hover/btn:translate-x-2 duration-300" />

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Controls - Minimal & Floating */}
                {banners.length > 1 && (
                    <>
                        {/* Slide Counters / Progress */}
                        <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4 text-white/80 font-mono text-sm">
                            <span className="text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                            <div className="w-24 h-[1px] bg-white/20 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-brand-gold"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '0%' }}
                                    key={index}
                                    transition={{ duration: 8, ease: "linear" }} // Sync with interval
                                />
                            </div>
                            <span className="text-xl opacity-50">{String(banners.length).padStart(2, '0')}</span>
                        </div>

                        {/* Navigation Arrows */}
                        {/* Navigation Arrows */}
                        {/* Left Arrow */}
                        <button
                            onClick={() => paginate(-1)}
                            className="hidden md:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => paginate(1)}
                            className="hidden md:flex absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
