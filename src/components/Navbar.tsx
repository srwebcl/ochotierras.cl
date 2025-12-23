"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
// import { usePathname } from "next/navigation" 
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Menu, ShoppingBag, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useTranslations, useLocale } from "next-intl"
import { Link as IntlLink, usePathname, useRouter } from "@/i18n/routing"

const navItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/nosotros" },
    { key: "wines", href: "/nuestros-vinos" },
    { key: "winery", href: "/bodega-y-vinedos" },
    { key: "tourism", href: "/turismo" },
    { key: "shop", href: "/tienda" },
    { key: "contact", href: "/contacto" },
]

export function Navbar() {
    const t = useTranslations('Navbar')
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const { scrollY } = useScroll()
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()
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

    // Check if Home (matches root or locale root)
    const isHome = pathname === "/" || pathname === "/es" || pathname === "/en"

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
                    <IntlLink href="/" className="relative h-12 w-48 hover:opacity-90 transition-opacity">
                        <Image
                            src="/images/logos/logo-white.webp"
                            alt="Ochotierras"
                            fill
                            className="object-contain object-left"
                            priority
                            sizes="(max-width: 768px) 120px, 160px"
                        />
                    </IntlLink>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <IntlLink
                                key={item.key}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-gold",
                                    pathname === item.href ? "text-brand-gold" : "text-white/90"
                                )}
                            >
                                {t(item.key)}
                            </IntlLink>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 mr-2 border-r border-white/20 pr-4">
                            <button
                                onClick={() => router.replace(pathname, { locale: 'es' })}
                                className={cn(
                                    "text-xs font-bold transition-colors hover:text-brand-gold",
                                    locale === 'es' ? "text-brand-gold" : "text-white/60"
                                )}
                            >
                                ES
                            </button>
                            <span className="text-white/30 text-xs">|</span>
                            <button
                                onClick={() => router.replace(pathname, { locale: 'en' })}
                                className={cn(
                                    "text-xs font-bold transition-colors hover:text-brand-gold",
                                    locale === 'en' ? "text-brand-gold" : "text-white/60"
                                )}
                            >
                                EN
                            </button>
                        </div>

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
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-brand-dark/98 backdrop-blur-xl flex flex-col justify-center items-center h-[100dvh]"
                    >
                        {/* Decorative Background */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            <Image
                                src="/images/logos/logo-white.webp"
                                alt="Background"
                                fill
                                className="object-contain scale-150 rotate-12 blur-sm opacity-10"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-brand-gold transition-colors z-50"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <nav className="relative z-10 flex flex-col items-center gap-8 md:gap-6 w-full px-6">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                >
                                    <IntlLink
                                        href={item.href}
                                        className={cn(
                                            "text-3xl font-serif font-bold text-white hover:text-brand-gold transition-all duration-300 relative group",
                                            pathname === item.href && "text-brand-gold"
                                        )}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t(item.key)}
                                        <span className={cn(
                                            "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100",
                                            pathname === item.href && "w-full opacity-100"
                                        )} />
                                    </IntlLink>
                                </motion.div>
                            ))}

                            {/* Mobile Language Switcher */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="mt-4 flex items-center gap-6"
                            >
                                <button
                                    onClick={() => {
                                        router.replace(pathname, { locale: 'es' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={cn(
                                        "text-xl font-bold transition-colors uppercase tracking-widest",
                                        locale === 'es' ? "text-brand-gold border-b-2 border-brand-gold" : "text-white/60"
                                    )}
                                >
                                    Español
                                </button>
                                <button
                                    onClick={() => {
                                        router.replace(pathname, { locale: 'en' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={cn(
                                        "text-xl font-bold transition-colors uppercase tracking-widest",
                                        locale === 'en' ? "text-brand-gold border-b-2 border-brand-gold" : "text-white/60"
                                    )}
                                >
                                    English
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="mt-8"
                            >
                                <Button
                                    className="bg-brand-gold text-brand-dark hover:bg-white px-8 py-6 text-lg rounded-full shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        toggleCart()
                                    }}
                                >
                                    <ShoppingBag className="mr-3 h-5 w-5" />
                                    {t('cart')} ({cartCount})
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
