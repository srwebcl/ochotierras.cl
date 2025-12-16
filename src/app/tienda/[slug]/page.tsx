"use client"

import { useParams } from "next/navigation"
import { PRODUCTS } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react"

export default function ProductPage() {
    const params = useParams()
    const { addToCart } = useCart()

    // Find product by ID
    const product = PRODUCTS.find(p => p.id === Number(params.slug))

    if (!product) {
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
                        <div className="absolute inset-0 bg-[url('/images/textures/noise.png')] opacity-20 mix-blend-multiply" />
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={600}
                            className="object-contain max-h-full drop-shadow-2xl z-10 animate-fade-in-up"
                        />
                        {product.tag && (
                            <span className="absolute top-8 left-8 bg-brand-dark text-white text-xs font-bold px-4 py-2 uppercase tracking-widest z-10">
                                {product.tag}
                            </span>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-8 animate-fade-in">
                        <div>
                            <span className="text-brand-gold text-sm font-black uppercase tracking-[0.2em]">{product.type}</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.price.toLocaleString('es-CL')}
                                </span>
                                {product.soldOut ? (
                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 text-xs font-bold uppercase rounded">Agotado</span>
                                ) : (
                                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                                        <Check size={16} /> Disponible
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="h-px w-full bg-gray-100" />

                        <div className="prose prose-lg text-gray-600">
                            <p>{product.description}</p>
                        </div>

                        {product.tastingNotes && (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                                <h3 className="font-serif font-bold text-gray-900 text-lg">Notas de Cata</h3>
                                <div className="grid gap-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-16 font-bold text-xs uppercase text-gray-400 mt-1">Nariz</div>
                                        <div className="flex-1 text-sm text-gray-700">{product.tastingNotes.nose}</div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-16 font-bold text-xs uppercase text-gray-400 mt-1">Boca</div>
                                        <div className="flex-1 text-sm text-gray-700">{product.tastingNotes.mouth}</div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-16 font-bold text-xs uppercase text-gray-400 mt-1">Maridaje</div>
                                        <div className="flex-1 text-sm text-gray-700">{product.tastingNotes.pairing}</div>
                                    </div>
                                </div>
                            </div>
                        )}

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

                            {!product.soldOut ? (
                                <Button
                                    className="w-full bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark h-14 text-lg font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl"
                                    onClick={() => addToCart(product)}
                                >
                                    Añadir al Carrito
                                </Button>
                            ) : (
                                <Button disabled className="w-full h-14 bg-gray-200 text-gray-400 cursor-not-allowed uppercase font-bold">
                                    Sin Stock
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
