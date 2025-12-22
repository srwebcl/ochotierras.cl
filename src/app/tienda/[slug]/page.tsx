"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Truck, ShieldCheck, Download, Droplet, Thermometer, Grape, MapPin, Calendar, Award } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Wine {
    id: number;
    name: string;
    subtitle?: string;
    type?: string;
    price: number;
    image?: string;
    bgGradient?: string;
    description?: string;
    stock?: number;
    slug?: string;
    technical_sheet?: string | null;
    vintage_year?: number;
    strain?: string;
    origin?: string;
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
    const { slug } = useParams()
    const [product, setProduct] = useState<Wine | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [activeImage, setActiveImage] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return;

        setIsLoading(true)
        // Try finding in specific product API first (now that we have /api/products giving full list)
        // But for efficiency on slug lookup without a specific slug endpoint, we fetch all. 
        // Ideal: /api/products/{slug} but we stick to list filtering for now.
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`)
            .then(res => res.json())
            .then((products: any[]) => {
                const found = products.find((p: any) => p.slug === slug)
                if (found) {
                    setProduct(found)
                    setActiveImage(found.image)
                } else {
                    // Fallback to categories if needed (legacy check)
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
    }, [slug])

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-brand-dark text-white">
                <div className="animate-pulse text-2xl font-serif">Cargando experiencia...</div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <h1 className="text-4xl font-serif font-bold mb-4">Vino no encontrado</h1>
                <Link href="/tienda">
                    <Button variant="outline">Volver a la Bodega</Button>
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
                            className="relative h-[500px] md:h-[700px] w-full max-w-[400px]"
                        >
                            <Image
                                src={activeImage || product.image || '/images/bottles/placeholder.webp'}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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
                        className="text-white"
                    >
                        <Link href="/tienda" className="inline-flex items-center gap-2 text-brand-gold mb-6 hover:underline text-sm uppercase tracking-widest font-bold">
                            <ArrowLeft size={16} /> Volver a la Tienda
                        </Link>

                        <span className="block text-brand-gold/80 text-lg font-serif italic mb-2">{product.subtitle || product.type}</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">{product.name}</h1>

                        <div className="prose prose-lg prose-invert text-gray-300 mb-8 max-w-xl font-light">
                            <p>{product.description}</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-t border-white/10 pt-8 mb-8">
                            <div>
                                <span className="block text-xs uppercase text-gray-400 mb-1">Precio Botella</span>
                                <span className="text-4xl font-bold text-white">${product.price.toLocaleString('es-CL')}</span>
                            </div>

                            <div className="flex-1 w-full md:w-auto">
                                {product.stock === 0 ? (
                                    <div className="bg-white/10 backdrop-blur text-white px-6 py-4 text-center rounded-lg font-bold uppercase tracking-widest">
                                        Agotado Temporalmente
                                    </div>
                                ) : (
                                    <div className="bg-white text-brand-dark p-6 rounded-xl shadow-2xl max-w-md">
                                        <AddToCartButton product={product} />
                                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 justify-center">
                                            <span className="flex items-center gap-1"><Truck size={14} /> Envío a todo Chile</span>
                                            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Compra Segura</span>
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
                                <Download size={18} /> Descargar Ficha Técnica
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
                        {(product.technical_details?.tasting_notes) && (
                            <section className="animate-fade-in-up">
                                <h3 className="text-3xl font-serif font-bold text-brand-dark mb-8 flex items-center gap-3">
                                    <span className="w-12 h-[1px] bg-brand-gold"></span> Notas de Cata
                                </h3>
                                <div
                                    className="prose prose-lg text-gray-600 font-light border-l-4 border-brand-gold pl-6 py-2"
                                    dangerouslySetInnerHTML={{ __html: product.technical_details.tasting_notes }}
                                />
                            </section>
                        )}

                        {product.technical_details?.awards && product.technical_details.awards.length > 0 && (
                            <section>
                                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Premios & Reconocimientos</h3>
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
                                Ficha Técnica
                            </h3>

                            <dl className="space-y-4 text-sm">
                                {product.vintage_year && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <Calendar size={16} /> Año</dt>
                                        <dd className="font-bold text-brand-dark">{product.vintage_year}</dd>
                                    </div>
                                )}
                                {product.strain && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <Grape size={16} /> Variedad</dt>
                                        <dd className="font-bold text-brand-dark text-right max-w-[50%]">{product.strain}</dd>
                                    </div>
                                )}
                                {product.origin && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <dt className="flex items-center gap-2 text-gray-500"> <MapPin size={16} /> Origen</dt>
                                        <dd className="font-bold text-brand-dark">{product.origin}</dd>
                                    </div>
                                )}

                                {/* Analysis Fields from JSON */}
                                {product.technical_details?.analysis && Object.entries(product.technical_details.analysis).map(([key, value]) => {
                                    const labelMap: Record<string, any> = {
                                        alcohol: { label: "Alcohol", icon: <Droplet size={16} /> },
                                        residual_sugar: { label: "Azúcar R.", icon: <Grape size={16} /> },
                                        total_ph: { label: "pH", icon: <Thermometer size={16} /> },
                                        volatile_acidity: { label: "Acidez Volátil", icon: <Thermometer size={16} /> },
                                        total_acidity: { label: "Acidez Total", icon: <Thermometer size={16} /> },
                                    };
                                    const meta = labelMap[key] || { label: key, icon: <Check size={16} /> };

                                    return (
                                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <dt className="flex items-center gap-2 text-gray-500"> {meta.icon} {meta.label}</dt>
                                            <dd className="font-bold text-brand-dark">{value as string}</dd>
                                        </div>
                                    )
                                })}

                                {product.technical_details?.aging_potential && (
                                    <div className="pt-4">
                                        <dt className="text-xs uppercase text-gray-400 font-bold mb-1">Potencial de Guarda</dt>
                                        <dd className="text-gray-700">{product.technical_details.aging_potential}</dd>
                                    </div>
                                )}

                                {product.technical_details?.wood_type && (
                                    <div className="pt-2">
                                        <dt className="text-xs uppercase text-gray-400 font-bold mb-1">Guarda en Barrica</dt>
                                        <dd className="text-gray-700">{product.technical_details.wood_type}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
