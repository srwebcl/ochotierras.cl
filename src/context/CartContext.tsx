"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { Product } from '@/data/products'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    isOpen: boolean
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    toggleCart: () => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('ochotierras-cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('ochotierras-cart', JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, { ...product, quantity }]
        })
        setIsOpen(true)
    }, [])

    const removeFromCart = useCallback((productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId))
    }, [])

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        setItems(prev => {
            if (quantity < 1) {
                return prev.filter(item => item.id !== productId)
            }
            return prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        })
    }, [])

    const toggleCart = useCallback(() => setIsOpen(prev => !prev), [])

    const clearCart = useCallback(() => setItems([]), [])

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
