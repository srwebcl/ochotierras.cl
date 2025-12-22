"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Section } from "@/components/ui/Section"

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

interface Category {
    id: number;
    name: string;
    slug: string;
    wines: Wine[];
}

export default function CategoryPage() {
    const { slug } = useParams()
    const [category, setCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!slug) return;

        setIsLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok")
                return res.json()
            })
            .then((categories: Category[]) => {
                const found = categories.find((c) => c.slug === slug)
                if (found) {
                    setCategory(found)
                } else {
                    setError(true)
                }
            })
            .catch(err => {
                console.error("Failed to fetch category:", err)
                setError(true)
            })
            .finally(() => setIsLoading(false))
    }, [slug])

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <div className="animate-pulse text-2xl font-serif">Cargando categoría...</div>
            </div>
        )
    }

    if (error || !category) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <h1 className="text-4xl font-serif font-bold mb-4">Categoría no encontrada</h1>
                <Link href="/tienda">
                    <Button variant="outline">Volver a la Tienda</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero for Category */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image src="/images/general/vineyard-hero.webp" alt="Background" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-brand-dark/70 z-10" />

                <div className="container relative z-20 text-center px-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{category.name}</h1>
                    <div className="h-1 w-24 bg-brand-gold mx-auto mb-6"></div>
                    <Link href="/tienda" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Volver a Todas las Colecciones
                    </Link>
                </div>
            </section>

            <Section className="bg-gray-50 text-brand-dark">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.wines.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col animate-fade-in">
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
                    {category.wines.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500 font-serif text-xl">
                            No hay productos disponibles en esta categoría por el momento.
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}
