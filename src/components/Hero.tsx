"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/images/general/vineyard-hero.webp')`
                    }}
                />
            </motion.div>

            {/* Gradients for text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-dark/90" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-brand-gold/60" />
                        <h2 className="text-brand-gold font-sans uppercase tracking-[0.3em] text-xs md:text-sm font-medium">
                            Valle del Limarí
                        </h2>
                        <div className="h-[1px] w-12 bg-brand-gold/60" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.9]"
                >
                    VIÑA
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold bg-300% animate-gradient">
                        OCHOTIERRAS
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-6 mt-8"
                >
                    <Button size="lg" className="min-w-[200px] h-14 bg-brand-gold text-brand-dark hover:bg-white text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105" asChild>
                        <Link href="/nosotros">Nuestra Viña</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="min-w-[200px] h-14 border-white text-white hover:bg-white hover:text-brand-dark text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 backdrop-blur-sm" asChild>
                        <Link href="/tienda">Tienda Online</Link>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Descubre</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-gold to-transparent relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-white"
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
