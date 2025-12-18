"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { Wine } from "@/lib/collection-api"
import { Product } from "@/data/products"

interface AddToCartButtonProps {
    product: Wine
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart()

    // Transform Wine to Product (if needed, or ensure interface compatibility)
    // The CartContext expects Product interface which is similar to Wine but might have extra fields
    const cartProduct: Product = {
        id: product.id,
        name: product.name,
        slug: String(product.id), // Or fetch slug from API
        category: product.type || 'Vino',
        price: product.price,
        image: product.image || '/images/bottles/placeholder.webp',
        type: product.type || 'Vino',
        description: product.description || '',
        stock: product.stock
    }

    const hasStock = product.stock !== undefined ? product.stock > 0 : true

    if (!hasStock) {
        return (
            <Button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed">
                Sin Stock
            </Button>
        )
    }

    return (
        <Button
            className="w-full bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
            onClick={() => addToCart(cartProduct)}
        >
            Añadir al Carrito
        </Button>
    )
}
