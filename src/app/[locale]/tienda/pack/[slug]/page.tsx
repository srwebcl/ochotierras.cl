"use client"

import { useEffect, useState, use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/Section"
import { ShoppingCart, Check, Info, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { PackBottleGrid } from "@/components/PackBottleGrid"

interface PackItem {
    id: number;
    name: string;
    quantity: number;
    image?: string;
    technical_details?: any;
    tasting_notes?: string;
    tasting_notes_en?: string;
    strain?: string;
    vintage_year?: string;
}

interface PackProduct {
    id: number;
    name: string;
    nameEn?: string;
    subtitle?: string;
    price: number;
    slug: string;
    description?: string;
    descriptionEn?: string;
    stock: number;
    includes: PackItem[];
}

const PackItemCard = ({ item, isEnglish }: { item: PackItem, isEnglish: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
            {/* Image Header with Background */}
            <div className="bg-gray-50/50 p-6 flex justify-center items-center relative">
                <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-full text-gray-700 shadow-sm">
                        x{item.quantity}
                    </span>
                </div>
                <div className="relative w-28 h-64 md:w-36 md:h-72">
                    <Image
                        src={item.image || '/images/bottles/chardonnay-reserva.webp'}
                        alt={item.name}
                        fill
                        className="object-contain drop-shadow-xl"
                    />
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 md:p-8 space-y-4">
                <div className="text-center space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 leading-tight">
                        {item.name}
                    </h3>

                    {/* Metadata Chips */}
                    <div className="flex flex-col items-center gap-2 text-xs md:text-sm text-gray-600 w-full px-2">
                        {item.strain && (
                            <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 flex items-start justify-center gap-2 max-w-full">
                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-1.5 flex-shrink-0"></span>
                                <span className="leading-relaxed">
                                    <span className="text-gray-500">{isEnglish ? 'Strain' : 'Cepa'}:</span>{' '}
                                    <strong className="text-gray-900">{item.strain}</strong>
                                </span>
                            </div>
                        )}
                        {item.vintage_year && (
                            <div className="bg-gray-50 px-4 py-1.5 rounded-xl border border-gray-100 flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0"></span>
                                <span>
                                    <span className="text-gray-500">{isEnglish ? 'Vintage' : 'Año'}:</span>{' '}
                                    <strong className="text-gray-900">{item.vintage_year}</strong>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expandable Tasting Notes */}
                {(item.tasting_notes || item.tasting_notes_en) && (
                    <div className="pt-2 border-t border-gray-50 mt-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-gold py-2 transition-colors focus:outline-none"
                        >
                            <span>{isEnglish ? 'READ TASTING NOTES' : 'LEER NOTAS DE CATA'}</span>
                            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                ▼
                            </span>
                        </button>

                        <motion.div
                            initial={false}
                            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-2 pb-4 px-2 prose prose-sm max-w-none text-gray-600 text-center leading-relaxed bg-gray-50/50 rounded-xl my-2">
                                <div dangerouslySetInnerHTML={{ __html: isEnglish ? (item.tasting_notes_en || item.tasting_notes || '') : (item.tasting_notes || '') }} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default function PackPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = use(params);

    const isEnglish = locale === 'en';
    const [pack, setPack] = useState<PackProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        // Fetch all packs and find the one matching slug
        // Optimization: In a real app we'd have a specific endpoint /api/packs/{slug}
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/packs`)
            .then(res => res.json())
            .then((data: PackProduct[]) => {
                const found = data.find(p => p.slug === slug);
                if (found) {
                    setPack(found);
                } else {
                    // unexpected slug
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    if (!pack) return notFound();

    const localizedName = isEnglish && pack.nameEn ? pack.nameEn : pack.name;
    const localizedDesc = isEnglish && pack.descriptionEn ? pack.descriptionEn : pack.description;

    const handleAddToCart = () => {
        const cartItem = {
            id: pack.id,
            name: pack.name,
            slug: pack.slug,
            category: 'Pack',
            price: pack.price,
            image: pack.includes[0]?.image || '/images/logo.webp',
            type: 'Pack',
            description: pack.description || '',
            stock: pack.stock
        };
        addToCart(cartItem, 1);
    };

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href={`/${locale}/tienda`} className="inline-flex items-center text-gray-500 hover:text-brand-dark transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {isEnglish ? 'Back to Store' : 'Volver a la Tienda'}
                </Link>
            </div>

            {/* Hero Section */}
            <Section className="py-8 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Dynamic Visual - OPTIMIZED FOR MOBILE */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative flex justify-center py-6 md:py-0"
                        >
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[300px] h-[250px] md:h-[300px] bg-brand-gold/20 blur-[80px] md:blur-[100px] rounded-full" />

                            <div className="relative z-10 scale-110 md:scale-150 transform transition-transform duration-700">
                                <PackBottleGrid items={pack.includes} />
                            </div>
                        </motion.div>

                        {/* Right: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6 text-center lg:text-left"
                        >
                            <div className="inline-block bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">
                                {isEnglish ? 'Special Pack' : 'Pack Especial'}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight md:leading-tight">
                                {localizedName}
                            </h1>

                            {pack.subtitle && (
                                <p className="text-xl text-brand-dark italic font-serif">
                                    {isEnglish ? pack.subtitle : pack.subtitle}
                                </p>
                            )}

                            <div className="prose prose-base md:prose-lg text-gray-600 max-w-none">
                                <p>{localizedDesc}</p>
                            </div>

                            {/* Contents Summary */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                    {isEnglish ? 'Includes' : 'Incluye'}
                                </h3>
                                <ul className="space-y-2">
                                    {pack.includes.map(item => (
                                        <li key={item.id} className="flex items-center justify-between text-gray-800">
                                            <span className="flex items-center">
                                                <Check className="w-4 h-4 text-brand-gold mr-2" />
                                                {item.name}
                                            </span>
                                            <span className="font-bold">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* DESKTOP ACTION BAR */}
                            <div className="hidden md:flex flex-col md:flex-row items-center gap-6 pt-4 border-t border-gray-200">
                                <div>
                                    <span className="block text-sm text-gray-400 uppercase tracking-widest">
                                        {isEnglish ? 'Price' : 'Precio Pack'}
                                    </span>
                                    <span className="text-4xl font-bold text-brand-dark">
                                        ${pack.price.toLocaleString("es-CL")}
                                    </span>
                                </div>

                                <Button
                                    onClick={handleAddToCart}
                                    disabled={pack.stock <= 0}
                                    className="w-full md:w-auto bg-brand-dark text-white rounded-full px-12 py-8 text-lg hover:bg-brand-gold transition-colors shadow-xl"
                                >
                                    <ShoppingCart className="w-6 h-6 mr-3" />
                                    {pack.stock > 0 ? (isEnglish ? 'Add to Cart' : 'Agregar al Carrito') : (isEnglish ? 'Out of Stock' : 'Agotado')}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* MOBILE STICKY ACTION BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pb-safe-area">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total</span>
                        <span className="text-2xl font-bold text-brand-dark leading-none">
                            ${pack.price.toLocaleString("es-CL")}
                        </span>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        disabled={pack.stock <= 0}
                        className="flex-1 bg-brand-dark text-white rounded-full h-12 text-sm font-bold tracking-wide hover:bg-brand-gold shadow-lg"
                    >
                        {pack.stock > 0 ? (isEnglish ? 'ADD TO CART' : 'AGREGAR') : 'AGOTADO'}
                        <ShoppingCart className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Merged Technical Details Section */}
            <Section className="py-16 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
                        {isEnglish ? 'Wines in this Pack' : 'Vinos en este Pack'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {pack.includes.map(item => (
                            <PackItemCard key={item.id} item={item} isEnglish={isEnglish} />
                        ))}
                    </div>
                </div>
                {/* Added padding bottom for mobile sticky bar */}
            </Section>
            <div className="h-24 md:hidden" />
        </div>
    )
}
