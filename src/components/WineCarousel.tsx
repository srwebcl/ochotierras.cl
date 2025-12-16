"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const WINES = [
    {
        id: 1,
        name: "Chardonnay",
        subtitle: "Reserva",
        type: "Blanco",
        price: 9000,
        image: "/images/bottles/vino-carmenere-reserva-chile.png", // Using placeholder if specific chardonnay img missing
        bgGradient: "radial-gradient(circle at center, #ffd700 0%, transparent 70%)",
        accentColor: "text-brand-gold",
        description: "Fresco, mineral y elegante. La expresión pura del Limarí."
    },
    {
        id: 2,
        name: "Reserva Privada",
        subtitle: "Syrah",
        type: "Alta Gama",
        price: 18900,
        image: "/images/bottles/reserva-privada-syrah.webp",
        bgGradient: "radial-gradient(circle at center, #5e0916 0%, transparent 70%)", // Deep red for Syrah
        accentColor: "text-brand-red",
        description: "Elegancia estructural. Un tinto con carácter y profundidad inigualable."
    },
    {
        id: 3,
        name: "Gran Reserva",
        subtitle: "Icono",
        type: "Icono",
        price: 24900,
        image: "/images/bottles/vino-gran-reserva-24-barricas.webp",
        bgGradient: "radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)", // Dark/Black for Icono
        accentColor: "text-brand-dark",
        description: "24 meses en barrica. Nuestra obra maestra de ensamblaje."
    }
]

export function WineCarousel() {
    const [activeIndex, setActiveIndex] = useState(1) // Start with middle item (Reserva Privada)
    const [direction, setDirection] = useState(0)

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        let newIndex = activeIndex + newDirection
        if (newIndex < 0) newIndex = WINES.length - 1
        if (newIndex >= WINES.length) newIndex = 0
        setActiveIndex(newIndex)
    }

    const activeWine = WINES[activeIndex]

    return (

        <section className="relative py-20 md:py-32 bg-[#F5F5F7] overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center justify-center">

            {/* Background Dynamic Ambience */}
            <motion.div
                className="absolute inset-0 transition-colors duration-700 ease-in-out"
                animate={{
                    background: activeIndex === 0 ? "#F9F9F9" : activeIndex === 1 ? "#F0F0F0" : "#EBEBEB"
                }}
            />

            {/* Parallax Typography Background (The "Soul" of the carousel) */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                <motion.h1
                    key={activeWine.name}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.04 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[18vw] md:text-[20vw] font-serif font-bold text-brand-dark whitespace-nowrap leading-none tracking-tighter mix-blend-multiply"
                >
                    {activeWine.name.split(" ")[0]}
                </motion.h1>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col items-center justify-center">

                {/* Navigation & Status */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-8 z-20">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-400">Colección Exclusiva</span>
                    <div className="flex gap-2">
                        {WINES.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 w-8 md:w-12 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-brand-dark" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center h-auto md:h-[700px] mt-12 md:mt-0">

                    {/* Previous Button (Desktop) */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 md:left-12 z-30 p-4 rounded-full border border-gray-200 hover:bg-white hover:border-brand-dark transition-all duration-300 group hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-brand-dark" />
                    </button>

                    {/* Carousel Content */}
                    <div className="flex items-center justify-center w-full h-full relative perspective-1000 min-h-[600px] md:min-h-full">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                initial={{ opacity: 0, x: direction > 0 ? 300 : -300, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1, zIndex: 10 }}
                                exit={{ opacity: 0, x: direction < 0 ? 300 : -300, scale: 0.9, zIndex: 0 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="absolute flex flex-col md:flex-row items-center gap-6 md:gap-20 w-full max-w-5xl px-4"
                            >

                                {/* The Bottle (Hero) */}
                                <div className="relative w-[200px] h-[400px] md:w-[400px] md:h-[650px] flex-shrink-0">
                                    {/* Spotlight behind bottle */}
                                    <motion.div
                                        className="absolute inset-0 opacity-40 blur-3xl rounded-full"
                                        style={{ background: activeWine.bgGradient }}
                                        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.6, 0.4] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                    />
                                    <Image
                                        src={activeWine.image}
                                        alt={activeWine.name}
                                        fill
                                        className="object-contain drop-shadow-2xl z-10"
                                        priority
                                    />
                                </div>

                                {/* Info Card (Floating) */}
                                <div className="flex-1 text-center md:text-left pt-2 md:pt-0 max-w-lg w-full">
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className={`text-[10px] items-center justify-center md:justify-start flex gap-2 font-bold tracking-[0.2em] uppercase ${activeWine.accentColor} mb-2`}
                                    >
                                        <span className="w-8 h-[1px] bg-current opacity-50 block md:hidden" /> {/* Decorative line mobile */}
                                        {activeWine.subtitle}
                                        <span className="w-8 h-[1px] bg-current opacity-50 block md:hidden" />
                                    </motion.span>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-3xl md:text-6xl font-serif font-bold text-brand-dark mb-3 md:mb-4 leading-tight"
                                    >
                                        {activeWine.name}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-gray-500 text-sm md:text-xl font-serif italic mb-6 md:mb-8 md:pr-12 max-w-xs mx-auto md:max-w-none"
                                    >
                                        {activeWine.description}
                                    </motion.p>

                                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center md:justify-start">
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-2xl md:text-3xl font-bold text-brand-dark"
                                        >
                                            ${activeWine.price.toLocaleString("es-CL")}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="w-full md:w-auto"
                                        >
                                            <Button className="w-full md:w-auto h-12 md:h-14 px-8 bg-brand-dark text-white hover:bg-brand-red rounded-full uppercase tracking-widest text-xs md:text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                                <ShoppingBag className="w-4 h-4 mr-2" />
                                                Comprar
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Button (Desktop) */}
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 md:right-12 z-30 p-4 rounded-full border border-gray-200 hover:bg-white hover:border-brand-dark transition-all duration-300 group hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-brand-dark" />
                    </button>

                    {/* Mobile Controls (Improved placement) */}
                    <div className="flex gap-12 md:hidden mt-8 z-30 pb-8">
                        <button onClick={() => paginate(-1)} className="p-3 bg-white border border-gray-100 rounded-full shadow-md active:scale-95 transition-transform"><ChevronLeft className="w-5 h-5 text-brand-dark" /></button>
                        <button onClick={() => paginate(1)} className="p-3 bg-white border border-gray-100 rounded-full shadow-md active:scale-95 transition-transform"><ChevronRight className="w-5 h-5 text-brand-dark" /></button>
                    </div>

                </div>
            </div>
        </section>
    )
}
