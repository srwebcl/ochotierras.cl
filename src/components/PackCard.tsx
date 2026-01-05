import Link from "next/link"
import { ShoppingCart, Info, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PackBottleGrid } from "./PackBottleGrid"

interface PackItem {
    id: number;
    name: string;
    quantity: number;
    image?: string;
}

interface PackProduct {
    id: number;
    name: string;
    nameEn?: string;
    subtitle?: string;
    price: number;
    slug?: string;
    description?: string;
    stock?: number;
    includes: PackItem[];
}

interface PackCardProps {
    product: PackProduct
    locale?: string
}

export function PackCard({ product, locale = 'es' }: PackCardProps) {
    const isEnglish = locale === 'en';
    const localizedName = isEnglish && product.nameEn ? product.nameEn : product.name;
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const cartItem = {
            id: product.id,
            name: product.name,
            slug: product.slug || String(product.id),
            category: 'Pack',
            price: product.price,
            image: product.includes[0]?.image || '/images/logo.webp', // Use first item image or logo as thumbnail
            type: 'Pack',
            description: product.description || '',
            stock: product.stock
        };

        addToCart(cartItem, 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group w-full h-auto"
        >
            <div className="relative w-full bg-white rounded-[1.2rem] p-3 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-brand-gold/20 group-hover:border-brand-gold/50 overflow-hidden flex flex-col items-center">

                {/* Floating Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-white bg-brand-gold px-2 py-0.5 rounded-full shadow-sm">
                        PACK MIX
                    </span>
                </div>

                {/* Dynamic Bottle Grid - Taller Container */}
                <div className="relative w-full h-[280px] flex items-center justify-center mt-4 mb-2 group/image">
                    {/* Glow - Larger */}
                    <div className="absolute w-[200px] h-[200px] rounded-full blur-[90px] bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 opacity-20 scale-90 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000" />

                    <Link href={`/tienda/pack/${product.slug}`} className="relative z-10 w-full h-full flex items-center justify-center">
                        <PackBottleGrid items={product.includes} />
                    </Link>
                </div>

                {/* HOVER REVEAL - LARGE & FULL TOP COVER */}
                <Link
                    href={`/tienda/pack/${product.slug}`}
                    className="absolute top-0 left-0 right-0 h-[320px] z-40 bg-white/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center"
                >
                    <span className="text-sm uppercase tracking-widest text-brand-gold font-extrabold mb-4 border-b-2 border-brand-gold/20 pb-2 w-full">
                        {product.includes.length > 1 ? 'Contenido del Mix' : 'Contenido del Pack'}
                    </span>
                    <ul className="space-y-2 w-full">
                        {product.includes.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-800 font-serif font-medium leading-tight flex items-center justify-between border-b border-gray-100 pb-1.5 last:border-0">
                                <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md min-w-[2rem]">{item.quantity}x</span>
                                <span className="text-right truncate pl-2">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                    {/* Text removed as requested */}
                </Link>

                {/* Info Section */}
                <div className="w-full flex flex-col items-center text-center z-20 space-y-2 pb-1">
                    <Link href={`/tienda/pack/${product.slug}`} className="block space-y-0.5">
                        <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-brand-gold transition-colors px-1">
                            {localizedName}
                        </h3>

                        {/* UNIVERSAL SMART SUMMARY */}
                        <div className="w-full h-6 flex items-center justify-center gap-1.5 bg-brand-gold/5 rounded-sm px-2">
                            <Info className="w-3 h-3 text-brand-gold" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-700">
                                {product.includes.length > 1
                                    ? `Mix ${product.includes.length} Variedades`
                                    : `Pack ${product.includes.reduce((acc, i) => acc + i.quantity, 0)} Botellas`
                                }
                            </span>
                        </div>
                    </Link>

                    {/* Price & Action */}
                    <div className="w-full flex items-end justify-between border-t border-gray-100 pt-3 px-1">
                        <div className="flex flex-col items-start leading-none h-full justify-end">
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Precio</span>
                            <div className="flex items-baseline gap-0.5 text-brand-gold">
                                <span className="text-base font-bold">$</span>
                                <span className="text-xl font-bold tracking-tight">
                                    {product.price ? product.price.toLocaleString("es-CL") : '0'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={`/tienda/pack/${product.slug}`}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full w-9 h-9 border-gray-200 text-gray-400 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>

                            <Button
                                onClick={handleAddToCart}
                                size="sm"
                                className="bg-brand-dark text-white rounded-full px-5 h-9 shadow-md hover:bg-brand-gold hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 font-sans"
                            >
                                <span className="text-[10px] font-extrabold tracking-widest">AGREGAR</span>
                                <ShoppingCart className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}
