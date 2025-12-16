"use client"

import { useState } from "react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = ["Todos", "Vinos Tintos", "Vinos Blancos", "Vinos Iconos", "Packs"]

export default function StorePage() {
    const [activeCategory, setActiveCategory] = useState("Todos")

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <div className="min-h-screen bg-brand-dark pt-24 pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Tienda Online</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Lleva la experiencia del Valle del Limarí a tu mesa. Envíos a todo Chile.
                </p>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === cat ? "default" : "outline"}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "rounded-full transition-all",
                                activeCategory === cat ? "bg-brand-gold text-brand-dark hover:bg-brand-gold/90" : "text-gray-400 border-gray-700 hover:text-white hover:border-white"

                            )}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No hay productos en esta categoría.</p>
                        <Button variant="link" onClick={() => setActiveCategory("Todos")} className="mt-4">
                            Ver todos los productos
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
