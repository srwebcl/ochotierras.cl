"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Wine {
    id: number;
    name: string;
    subtitle?: string;
    type?: string;
    price: number;
    image?: string;
    bgGradient?: string;
    accentColor?: string;
    accentColorHex?: string;
    description?: string;
    stock?: number;
    slug?: string;
}

const DEFAULT_WINES: Wine[] = [
    {
        id: 1,
        name: "Chardonnay",
        subtitle: "Reserva",
        type: "Blanco",
        price: 9000,
        image: "/images/bottles/chardonnay-reserva.webp",
        bgGradient: "radial-gradient(circle at center, #ffd700 0%, transparent 70%)",
        accentColorHex: "#D4AF37",
        description: "Fresco, mineral y elegante. La expresión pura del Limarí.",
        slug: "chardonnay-reserva"
    },
    {
        id: 2,
        name: "Reserva Privada",
        subtitle: "Syrah",
        type: "Alta Gama",
        price: 18900,
        image: "/images/bottles/reserva-privada-syrah.webp",
        bgGradient: "radial-gradient(circle at center, #5e0916 0%, transparent 70%)",
        accentColorHex: "#b91c1c",
        description: "Elegancia estructural. Un tinto con carácter y profundidad inigualable.",
        slug: "reserva-privada-carmenere-syrah"
    },
    {
        id: 3,
        name: "Gran Reserva",
        subtitle: "Icono",
        type: "Icono",
        price: 24900,
        image: "/images/bottles/vino-gran-reserva-24-barricas.webp",
        bgGradient: "radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)",
        accentColorHex: "#1a1a1a",
        description: "24 meses en barrica. Nuestra obra maestra de ensamblaje.",
        slug: "gran-reserva"
    }
]

interface WineCarouselProps {
    wines?: Wine[];
}

export function WineCarousel({ wines }: WineCarouselProps) {
    const [data, setData] = useState<Wine[]>(wines || []);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        let newIndex = activeIndex + newDirection
        if (newIndex < 0) newIndex = data.length - 1
        if (newIndex >= data.length) newIndex = 0
        setActiveIndex(newIndex)
    }

    // Client-side fetch fallback if no wines provided (or if SSR failed)
    React.useEffect(() => {
        if (!wines || wines.length === 0 || wines[0]?.type === 'Error') {
            setIsLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/collection-wines`)
                .then(res => res.json())
                .then(fetchedData => {
                    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                        setData(fetchedData);
                    }
                })
                .catch(err => console.error("Client fetch failed:", err))
                .finally(() => setIsLoading(false));
        } else {
            setData(wines);
        }
    }, [wines]);

    const activeWine = data[activeIndex];

    if (!activeWine) {
        if (isLoading) return <div className="h-[80vh] flex items-center justify-center bg-[#F5F5F7] text-brand-dark">Cargando vinos...</div>;
        return null; // Don't show anything if no data
    }

    // Animation Variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100, // Reduced distance for elegance
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)", // Blur on entry
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any, // Custom bezier for "premium" snap
            }
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 1.05, // Slight zoom out on exit
            filter: "blur(10px)", // Blur on exit
            transition: {
                duration: 0.6,
                ease: "easeInOut" as any
            }
        })
    };

    const bottleVariants = {
        initial: { y: 40, opacity: 0, rotate: -2 },
        animate: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 1,
                ease: "easeOut" as any,
                delay: 0.2 // Explicit delay after container
            }
        },
        exit: {
            y: -40,
            opacity: 0,
            transition: { duration: 0.4 }
        }
    };

    const textStaggerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3 + (i * 0.1), // Staggered start
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1] as any
            }
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (

        <section className="relative py-16 md:py-32 bg-[#F5F5F7] overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center justify-center">

            {/* Background Dynamic Ambience */}
            <motion.div
                className="absolute inset-0 transition-colors duration-1000 ease-in-out"
                animate={{
                    background: activeIndex % 2 === 0 ? "#F9F9F9" : "#F2F2F2"
                }}
            />

            {/* Parallax Typography Background (The "Soul" of the carousel) */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                <AnimatePresence mode="popLayout">
                    <motion.h1
                        key={activeWine.name}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.03 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-[18vw] md:text-[20vw] font-serif font-bold text-brand-dark whitespace-nowrap leading-none tracking-tighter mix-blend-multiply"
                    >
                        {activeWine.name.split(" ")[0]}
                    </motion.h1>
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col items-center justify-center py-8 md:py-0">

                {/* Navigation & Status - Relative on Mobile for stacking, Absolute on Desktop */}
                <div className="relative md:absolute top-0 left-0 right-0 flex justify-center md:justify-between items-center px-2 md:px-12 py-4 md:py-8 z-20 w-full mb-6 md:mb-0">
                    <span className="text-sm md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-400 text-center">Colección Exclusiva</span>
                    <div className="hidden md:flex gap-2">
                        {data.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 w-8 md:w-12 rounded-full transition-all duration-500 ease-out ${idx === activeIndex ? "bg-brand-dark scale-x-110" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center h-auto md:h-[700px] mt-12 md:mt-0 pb-12 md:pb-0">

                    {/* Previous Button (Universal) */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-0 md:left-12 top-1/2 -translate-y-1/2 z-30 p-2 md:p-4 rounded-full border border-transparent hover:bg-white hover:shadow-xl transition-all duration-300 group"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-400 md:text-gray-300 group-hover:text-brand-dark transition-colors" />
                    </button>

                    {/* Carousel Content */}
                    <div className="flex items-center justify-center w-full h-full relative perspective-1000 min-h-[550px] md:min-h-full">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute flex flex-col md:flex-row items-center gap-4 md:gap-20 w-full max-w-5xl px-0 md:px-4"
                            >

                                {/* The Bottle (Hero) */}
                                <motion.div
                                    className="relative w-[180px] h-[350px] md:w-[400px] md:h-[650px] flex-shrink-0"
                                    variants={bottleVariants}
                                >
                                    {/* Spotlight behind bottle */}
                                    <motion.div
                                        className="absolute inset-0 opacity-40 blur-3xl rounded-full"
                                        style={{ background: activeWine.bgGradient }}
                                        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.5, 0.3] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    {activeWine.image && (
                                        <Image
                                            src={activeWine.image.startsWith('/storage')
                                                ? `${(process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage').replace(/\/storage$/, '')}${activeWine.image}`
                                                : activeWine.image}
                                            alt={activeWine.name}
                                            fill
                                            className="object-contain drop-shadow-2xl z-10"
                                            priority
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            unoptimized
                                        />
                                    )}
                                </motion.div>

                                {/* Info Card (Floating) */}
                                <div className="flex-1 text-center md:text-left pt-2 md:pt-0 max-w-lg w-full z-20">
                                    <motion.div
                                        custom={0}
                                        variants={textStaggerVariants}
                                        className="flex items-center justify-center md:justify-start mb-4"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: activeWine.accentColorHex ? `${activeWine.accentColorHex}15` : '#f3f4f6', // 10-15% opacity
                                                borderColor: activeWine.accentColorHex ? `${activeWine.accentColorHex}30` : 'transparent'
                                            }}
                                            className="px-4 py-1.5 rounded-full border backdrop-blur-sm flex items-center gap-2"
                                        >
                                            {/* Color Dot */}
                                            {activeWine.accentColorHex && (
                                                <span
                                                    className="w-2 h-2 rounded-full shadow-sm"
                                                    style={{ backgroundColor: activeWine.accentColorHex }}
                                                />
                                            )}

                                            {/* Text - Always Dark for Readability */}
                                            <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-brand-dark">
                                                {activeWine.subtitle}
                                            </span>
                                        </div>
                                    </motion.div>

                                    <motion.h2
                                        custom={1}
                                        variants={textStaggerVariants}
                                        className="text-3xl md:text-6xl font-serif font-bold text-brand-dark mb-3 md:mb-4 leading-tight"
                                    >
                                        {activeWine.name}
                                    </motion.h2>

                                    <motion.p
                                        custom={2}
                                        variants={textStaggerVariants}
                                        className="text-gray-500 text-sm md:text-xl font-serif italic mb-6 md:mb-8 md:pr-12 max-w-xs mx-auto md:max-w-none line-clamp-3 md:line-clamp-none"
                                    >
                                        {activeWine.description}
                                    </motion.p>

                                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center md:justify-start">
                                        <motion.div
                                            custom={3}
                                            variants={textStaggerVariants}
                                            className="text-2xl md:text-3xl font-bold text-brand-dark"
                                        >
                                            ${activeWine.price.toLocaleString("es-CL")}
                                            <span className="text-sm md:text-base font-medium text-gray-400 ml-2">
                                                (Caja 6 Bot.)
                                            </span>
                                        </motion.div>

                                        <motion.div
                                            custom={4}
                                            variants={textStaggerVariants}
                                            className="w-full md:w-auto flex flex-col md:flex-row gap-4"
                                        >
                                            <Button
                                                disabled={activeWine.stock === 0}
                                                className={`w-full md:w-auto h-12 md:h-14 px-8 rounded-full uppercase tracking-widest text-xs md:text-sm font-bold shadow-lg transition-all duration-300 ${activeWine.stock === 0
                                                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                                    : 'bg-brand-dark text-white hover:bg-brand-red hover:shadow-xl hover:scale-105'
                                                    }`}
                                            >
                                                <ShoppingBag className="w-4 h-4 mr-2" />
                                                {activeWine.stock === 0 ? 'Agotado' : 'Comprar'}
                                            </Button>

                                            {/* Conocer el Vino Button */}
                                            {activeWine.slug && (
                                                <Link
                                                    href={`/tienda/${activeWine.slug}`}
                                                    className={cn(
                                                        buttonVariants({ variant: "outline" }),
                                                        "w-full md:w-auto h-12 md:h-14 px-8 rounded-full uppercase tracking-widest text-xs md:text-sm font-bold border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300"
                                                    )}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Conocer
                                                </Link>
                                            )}

                                            {/* Stock Status Badge */}
                                            {activeWine.stock !== undefined && activeWine.stock > 0 && activeWine.stock <= 5 && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1 }}
                                                    className="text-center md:text-left text-xs font-bold text-red-600 mt-2 uppercase tracking-tight"
                                                >
                                                    ¡Solo quedan {activeWine.stock} unidades!
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Button (Universal) */}
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-0 md:right-12 z-30 p-2 md:p-4 rounded-full border border-transparent hover:bg-white hover:shadow-xl transition-all duration-300 group"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-400 md:text-gray-300 group-hover:text-brand-dark transition-colors" />
                    </button>

                </div>
            </div>
        </section>
    )
}
