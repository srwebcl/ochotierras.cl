"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function Nosotros() {
    const t = useTranslations('Nosotros');

    return (
        <div className="pt-20">
            {/* Hero / Header - Parallax Style */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark fixed-parallax">
                    {/* Use vineyard hero as background */}
                    <div className="absolute inset-0 bg-[url('/images/general/hero-nosotros.jpeg')] bg-cover bg-center opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="inline-block border text-brand-gold border-brand-gold px-4 py-1 mb-6 text-sm uppercase tracking-widest font-bold">
                        {t('badge')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">{t('title')}</h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Story Timeline */}
            <Section className="bg-white text-brand-dark py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-brand-gold/30" />
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-none">
                            {t('timeline.title_roots')} <br /> <span className="text-brand-red italic">{t('timeline.title_deep')}</span>
                        </h2>

                        <div className="border-l border-brand-dark/20 pl-8 ml-2 space-y-12">
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-brand-gold rounded-full border-4 border-white" />
                                <span className="text-brand-gold font-bold text-xl block mb-2">1993</span>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    {t('timeline.year_1993')}
                                </p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-brand-red rounded-full border-4 border-white" />
                                <span className="text-brand-red font-bold text-xl block mb-2">2005</span>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    {t('timeline.year_2005')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full shadow-2xl overflow-hidden rounded-sm group">
                        {/* Placeholder for now - replace with historical photo if available */}
                        <Image
                            src="/images/general/vinedos-nosotros.jpeg"
                            alt="Historia de Viña Ochotierras"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </div>
            </Section>

            {/* The Valley - Dark Mode */}
            <Section className="bg-brand-dark text-white py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/general/hero-nosotros.jpeg')] bg-cover bg-center opacity-10 blur-sm" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="order-2 md:order-1 relative h-[500px] w-full">
                        <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4" />
                        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
                            <Image
                                src="/images/general/valle-limari.jpg"
                                alt="Valle del Limarí"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">{t('valley.title')}</h2>
                        <p className="text-xl leading-relaxed text-gray-300 mb-6 font-light">
                            {t('valley.description_1')}
                        </p>
                        <p className="text-lg leading-relaxed text-gray-400">
                            {t('valley.description_2')}
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10">
                                <span className="block text-brand-gold text-2xl mb-1">🌤</span>
                                <span className="text-sm font-bold uppercase tracking-widest">{t('valley.luminosity')}</span>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10">
                                <span className="block text-brand-gold text-2xl mb-1">🌫</span>
                                <span className="text-sm font-bold uppercase tracking-widest">{t('valley.camanchaca')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Philosophy */}
            <Section className="bg-white text-brand-dark py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">{t('philosophy.title')}</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-10" />
                    <p className="text-2xl leading-relaxed text-gray-600 mb-16 italic font-serif">
                        {t('philosophy.quote')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <span className="text-4xl mb-6 block text-gray-300 group-hover:text-brand-red transition-colors">01.</span>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">{t('philosophy.harvest_title')}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('philosophy.harvest_desc')}
                            </p>
                        </div>
                        <div className="p-10 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <span className="text-4xl mb-6 block text-gray-300 group-hover:text-brand-red transition-colors">02.</span>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">{t('philosophy.gravity_title')}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {t('philosophy.gravity_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
