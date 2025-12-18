"use client"

import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export function CartSidebar() {
    const { items, isOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart()

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[51] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]">
                            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-brand-gold" size={24} />
                                Tu Compra
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <p className="text-gray-400">Tu carrito está vacío.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-brand-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-brand-gold/20 hover:border-brand-gold pb-1"
                                    >
                                        Seguir Explorando
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                                        <div className="relative w-20 h-24 flex-shrink-0 bg-white/5 rounded-md overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-white font-serif font-bold leading-tight">{item.name}</h3>
                                                <p className="text-brand-gold text-sm mt-1">${item.price.toLocaleString('es-CL')}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1 border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-500 hover:text-red-400 transition-colors p-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-[#0A0A0A] border-t border-white/10 space-y-4">
                                <div className="flex items-center justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex items-center justify-between text-white text-xl font-bold font-serif">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString('es-CL')}</span>
                                </div>

                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="block w-full bg-brand-gold text-brand-dark py-4 text-center font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm flex items-center justify-center gap-2 group"
                                >
                                    Ir a Pagar <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-center text-xs text-gray-600">
                                    Envíos calculados en el siguiente paso.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
