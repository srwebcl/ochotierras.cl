"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { PRODUCTS as products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ProductDetailPage() {
    const params = useParams()
    const slug = params?.slug as string
    const product = products.find((p) => p.slug === slug)
    const [quantity, setQuantity] = useState(1)

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-3xl text-white mb-4">Producto no encontrado</h1>
                <Button asChild><Link href="/store">Volver a la tienda</Link></Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/store" className="text-gray-400 hover:text-brand-gold flex items-center gap-2 text-sm uppercase tracking-wide transition-colors">
                        <ChevronLeft className="h-4 w-4" /> Volver a la Tienda
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="relative bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/5 aspect-square lg:aspect-[4/5]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${product.image})` }}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="text-brand-gold font-bold uppercase tracking-wider mb-2 text-sm">{product.category}</div>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">{product.name}</h1>

                        {/* Rating Placeholder */}
                        <div className="flex items-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 text-brand-gold fill-brand-gold" />)}
                            <span className="text-gray-500 text-sm ml-2">(12 Reseñas)</span>
                        </div>

                        <div className="text-3xl font-bold text-white mb-8">
                            ${product.price.toLocaleString("es-CL")}
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-10 border-l-2 border-brand-gold pl-6">
                            {product.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-12">
                            {/* Quantity */}
                            <div className="flex items-center border border-white/20 rounded-md">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-white hover:bg-white/5 transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-3 text-white w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-white hover:bg-white/5 transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <Button size="lg" className="flex-1 gap-2 text-base h-auto py-3">
                                <ShoppingCart className="h-5 w-5" /> Añadir al Carrito
                            </Button>
                        </div>

                        {/* Additional Info Tabs Placeholder */}
                        <div className="border-t border-white/10 pt-8 space-y-4">
                            <div className="group cursor-pointer">
                                <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors flex justify-between items-center">
                                    Notas de Cata <Plus className="h-4 w-4 text-gray-500" />
                                </h3>
                            </div>
                            <div className="group cursor-pointer">
                                <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors flex justify-between items-center">
                                    Maridaje <Plus className="h-4 w-4 text-gray-500" />
                                </h3>
                            </div>
                            <div className="group cursor-pointer">
                                <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors flex justify-between items-center">
                                    Información Técnica <Plus className="h-4 w-4 text-gray-500" />
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
