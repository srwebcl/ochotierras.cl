"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function NuestraVina() {
    const t = useTranslations('HomePage.our_winery');

    return (
        <section id="nuestra-vina" className="py-24 md:py-32 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    
                    {/* Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] rounded-lg overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="/images/general/bodega-ochotierras.jpeg"
                            alt={t('title')}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-black/5" />
                    </motion.div>

                    {/* Text Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="w-full lg:w-1/2 flex flex-col justify-center"
                    >
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-brand-gold font-sans uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
                        >
                            OchoTierras
                        </motion.span>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-brand-dark mb-10 leading-[1.1]"
                        >
                            {t('title')}
                        </motion.h2>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="space-y-8"
                        >
                            <p className="text-gray-600 text-lg md:text-2xl leading-relaxed font-light font-serif italic">
                                {t('p1')}
                            </p>
                            <div className="h-px w-20 bg-brand-gold/30" />
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-sans">
                                {t('p2')}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle background element */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    )
}
