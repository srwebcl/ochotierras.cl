"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function StoryScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax for the background image
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    // Parallax for text opacity and movement
    const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-24 md:py-0">

            {/* 1. Immersive Full-Screen Background */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y: bgY }} className="relative w-full h-[120%] -top-[10%]">
                    <Image
                        src="/images/general/bodega.webp"
                        alt="Bodega OchoTierras"
                        fill
                        className="object-cover opacity-60 md:opacity-100" // Lower opacity on mobile for readability
                        priority
                    />
                </motion.div>
                {/* Dramatic Gradient Overlay (Cinema Style) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:via-black/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </div>

            {/* 2. Content Container (Floating over the environment) */}
            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">

                {/* Left Block: Artesanía */}
                <motion.div
                    style={{ y: contentY }}
                    className="flex-1 max-w-xl text-left md:pl-12"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-brand-gold/30 text-brand-gold text-[10px] uppercase tracking-[0.25em] mb-6 backdrop-blur-md bg-black/20">
                            Nuestra Filosofía
                        </span>

                        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                            Tierra <br />
                            <span className="italic font-light text-brand-gold">& Gravedad</span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-6 border-l-2 border-brand-gold/50 pl-6">
                            "En Viña OchoTierras trabajamos con la dedicación de un artesano. Las personas y sus experiencias tienen un rol central en la creación de nuestros vinos."
                        </p>
                    </motion.div>
                </motion.div>


                {/* Right Block: Gravedad / Arquitectura */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                    className="flex-1 max-w-lg relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Glass Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <h3 className="text-3xl font-serif font-bold mb-4 text-white">Diseño por Gravedad</h3>

                        <p className="text-gray-400 font-light text-base leading-relaxed mb-8">
                            La bodega fue construida bajo el nivel del suelo, permitiendo usar la gravedad para mover el vino suavemente. Sin bombas. Preservando la condición excepcional de cada gota.
                        </p>

                        <div className="flex items-center gap-8 mb-8">
                            <div>
                                <span className="block text-4xl font-bold text-white">-5°C</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500">Temperatura</span>
                            </div>
                            <div className="w-[1px] h-10 bg-white/20" />
                            <div>
                                <span className="block text-4xl font-bold text-white">5</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500">Niveles Subt.</span>
                            </div>
                        </div>

                        <Button asChild className="w-full h-12 bg-white text-black hover:bg-brand-gold hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                            <Link href="/bodega-y-vinedos">Explorar Bodega</Link>
                        </Button>
                    </motion.div>
                </motion.div>

            </div>

            {/* Decorative Scroll Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 mix-blend-difference">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white">Descubre</span>
                <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            </div>

        </section>
    )
}
