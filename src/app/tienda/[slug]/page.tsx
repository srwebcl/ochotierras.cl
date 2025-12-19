"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

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
}

export default function ProductPage() {
    const { slug } = useParams()
    const [product, setProduct] = useState<Wine | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!slug) return;

        setIsLoading(true)
        // Ideally we would fetch /api/products/${slug}, but for now we fetch all and find (matching the previous logic)
        // or if the backend supports individual fetch, that's better. Assuming we stick to the working /api/collection-wines for consistency.
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/collection-wines`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok")
                return res.json()
            })
            .then((products: Wine[]) => {
                const found = products.find(p => p.id === Number(slug))
                if (found) {
                    setProduct(found)
                } else {
                    setError(true)
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
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <div className="animate-pulse text-2xl font-serif">Cargando...</div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <h1 className="text-4xl font-serif font-bold mb-4">Producto no encontrado</h1>
                <Link href="/tienda">
                    <Button variant="outline">Volver a la Tienda</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Breadcrumb / Back */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/tienda" className="flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors text-sm font-medium">
                    <ArrowLeft size={16} /> Volver a la Tienda
                </Link>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Image Section */}
                    <div className="relative bg-gray-50 rounded-2xl h-[500px] md:h-[700px] flex items-center justify-center p-12 overflow-hidden border border-gray-100 sticky top-28">
                        {/* <div className="absolute inset-0 bg-[url('/images/textures/noise.png')] opacity-20 mix-blend-multiply" /> */}
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image || '/images/bottles/placeholder.webp'}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-contain max-h-full drop-shadow-2xl z-10 animate-fade-in-up"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                            <span className="absolute top-8 left-8 bg-orange-500 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest z-10">
                                ¡Quedan pocos!
                            </span>
                        )}
                        {product.stock === 0 && (
                            <span className="absolute top-8 left-8 bg-brand-dark text-white text-xs font-bold px-4 py-2 uppercase tracking-widest z-10">
                                Agotado
                            </span>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-8 animate-fade-in">
                        <div>
                            <span className="text-brand-gold text-sm font-black uppercase tracking-[0.2em]">{product.type || 'Vinos'}</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.price ? product.price.toLocaleString('es-CL') : '0'}
                                </span>
                                {product.stock === 0 ? (
                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 text-xs font-bold uppercase rounded">Agotado</span>
                                ) : (
                                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                        <Check size={16} /> Disponible {product.stock !== undefined ? `(${product.stock})` : ''}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="h-px w-full bg-gray-100" />

                        <div className="prose prose-lg text-gray-600">
                            <p>{product.description}</p>
                        </div>

                        {/* Tasting Notes - Assuming simplified or mapped data since API might return simple strings or structure different from hardcoded */}
                        {/* If API doesn't provide structured tasting notes yet, we might skip this or handle it if we add it to the backend model */}

                        <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Truck size={18} className="text-brand-gold" />
                                    <span>Despacho a todo Chile</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-brand-gold" />
                                    <span>Compra Segura</span>
                                </div>
                            </div>

                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
