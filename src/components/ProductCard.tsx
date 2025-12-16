import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

import { Product } from "@/data/products"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative bg-brand-dark rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-brand-gold/30 transition-all duration-300">
            {/* Image Area */}
            <div className="aspect-[3/4] bg-neutral-900 relative overflow-hidden">
                {/* Using a placeholder-capable image logic */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})`, opacity: 0.8 }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                {/* Quick Action Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-brand-dark to-transparent">
                    <Button className="w-full gap-2 shadow-xl">
                        <ShoppingCart className="h-4 w-4" /> Añadir
                    </Button>
                </div>
            </div>

            {/* Info */}
            <div className="p-5">
                <div className="text-xs text-brand-gold mb-2 uppercase tracking-wide">{product.category}</div>
                <Link href={`/store/${product.slug}`}>
                    <h3 className="text-lg font-serif font-bold text-white mb-2 leading-tight hover:text-brand-gold transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">
                        ${product.price.toLocaleString("es-CL")}
                    </span>
                </div>
            </div>
        </div>
    )
}
