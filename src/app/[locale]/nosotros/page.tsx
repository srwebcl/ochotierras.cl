"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { CinematicHero } from "@/components/CinematicHero"

export default function Nosotros() {
    const t = useTranslations('Nosotros');

    return (
        <div>
            {/* Cinematic Hero */}
            <CinematicHero
                title="VIÑA OCHOTIERRAS"
                badge={t('badge')}
                subtitle={t('title')}
                backgroundImage="/images/general/hero-nosotros.jpeg"
            />

            {/* Viña OchoTierras Section */}
            <Section className="bg-white text-brand-dark py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Nuestra Historia
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-10 leading-tight">
                            Viña <br />
                            <span className="text-brand-red italic italic-serif">OchoTierras</span>
                        </h2>
                        
                        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-gray-600 font-light">
                            <p className="font-serif italic text-gray-800">
                                {t('subtitle')}
                            </p>
                            
                            <div className="p-8 border-l-2 border-brand-gold/20 bg-gray-50/50">
                                <p className="text-base md:text-lg italic">
                                    {t('winery_text')}
                                </p>
                            </div>
                            
                            <p className="font-bold text-brand-dark tracking-tight">
                                {t('strains')}
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[500px] md:h-[700px] w-full shadow-2xl overflow-hidden rounded-lg"
                    >
                        <Image
                            src="/images/general/vinedos-nosotros.jpeg"
                            alt="Viña Ochotierras Story"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay with subtle texture */}
                        <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                </div>
            </Section>

            {/* Valle del Limarí Section - Dark Mode Cinematic */}
            <Section className="bg-brand-dark text-white py-24 md:py-40 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/general/valle-limari.jpg"
                        alt="Valle del Limarí"
                        fill
                        className="object-cover opacity-60"
                    />
                    {/* Gradiente dinámico: Vertical en móvil, Horizontal en desktop */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/70 to-transparent lg:bg-gradient-to-r lg:from-brand-dark lg:via-brand-dark/80 lg:to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Terroir & Origen
                        </span>
                        <h2 className="text-4xl lg:text-7xl font-serif font-bold text-white mb-10 leading-[0.9]">
                            Valle del <br />
                            <span className="italic font-light text-brand-gold">Limarí</span>
                        </h2>
                        
                        <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-gray-200 font-light font-serif italic">
                            <p>
                                {t('valley.description_1')}
                            </p>
                            <p className="text-base md:text-xl text-gray-400 not-italic font-sans leading-relaxed">
                                {t('valley.description_2')}
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-8 max-w-sm">
                            <div className="group">
                                <span className="block text-brand-gold text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">☀️</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-1">{t('valley.luminosity')}</span>
                                <div className="h-0.5 w-12 bg-white/20" />
                            </div>
                            <div className="group">
                                <span className="block text-brand-gold text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">☁️</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-1">{t('valley.camanchaca')}</span>
                                <div className="h-0.5 w-12 bg-white/20" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    )
}
