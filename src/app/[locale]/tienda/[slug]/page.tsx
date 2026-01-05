"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Truck, ShieldCheck, Download, Droplet, Thermometer, Grape, MapPin, Calendar, Award } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"

interface Wine {
    id: number;
    name: string;
    nameEn?: string;
    subtitle?: string;
    subtitleEn?: string; // Not in API yet, but good to have
    type?: string;
    price: number;
    image?: string;
    bgGradient?: string;
    description?: string;
    descriptionEn?: string;
    stock?: number;
    slug?: string;
    technical_sheet?: string | null;
    vintage_year?: number;
    strain?: string;
    origin?: string;
    tastingNotesEn?: string; // Added in API
    gallery?: string[];
    technical_details?: {
        harvest_type?: string;
        origin_details?: string;
        presentation?: string;
        closure_type?: string;
        composition?: string;
        aging_potential?: string;
        wood_type?: string;
        analysis?: Record<string, string>;
        tasting_notes?: string;
        awards?: Array<{ award: string }>;
    };
}

export default function ProductPage() {
    const t = useTranslations('ProductDetail');
    const locale = useLocale();
    const isEnglish = locale === 'en';

    const { slug } = useParams()
    const [product, setProduct] = useState<Wine | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [activeImage, setActiveImage] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return;

        setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`)
            .then(res => res.json())
            .then((products: any[]) => {
                const found = products.find((p: any) => p.slug === slug)
                if (found) {
                    setProduct(found)
                    setActiveImage(found.image)
                } else {
                    // Fallback to categories (legacy)
                    return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`)
                        .then(res => res.json())
                        .then((categories: any[]) => {
                            const allWines = categories.flatMap(c => c.wines)
                            const foundCat = allWines.find((p: any) => p.slug === slug)
                            if (foundCat) {
                                setProduct(foundCat)
                                setActiveImage(foundCat.image)
                            } else {
                                setError(true)
                            }
                        })
                }
            })
            .catch(err => {
                console.error("Failed to fetch product:", err)
                setError(true)
            })
            .finally(() => setIsLoading(false))
            .finally(() => setIsLoading(false))
    }, [slug])



    const localizedName = product ? (isEnglish && product.nameEn ? product.nameEn : product.name) : '';
    const localizedDescription = product ? (isEnglish && product.descriptionEn ? product.descriptionEn : product.description) : '';
    const localizedSubtitle = product ? (product.subtitle || product.type) : ''; // API doesn't fully support subtitleEn yet, fallback ok.

    // Tasting Notes: check if tastingNotesEn exists (I added it to API).
    const localizedTastingNotes = product?.tastingNotesEn && isEnglish ? product.tastingNotesEn : product?.technical_details?.tasting_notes;

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-brand-dark text-white">
                <div className="animate-pulse text-2xl font-serif">{t('loading')}</div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <h1 className="text-4xl font-serif font-bold mb-4">{t('not_found')}</h1>
                <Link href="/tienda">
                    <Button variant="outline">{t('back_shop')}</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero & Main Info */}
            <div className="relative bg-brand-dark min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
                {/* Dynamic Background */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none transition-all duration-1000"
                    style={{ background: product.bgGradient || 'radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)' }}
                />

                <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Visual Section (Image/Gallery) */}
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] md:h-[700px] w-full max-w-[300px] md:max-w-[400px] mt-8 md:mt-0"
                        >
                            <Image
                                src={activeImage || product.image || '/images/bottles/placeholder.webp'}
                                alt={localizedName}
                                fill
                                unoptimized
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </motion.div>

                        {/* Gallery Thumbnails */}
                        {product.gallery && product.gallery.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4 mt-8 overflow-x-auto pb-4 max-w-full"
                            >
                                {/* Main Image Thumb */}
                                <button
                                    onClick={() => setActiveImage(product.image || null)}
                                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === product.image ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={product.image || ''} alt="Main" fill className="object-cover" />
                                </button>
                                {/* Gallery Thumbs */}
                                {product.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <Link href="/tienda" className="inline-flex items-center gap-2 text-brand-gold mb-6 hover:underline text-sm uppercase tracking-widest font-bold">
                            <ArrowLeft size={16} /> {t('back_shop')}
                        </Link>

                        <span className="block text-brand-gold/80 text-lg font-serif italic mb-2">{localizedSubtitle}</span>
                        <h1 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-6">{localizedName}</h1>

                        <div className="prose prose-lg prose-invert text-gray-300 mb-8 max-w-xl font-light mx-auto md:mx-0">
                            <p>{localizedDescription}</p>
                        </div>

                        <div className="flex flex-col gap-6 items-center md:items-start border-t border-white/10 pt-8 mb-8 w-full md:w-auto">
                            <div className="text-center md:text-left">
                                <span className="block text-xs uppercase text-gray-400 mb-1">{t('price_label')}</span>
                                <span className="text-4xl font-bold text-white">${product.price.toLocaleString('es-CL')}</span>
                            </div>

                            <div className="flex-1 w-full md:w-auto">
                                {product.stock === 0 ? (
                                    <div className="bg-white/10 backdrop-blur text-white px-6 py-4 text-center rounded-lg font-bold uppercase tracking-widest">
                                        {t('out_of_stock')}
                                    </div>
                                ) : (
                                    <div className="bg-white text-brand-dark p-6 rounded-xl shadow-2xl max-w-md">
                                        <AddToCartButton product={product} />
                                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 justify-center">
                                            <span className="flex items-center gap-1"><Truck size={14} /> {t('shipping_chile')}</span>
                                            <span className="flex items-center gap-1"><ShieldCheck size={14} /> {t('secure_buy')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {product.technical_sheet && (
                            <a
                                href={product.technical_sheet}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-brand-dark transition-all text-sm uppercase tracking-wider font-bold"
                            >
                                <Download size={18} /> {t('download_tech_sheet')}
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>




            {/* Technical Information & Story */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Left Column: Tasting Notes & Awards */}
                    <div className="md:col-span-7 space-y-16">
                        {localizedTastingNotes && (
                            <section className="animate-fade-in-up">
                                <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
                                    <span className="w-12 h-[1px] bg-brand-gold"></span> {t('tasting_notes')}
                                </h3>
                                <div
                                    className="prose prose-lg text-gray-600 font-light border-l-4 border-brand-gold pl-6 py-2"
                                    dangerouslySetInnerHTML={{ __html: localizedTastingNotes }}
                                />
                            </section>
                        )}

                        {product.technical_details?.awards && product.technical_details.awards.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">{t('awards')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.technical_details.awards.map((award, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <Award className="text-brand-gold flex-shrink-0" size={24} />
                                            <span className="font-bold text-gray-800 text-sm">{award.award}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Technical Specs Grid */}
                    <div className="md:col-span-1"></div>
                    <div className="md:col-span-4">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-28">
                            <h3 className="text-xl font-serif font-bold text-brand-dark mb-6 border-b border-gray-200 pb-4">
                                {t('tech_sheet_title')}
                            </h3>

                            <dl className="space-y-4 text-sm">
                                {product.vintage_year && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <Calendar size={16} /> {t('year')}</dt>
                                        <dd className="font-bold text-brand-dark">{product.vintage_year}</dd>
                                    </div>
                                )}
                                {product.strain && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <Grape size={16} /> {t('variety')}</dt>
                                        <dd className="font-bold text-brand-dark text-right max-w-[50%]">{product.strain}</dd>
                                    </div>
                                )}
                                {product.origin && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <MapPin size={16} /> {t('origin')}</dt>
                                        <dd className="font-bold text-brand-dark">{product.origin}</dd>
                                    </div>
                                )}

                                {/* Analysis Fields from JSON */}
                                {product.technical_details?.analysis && Object.entries(product.technical_details.analysis).map(([key, value]) => {
                                    const metaMap: any = {
                                        alcohol: { key: 'alcohol', icon: <Droplet size={16} /> },
                                        residual_sugar: { key: 'residual_sugar', icon: <Grape size={16} /> },
                                        total_ph: { key: 'total_ph', icon: <Thermometer size={16} /> },
                                        volatile_acidity: { key: 'volatile_acidity', icon: <Thermometer size={16} /> },
                                        total_acidity: { key: 'total_acidity', icon: <Thermometer size={16} /> },
                                        // Mappings for keys coming as natural text from DB
                                        "Alcohol": { key: 'alcohol', icon: <Droplet size={16} /> },
                                        "Azúcar Residual": { key: 'residual_sugar', icon: <Grape size={16} /> },
                                        "pH": { key: 'total_ph', icon: <Thermometer size={16} /> },
                                        "Acidez Volátil": { key: 'volatile_acidity', icon: <Thermometer size={16} /> },
                                        "Acidez Total": { key: 'total_acidity', icon: <Thermometer size={16} /> },
                                    };

                                    const meta = metaMap[key] || { key: key, icon: <Check size={16} /> };
                                    // Use explicit keys for type safety in t() if possible, or fallback to key if safe
                                    // t('analysis.' + key) might work if configured, but better to be safe.
                                    // I defined analysis keys in json: "analysis": { "alcohol": "..." }
                                    // So t(`analysis.${key}`) is valid effectively.

                                    return (
                                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <dt className="flex items-center gap-2 text-gray-500"> {meta.icon} {t(`analysis.${meta.key}`)}</dt>
                                            <dd className="font-bold text-brand-dark">{value as string}</dd>
                                        </div>
                                    )
                                })}

                                {product.technical_details?.aging_potential && (
                                    <div className="pt-4">
                                        <dt className="text-xs uppercase text-gray-400 font-bold mb-1">{t('aging_potential')}</dt>
                                        <dd className="text-gray-700">{product.technical_details.aging_potential}</dd>
                                    </div>
                                )}

                                {product.technical_details?.wood_type && (
                                    <div className="pt-2">
                                        <dt className="text-xs uppercase text-gray-400 font-bold mb-1">{t('barrel_aging')}</dt>
                                        <dd className="text-gray-700">{product.technical_details.wood_type}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
