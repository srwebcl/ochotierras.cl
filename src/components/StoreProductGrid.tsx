"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "@/components/AddToCartButton"
import { Button } from "@/components/ui/button"

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
}

export function StoreProductGrid() {
    const [products, setProducts] = useState<Wine[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`)
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar vinos")
                return res.json()
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data)
                }
            })
            .catch(err => {
                console.error("Failed to load products:", err)
                setError("No pudimos cargar los productos. Por favor revisa tu conexión.")
            })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-pulse text-brand-dark font-serif text-xl">Cargando bodega...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-red-500 font-bold border border-red-200 p-8 rounded-xl bg-red-50">
                    {error}
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500 font-serif text-xl">No hay productos disponibles por el momento.</div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                    <Link href={`/tienda/${product.slug}`} className="relative h-[400px] w-full bg-gray-50 flex items-center justify-center p-8 overflow-hidden cursor-pointer">
                        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                            <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                                ¡Quedan pocos!
                            </span>
                        )}
                        {(product.stock === 0) && (
                            <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-brand-dark font-bold text-xl uppercase tracking-widest border-2 border-brand-dark px-6 py-2">
                                    Agotado
                                </span>
                            </div>
                        )}
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image || 'https://via.placeholder.com/400x800?text=Vino'}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>

                    <div className="p-8 flex flex-col flex-grow text-center">
                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">{product.type || 'Vino'}</span>
                        <Link href={`/tienda/${product.slug}`}>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        <div className="mt-auto pt-4 border-t border-gray-100 w-full flex flex-col gap-4">
                            <span className="text-2xl font-bold text-brand-dark">
                                ${product.price ? product.price.toLocaleString('es-CL') : '0'}
                            </span>

                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
