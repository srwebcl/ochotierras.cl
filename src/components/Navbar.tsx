"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"

const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Nuestros Vinos", href: "/nuestros-vinos" },
    { name: "Bodega y Viñedos", href: "/bodega-y-vinedos" },
    { name: "Turismo", href: "/turismo" },
    { name: "Tienda", href: "/tienda" },
    { name: "Contacto", href: "/contacto" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const { scrollY } = useScroll()
    const pathname = usePathname()
    // Connect to Cart Context
    const { toggleCart, cartCount } = useCart()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > 50 && latest > previous) {
            setIsScrolled(true)
        } else if (latest < 50) {
            setIsScrolled(false)
        }
    })

    const isHome = pathname === "/"

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isScrolled || !isHome || isMobileMenuOpen ? "bg-brand-dark/95 backdrop-blur-md shadow-md border-b border-white/5" : "bg-transparent"
            )}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative h-12 w-48 hover:opacity-90 transition-opacity">
                        <Image
                            src="/images/logos/logo-white.webp"
                            alt="Ochotierras"
                            fill
                            className="object-contain object-left"
                            priority
                            sizes="(max-width: 768px) 120px, 160px"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-gold",
                                    pathname === item.href ? "text-brand-gold" : "text-white/90"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-white hover:text-brand-gold group"
                            onClick={toggleCart}
                        >
                            <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold flex items-center justify-center animate-in fade-in zoom-in">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-brand-gold transition-colors flex items-center gap-4"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {/* Mobile Cart Icon */}
                        <div className="relative mr-2" onClick={(e) => {
                            e.stopPropagation();
                            toggleCart();
                        }}>
                            <ShoppingBag className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-brand-dark border-t border-white/10"
                >
                    <nav className="container mx-auto px-4 py-8 flex flex-col gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-lg font-serif text-white hover:text-brand-gold transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button
                            className="w-full mt-4 bg-brand-gold text-brand-dark hover:bg-white"
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                toggleCart()
                            }}
                        >
                            Ver Carrito ({cartCount})
                        </Button>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    )
}
