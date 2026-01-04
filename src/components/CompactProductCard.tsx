"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { Product as CartProduct } from "@/data/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
    id: number;
    name: string;
    nameEn?: string;
    subtitle?: string;
    price: number;
    image?: string;
    slug?: string;
    category_name?: string;
    type?: string;
    stock?: number;
    description?: string;
}

interface CompactProductCardProps {
    product: Product
    locale?: string
}

export function CompactProductCard({ product, locale = 'es' }: CompactProductCardProps) {
    const isEnglish = locale === 'en';
    const localizedName = isEnglish && product.nameEn ? product.nameEn : product.name;
    const { addToCart } = useCart();

    // Image fallback state
    const [imgSrc, setImgSrc] = useState(product.image || '/images/bottles/chardonnay-reserva.webp');

    useEffect(() => {
        setImgSrc(product.image || '/images/bottles/chardonnay-reserva.webp');
    }, [product.image]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const cartItem: CartProduct = {
            id: product.id,
            name: product.name,
            slug: product.slug || String(product.id),
            category: product.type || 'Vino',
            price: product.price,
            image: product.image || '/images/bottles/chardonnay-reserva.webp',
            type: product.type || 'Vino',
            description: product.description || '',
            stock: product.stock
        };

        // Add 1 unit (The Product IS the Box of 6 with total price)
        addToCart(cartItem, 1);
    };

    // Determine color theme based on wine type
    const isWhiteWine = product.type?.toLowerCase().includes('chardonnay') ||
        product.name.toLowerCase().includes('blanco') ||
        product.name.toLowerCase().includes('white');

    // Colors
    // Richer Gradients for "Jewel" effect
    const glowClasses = isWhiteWine
        ? 'bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700'
        : 'bg-gradient-to-br from-rose-300 via-red-600 to-red-900';

    const accentColor = isWhiteWine ? 'text-brand-gold' : 'text-brand-red';

    // Badge Content
    const badgeText = product.category_name || product.type || 'Vino';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group w-full h-auto"
        >
            {/* Card Container */}
            <div className="relative w-full bg-white rounded-[1.5rem] p-4 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-neutral-100 group-hover:border-neutral-200 overflow-hidden flex flex-col items-center">

                {/* 1. Floating Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-brand-dark/90 px-3 py-1 rounded-full shadow-sm">
                        {badgeText}
                    </span>
                </div>

                {/* 2. Bottle & Glow Section */}
                <div className="relative w-full h-[260px] flex items-center justify-center mt-4 mb-2">
                    {/* Glow - Softer, more sophisticated diffusion */}
                    <div className={cn(
                        "absolute w-[180px] h-[180px] rounded-full blur-[90px] transition-all duration-1000 ease-in-out opacity-30 scale-90 group-hover:opacity-70 group-hover:scale-110",
                        glowClasses
                    )} />
                    {/* Permanent core glow - Very subtle */}
                    <div className={cn(
                        "absolute w-[140px] h-[140px] rounded-full blur-[60px] opacity-20",
                        glowClasses
                    )} />

                    {/* Bottle */}
                    <Link href={`/tienda/${product.slug}`} className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                        <Image
                            src={imgSrc}
                            alt={localizedName}
                            fill
                            className="object-contain drop-shadow-md group-hover:drop-shadow-xl"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            onError={() => setImgSrc('/images/bottles/chardonnay-reserva.webp')}
                        />
                    </Link>
                </div>

                {/* 3. Info Section */}
                <div className="w-full flex flex-col items-center text-center z-20 space-y-3 pb-2">

                    {/* Title & Subtitle */}
                    <Link href={`/tienda/${product.slug}`} className="block space-y-1">
                        <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-brand-dark transition-colors line-clamp-2 px-1 min-h-[44px] flex items-center justify-center">
                            {localizedName}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
                            Caja de 6 Unidades
                        </p>
                    </Link>

                    {/* Price & Action */}
                    <div className="w-full flex items-end justify-between border-t border-gray-100 pt-4 px-1 pb-1">
                        {/* Price */}
                        <div className="flex flex-col items-start leading-none h-full justify-end">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total caja</span>
                            <div className={cn("flex items-baseline gap-0.5", accentColor)}>
                                <span className="text-lg font-bold">$</span>
                                <span className="text-2xl font-bold tracking-tight">
                                    {product.price ? product.price.toLocaleString("es-CL") : '0'}
                                </span>
                            </div>
                        </div>

                        {/* Add Button */}
                        <Button
                            onClick={handleAddToCart}
                            size="sm"
                            className="bg-neutral-900 text-white rounded-full px-6 h-10 shadow-xl hover:bg-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group/btn font-sans"
                        >
                            <span className="text-[11px] font-extrabold tracking-widest">AÑADIR</span>
                            <ShoppingCart className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}
