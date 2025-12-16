"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { PRODUCTS } from "@/data/products"
import { useCart } from "@/context/CartContext"

export default function Tienda() {
    const { addToCart } = useCart()

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image src="/images/general/vineyard-hero.webp" alt="Tienda Background" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-brand-dark/60 z-10" />

                <div className="container relative z-20 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Tienda Online</h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Recibe la excelencia del Valle del Limarí directamente en tu hogar.
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <Section className="bg-gray-50 text-brand-dark">
                {/* Filters (Visual Only - Logic later if needed) */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up">
                    {['Todos', 'Tintos', 'Blancos', 'Alta Gama', 'Packs'].map((filter) => (
                        <button key={filter} className="px-6 py-2 rounded-full border border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white transition-all text-sm uppercase tracking-wider font-bold">
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                            <Link href={`/tienda/${product.id}`} className="relative h-[400px] w-full bg-gray-50 flex items-center justify-center p-8 overflow-hidden cursor-pointer">
                                {product.tag && (
                                    <span className="absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                                        {product.tag}
                                    </span>
                                )}
                                {product.soldOut && (
                                    <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-brand-dark font-bold text-xl uppercase tracking-widest border-2 border-brand-dark px-6 py-2">
                                            Agotado
                                        </span>
                                    </div>
                                )}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={200}
                                    height={400}
                                    className="object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>

                            <div className="p-8 flex flex-col flex-grow text-center">
                                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">{product.type}</span>
                                <Link href={`/tienda/${product.id}`}>
                                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="mt-auto pt-4 border-t border-gray-100 w-full flex flex-col gap-4">
                                    <span className="text-2xl font-bold text-brand-dark">
                                        ${product.price.toLocaleString('es-CL')}
                                    </span>

                                    {!product.soldOut ? (
                                        <Button
                                            className="w-full bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
                                            onClick={() => addToCart(product)}
                                        >
                                            Añadir al Carrito
                                        </Button>
                                    ) : (
                                        <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                                            Sin Stock
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    )
}
