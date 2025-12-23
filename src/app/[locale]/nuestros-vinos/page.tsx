"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Wine {
    id: number
    name: string
    nameEn?: string
    subtitle: string
    subtitleEn?: string
    slug: string
    image: string | null
    price: number
    stock: number
    bgGradient: string
    accentColorHex: string
}

interface Category {
    id: number
    name: string
    nameEn?: string
    slug: string
    wines: Wine[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
}

export default function NuestrosVinosPage() {
    const t = useTranslations('NuestrosVinos');
    const locale = useLocale();
    const isEnglish = locale === 'en';

    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data)
                }
            })
            .catch(err => console.error("Failed to fetch categories:", err))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center items-center bg-[#F9F9F9]">
                <div className="animate-pulse text-xl font-serif text-brand-dark">{t('loading')}</div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#F9F9F9] pt-32 pb-20">
            {/* Header */}
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-gold font-sans uppercase tracking-[0.2em] text-xs font-bold block mb-4">
                        {t('collection_subtitle')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
                        {t('title_main')} <span className="italic font-light text-gray-400">{t('title_highlight')}</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-600 font-sans font-light text-lg">
                        {t('description')}
                    </p>
                </motion.div>
            </div>

            {/* Categories List */}
            <div className="container mx-auto px-6 space-y-24">
                {categories.map((category) => (
                    category.wines.length > 0 && (
                        <section key={category.id} className="relative">
                            {/* Category Title */}
                            <div className="flex items-center gap-4 mb-12">
                                <div className="h-px bg-gray-300 flex-1" />
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center uppercase tracking-widest">
                                    {isEnglish && category.nameEn ? category.nameEn : category.name}
                                </h2>
                                <div className="h-px bg-gray-300 flex-1" />
                            </div>

                            {/* Wines Grid */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            >
                                {category.wines.map((wine) => {
                                    const wineName = isEnglish && wine.nameEn ? wine.nameEn : wine.name;
                                    const wineSubtitle = isEnglish && wine.subtitleEn ? wine.subtitleEn : wine.subtitle;

                                    return (
                                        <motion.div
                                            key={wine.id}
                                            variants={itemVariants}
                                            className="group relative bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                                        >
                                            <Link href={`/tienda/${wine.slug}`} className="block relative h-[400px] w-full overflow-hidden bg-gray-50">
                                                {/* Dynamic Background Gradient based on Wine Type */}
                                                <div
                                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                                                    style={{ background: wine.bgGradient }}
                                                />

                                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                                    <Image
                                                        src={wine.image || '/images/bottles/placeholder.webp'}
                                                        alt={wineName}
                                                        width={300}
                                                        height={400}
                                                        priority={true}
                                                        unoptimized
                                                        className="object-contain h-full w-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>

                                                {/* Quick Add Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                                                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                                                        <span className="text-brand-dark font-bold text-sm uppercase tracking-wider">{t('view_detail')}</span>
                                                        <ArrowRight size={16} className="text-brand-gold" />
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="p-8 flex flex-col flex-grow">
                                                <div className="mb-4">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 block">
                                                        {isEnglish && category.nameEn ? category.nameEn : category.name}
                                                    </span>
                                                    <Link href={`/tienda/${wine.slug}`}>
                                                        <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-brand-gold transition-colors duration-300">
                                                            {wineName}
                                                        </h3>
                                                    </Link>
                                                    {wineSubtitle && (
                                                        <p className="text-gray-500 text-sm mt-1 font-light italic">{wineSubtitle}</p>
                                                    )}
                                                </div>

                                                <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 uppercase">{t('price_label')}</span>
                                                        <span className="text-xl font-bold text-gray-900">${wine.price.toLocaleString('es-CL')}</span>
                                                    </div>
                                                    <Link href={`/tienda/${wine.slug}`} className="text-brand-dark hover:text-brand-gold transition-colors font-medium text-sm flex items-center gap-1 group/link">
                                                        {t('buy_button')}
                                                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </section>
                    )
                ))}

                {categories.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('empty_message')}</p>
                    </div>
                )}
            </div>
        </main>
    )
}
