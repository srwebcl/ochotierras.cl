"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "@/components/AddToCartButton"
import { CompactProductCard } from "@/components/CompactProductCard"
import { Button } from "@/components/ui/button"

import { useLocale, useTranslations } from "next-intl"

interface Wine {
    id: number;
    name: string;
    nameEn?: string;
    subtitle?: string;
    subtitleEn?: string;
    type?: string;
    category_name?: string;
    category_slug?: string;
    price: number;
    image?: string;
    bgGradient?: string;
    description?: string;
    descriptionEn?: string;
    stock?: number;
    slug?: string;
}

interface StoreProductGridProps {
    filterCategory?: string | null;
}

export function StoreProductGrid({ filterCategory }: StoreProductGridProps) {
    const t = useTranslations('Tienda.status');
    const locale = useLocale();
    const isEnglish = locale === 'en';

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
                setError(t('error'))
            })
            .finally(() => setIsLoading(false))
    }, [t])

    const filteredProducts = filterCategory && filterCategory !== 'todos'
        ? products.filter(product => {
            // Filter by category slug if available, or type for backward compatibility
            return product.category_slug === filterCategory ||
                product.type?.toLowerCase() === filterCategory.toLowerCase();
        })
        : products;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-pulse text-brand-dark font-serif text-xl">{t('loading')}</div>
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

    if (filteredProducts.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500 font-serif text-xl">
                    {products.length === 0 ? t('empty_all') : t('empty_category')}
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
                <CompactProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    priority={index < 3}
                />
            ))
            }
        </div>
    )
}
