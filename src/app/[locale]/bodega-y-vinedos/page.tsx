"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { CinematicHero } from "@/components/CinematicHero"

export default function Bodega() {
    const t = useTranslations('Bodega');

    return (
        <div className="bg-white">
            {/* Cinematic Hero */}
            <CinematicHero
                title={t('title')}
                badge={t('badge')}
                backgroundImage="/images/general/hero-bodega.jpeg"
            />

            {/* Viñedos Section */}
            <Section className="py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-10">
                            {t('vinedos_title')}
                        </h2>
                        <div className="text-lg md:text-xl leading-relaxed text-gray-600 font-light space-y-8">
                            {t('vinedos_text').split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[500px] md:h-[600px] shadow-2xl rounded-lg overflow-hidden"
                    >
                        <Image
                            src="/images/general/vinedos.jpeg"
                            alt="Viñedos Ochotierras"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </Section>

            {/* Bodega Section - Dark & Cinematic */}
            <Section className="bg-brand-dark text-white py-24 md:py-40 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/general/hero-bodega.jpeg"
                        alt="Bodega background"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-white/10"
                    >
                        <Image
                            src="/images/general/bodega-ochotierras.jpeg"
                            alt="La Bodega Ochotierras"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10">
                            {t('bodega_title')}
                        </h2>
                        <div className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light italic font-serif">
                            <p>{t('bodega_text')}</p>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    )
}
