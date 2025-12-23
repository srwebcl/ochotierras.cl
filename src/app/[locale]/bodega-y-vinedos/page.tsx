"use client"

import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function Bodega() {
    const t = useTranslations('Bodega');

    return (
        <div className="pt-20">
            {/* Hero - Full Screen Parallax */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-dark z-10" />
                    <Image
                        src="/images/general/hero-bodega.jpeg"
                        alt="Bodega Ochotierras"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl">
                    <span className="block text-brand-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-bold">
                        {t('badge')}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter loading-tight">
                        {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">{t('title_highlight')}</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-200 font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Terroir Detail */}
            <Section className="bg-white text-brand-dark relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">{t('terroir.location_title')}</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('terroir.location_desc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center hover:shadow-lg transition-shadow">
                                <span className="block text-brand-red text-4xl font-bold font-serif mb-2">30<span className="text-base text-gray-400">km</span></span>
                                <span className="uppercase text-xs font-bold tracking-widest text-gray-500">{t('terroir.sea_dist_label')}</span>
                            </div>
                            <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center hover:shadow-lg transition-shadow">
                                <span className="block text-brand-red text-4xl font-bold font-serif mb-2">75<span className="text-base text-gray-400">ha</span></span>
                                <span className="uppercase text-xs font-bold tracking-widest text-gray-500">{t('terroir.surface_label')}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{t('terroir.soils_title')}</h3>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                {t('terroir.soils_desc')}
                            </p>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{t('terroir.varieties_title')}</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {['Syrah', 'Cabernet Sauvignon', 'Carmenère', 'Sauvignon Blanc', 'Chardonnay'].map((v) => (
                                    <li key={v} className="flex items-center gap-2 text-gray-600">
                                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="relative h-[800px] w-full bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="/images/general/vineyard_hero_new.png"
                            alt="Viñedos Ochotierras"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-sm">
                            <p className="text-brand-dark italic font-serif text-lg">
                                {t('terroir.quote')}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* The Cellar - Dark Section */}
            <Section className="bg-brand-dark text-white py-32 overflow-hidden relative">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[url('/images/general/bodega_hero_new.png')] bg-cover bg-left" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-10">{t('cellar.title')}</h2>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-16">
                        {t('cellar.description')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                            <h3 className="text-brand-gold font-bold text-xl mb-4">{t('cellar.gravity_title')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('cellar.gravity_desc')}
                            </p>
                        </div>
                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                            <h3 className="text-brand-gold font-bold text-xl mb-4">{t('cellar.temp_title')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('cellar.temp_desc')}
                            </p>
                        </div>
                        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-colors">
                            <h3 className="text-brand-gold font-bold text-xl mb-4">{t('cellar.efficiency_title')}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t('cellar.efficiency_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
