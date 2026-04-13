"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { ContactForm } from "@/components/ContactForm"

export function StoryScroll() {
    const t = useTranslations('StoryScroll');
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax for the background image
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    // Parallax for text movement
    const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-24 md:py-0">

            {/* 1. Immersive Full-Screen Background */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y: bgY }} className="relative w-full h-[120%] -top-[10%]">
                    <Image
                        src="/images/general/back-story-scroll.jpeg"
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

                {/* Left Block: Heading and Intro */}
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
                            {t('title')}
                        </span>

                        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                            {t('escribenos')} <br />
                            <span className="italic font-light text-brand-gold">& {t('hablemos')}</span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-6 border-l-2 border-brand-gold/50 pl-6">
                            "{t('description')}"
                        </p>
                    </motion.div>
                </motion.div>


                {/* Right Block: Contact Form */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                    className="flex-1 max-w-lg w-full relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group rounded-2xl"
                    >
                        {/* Glass Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <ContactForm />
                    </motion.div>
                </motion.div>

            </div>

            {/* Decorative Scroll Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-10 mix-blend-difference">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white">{t('discover')}</span>
                <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            </div>

        </section>
    )
}
