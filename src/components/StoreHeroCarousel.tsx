"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Banner {
    id: number
    image: string
    mobileImage?: string
    title?: string
    subtitle?: string
    link?: string
    ctaText?: string
}

const DEMO_BANNERS: Banner[] = [
    {
        id: 1,
        image: "/images/general/tienda-ochotierras.jpeg",
        title: "Nueva Colección 2024",
        subtitle: "Descubre los sabores de nuestra tierra",
        ctaText: "Ver Colección"
    },
    {
        id: 2,
        image: "/images/general/tienda-fondo.jpeg",
        title: "Edición Limitada",
        subtitle: "Vinos exclusivos para momentos únicos",
        ctaText: "Comprar Ahora"
    },
    {
        id: 3,
        image: "/images/general/back-tienda.jpeg",
        title: "Club OCHOTIERRAS",
        subtitle: "Únete y recibe beneficios exclusivos",
        ctaText: "Suscribirse"
    }
]

export function StoreHeroCarousel() {
    // Determine dragged direction
    const x = useMotionValue(0)
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (carouselRef.current) {
                setWidth(carouselRef.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const paginate = (newDirection: number) => {
        let newIndex = index + newDirection
        if (newIndex < 0) newIndex = DEMO_BANNERS.length - 1
        if (newIndex >= DEMO_BANNERS.length) newIndex = 0
        setIndex(newIndex)
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    return (
        <div className="relative w-full bg-transparent overflow-hidden py-4 md:py-8">
            <div className="relative w-[95%] md:w-[96%] mx-auto z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl" ref={carouselRef}>
                {/* Carousel Container */}
                <div className="relative w-full h-[300px] md:h-[400px] 2xl:h-[450px] flex items-center justify-center">

                    {/* Navigation Buttons (Desktop) - Adjusted for new layout */}
                    <button
                        className="hidden md:flex absolute left-4 lg:left-10 z-30 p-4 rounded-full bg-white/10 hover:bg-white/90 hover:text-brand-dark text-white backdrop-blur-md transition-all border border-white/10 shadow-lg group"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        className="hidden md:flex absolute right-4 lg:right-10 z-30 p-4 rounded-full bg-white/10 hover:bg-white/90 hover:text-brand-dark text-white backdrop-blur-md transition-all border border-white/10 shadow-lg group"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Mobile Swipe / Desktop Track */}
                    <div className="w-full h-full relative flex items-center justify-center perspective-1000">
                        {/* On Mobile: Use AnimatePresence for swipe feeling */}
                        {isMobile ? (
                            <AnimatePresence initial={false} mode="popLayout">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = Math.abs(offset.x) * velocity.x
                                        if (swipe < -10000 || offset.x < -100) paginate(1)
                                        else if (swipe > 10000 || offset.x > 100) paginate(-1)
                                    }}
                                    className="absolute w-full h-full overflow-hidden"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={DEMO_BANNERS[index].image}
                                            alt={DEMO_BANNERS[index].title || "Banner"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={true}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 w-full p-8 pb-16 text-center">
                                            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">Destacado</span>
                                            <h2 className="text-3xl font-serif font-bold text-white mb-2">{DEMO_BANNERS[index].title}</h2>
                                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{DEMO_BANNERS[index].subtitle}</p>
                                            {DEMO_BANNERS[index].ctaText && (
                                                <button className="px-6 py-2 bg-white text-brand-dark font-bold text-xs uppercase tracking-widest rounded-sm">
                                                    {DEMO_BANNERS[index].ctaText}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            /* Desktop: Render All with calculated styles */
                            <div className="relative w-full h-full flex items-center justify-center">
                                {DEMO_BANNERS.map((banner, i) => {
                                    // Circular Distance Logic for styles
                                    let dist = i - index;
                                    if (dist > DEMO_BANNERS.length / 2) dist -= DEMO_BANNERS.length;
                                    if (dist < -DEMO_BANNERS.length / 2) dist += DEMO_BANNERS.length;

                                    const isMain = dist === 0;
                                    const xOffset = dist * 90; // Even wider spacing for horizontal look

                                    // Hide distant ones (if array was larger)
                                    if (Math.abs(dist) > 1) return null;

                                    return (
                                        <motion.div
                                            key={banner.id}
                                            animate={{
                                                x: `${xOffset}%`,
                                                scale: isMain ? 1 : 0.95, // Increased side scale for better fill
                                                opacity: isMain ? 1 : 0.6, // Increased opacity
                                                zIndex: isMain ? 10 : 5,
                                                filter: isMain ? "brightness(1) blur(0px)" : "brightness(0.6) blur(1px)",
                                            }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                            className="absolute w-full h-full overflow-hidden shadow-2xl cursor-pointer"
                                            onClick={() => {
                                                if (!isMain) setIndex(i);
                                            }}
                                        >
                                            <div className="relative w-full h-full overflow-hidden">
                                                <motion.div
                                                    className="relative w-full h-full"
                                                    animate={!isMain ? {
                                                        scale: [1, 1.15],
                                                    } : {
                                                        scale: 1,
                                                        x: 0
                                                    }}
                                                    transition={!isMain ? {
                                                        duration: 15,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "linear"
                                                    } : { duration: 0.5 }}
                                                >
                                                    <Image
                                                        src={banner.image}
                                                        alt={banner.title || "Banner"}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        priority={isMain}
                                                    />
                                                </motion.div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                                {/* Content only visible on main? Or simplified on side? */}
                                                <motion.div
                                                    animate={{ opacity: isMain ? 1 : 0 }}
                                                    className="absolute bottom-0 left-0 w-full p-10 text-left"
                                                >
                                                    <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-3 block">Nueva Colección</span>
                                                    <h2 className="text-4xl font-serif font-bold text-white mb-3">{banner.title}</h2>
                                                    <p className="text-gray-300 text-lg mb-6 max-w-sm">{banner.subtitle}</p>
                                                    {banner.ctaText && (
                                                        <button className="px-8 py-3 bg-white text-brand-dark font-bold text-sm uppercase tracking-widest hover:bg-brand-gold transition-colors">
                                                            {banner.ctaText}
                                                        </button>
                                                    )}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Dots Indicator - Overlay on Image */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {DEMO_BANNERS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm",
                                    i === index ? "w-8 bg-brand-gold" : "bg-white/50 hover:bg-white/80"
                                )}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div >
    )
}
