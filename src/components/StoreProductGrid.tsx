"use client"

import { CompactProductCard } from "@/components/CompactProductCard"

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
    badgeText?: string;
    badgeBgColor?: string;
    badgeTextColor?: string;
    badgeSize?: 'small' | 'medium' | 'large';
}

interface StoreProductGridProps {
    products: Wine[];
    filterCategory?: string | null;
}

export function StoreProductGrid({ products, filterCategory }: StoreProductGridProps) {
    const t = useTranslations('Tienda.status');
    const locale = useLocale();

    const filteredProducts = filterCategory && filterCategory !== 'todos'
        ? products.filter(product => {
            // Filter by category slug if available, or type for backward compatibility
            return product.category_slug === filterCategory ||
                product.type?.toLowerCase() === filterCategory.toLowerCase();
        })
        : products;

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
