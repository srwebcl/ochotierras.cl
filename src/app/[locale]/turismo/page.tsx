"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import { CinematicHero } from "@/components/CinematicHero"

export default function Turismo() {
    const t = useTranslations('Turismo');

    return (
        <div>
            {/* Cinematic Hero */}
            <CinematicHero
                title={<>{t('title_1')} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">{t('title_2')}</span></>}
                badge={t('badge')}
                description={t('description')}
                backgroundImage="/images/general/hero-turismo.jpeg"
            >
                <Button className="bg-brand-red text-white hover:bg-white hover:text-brand-dark px-10 py-7 text-sm uppercase tracking-widest font-bold transition-all duration-300 transform hover:translate-x-2">
                    <Link href="/contacto">{t('pta_button')}</Link>
                </Button>
            </CinematicHero>

            {/* Intro Details */}
            <Section className="bg-white text-brand-dark relative z-20">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
                        {t('intro.title')}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        {t('intro.p1')}
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {t('intro.p2')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Express Tour */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-8 lg:p-12 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{t('express.title')}</h3>
                                <p className="text-brand-gold uppercase tracking-widest text-xs font-bold">{t('express.subtitle')}</p>
                            </div>
                            <span className="bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                                {t('express.price')}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {t('express.description')}
                        </p>

                        <div className="space-y-6 mb-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{t('express.includes_label')}</h4>
                                <ul className="space-y-2">
                                    {(t.raw('express.includes') as string[]).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="text-brand-gold mt-1">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                                <span className="text-brand-gold">⏱</span> {t('express.duration')}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm italic text-gray-500">
                            {t('express.note')}
                        </div>
                    </motion.div>

                    {/* Premium Tour */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-brand-dark text-white rounded-2xl p-8 lg:p-12 relative overflow-hidden group"
                    >
                        {/* Gold Shine Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-gold/20 transition-colors duration-500" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{t('premium.title')}</h3>
                                    <p className="text-brand-gold uppercase tracking-widest text-xs font-bold">{t('premium.subtitle')}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold font-serif text-brand-gold block">{t('premium.price')}</span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{t('premium.price_note')}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-8 leading-relaxed">
                                {t('premium.description')}
                            </p>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{t('premium.includes_label')}</h4>
                                    <ul className="space-y-2">
                                        {(t.raw('premium.includes') as string[]).map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <span className="text-brand-gold mt-1">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('premium.conditions_label')}</h4>
                                        <ul className="space-y-1">
                                            {(t.raw('premium.conditions') as string[]).map((item, idx) => (
                                                <li key={idx} className="text-xs text-gray-400">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex items-end justify-end">
                                        <div className="flex items-center gap-2 text-sm font-medium text-white">
                                            <span className="text-brand-gold">⏱</span> {t('premium.duration')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm italic text-gray-400">
                                {t('premium.note')}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Booking CTA */}
                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{t('booking.title')}</h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('booking.description')}</p>
                    <Button className="bg-brand-red text-white hover:bg-brand-dark px-12 py-6 text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                        <Link href="/contacto">{t('booking.button')}</Link>
                    </Button>
                </div>
            </Section>
        </div>
    )
}
