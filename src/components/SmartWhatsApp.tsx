"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, ShoppingBag, MapPin, MessageSquare, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function SmartWhatsApp() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Context Logic for "General Help" fallback
    const getContextMessage = () => {
        switch (pathname) {
            case "/": return "Hola, estoy viendo la portada y necesito asesoría."
            case "/tienda": return "Hola, tengo dudas sobre la tienda online."
            case "/nuestros-vinos": return "Hola, quisiera cotizar vinos precios especiales."
            case "/bodega-y-vinedos": return "Hola, quisiera saber más sobre la bodega."
            default: return "Hola, tengo una consulta general."
        }
    }

    // Scroll Visibility
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Notification Badge Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen && !hasInteracted) {
                // Could trigger a pulse or sound here if desired
            }
        }, 5000)
        return () => clearTimeout(timer)
    }, [isOpen, hasInteracted])

    const whatsappNumber = "56944538170"

    const openWhatsApp = (msg: string) => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
        window.open(url, '_blank')
        setIsOpen(false)
        setHasInteracted(true)
    }

    // Menu Options
    const menuOptions = [
        {
            id: 'buy',
            label: 'Comprar Vinos',
            sub: 'Asesoría y ventas',
            icon: ShoppingBag,
            message: "Hola, me interesa comprar vinos. ¿Me pueden asesorar?"
        },
        {
            id: 'tour',
            label: 'Visitar la Viña',
            sub: 'Turismo y reservas',
            icon: MapPin,
            message: "Hola, quisiera agendar una visita o tour en la viña."
        },
        {
            id: 'help',
            label: 'Ayuda General',
            sub: 'Consultas varias',
            icon: MessageSquare,
            message: getContextMessage()
        }
    ]

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none font-sans">

                    {/* Concierge Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="pointer-events-auto bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-[280px] origin-bottom-right"
                            >
                                {/* Header */}
                                <div className="bg-brand-dark p-4 border-b border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                    <h3 className="text-white font-serif font-bold text-lg relative z-10">Concierge</h3>
                                    <p className="text-white/60 text-xs relative z-10">¿En qué podemos ayudarte hoy?</p>
                                </div>

                                {/* Options */}
                                <div className="p-2 flex flex-col gap-1">
                                    {menuOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => openWhatsApp(opt.message)}
                                            className="group flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 text-left relative overflow-hidden"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300 shrink-0">
                                                <opt.icon size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors truncate">
                                                    {opt.label}
                                                </div>
                                                <div className="text-[10px] text-gray-400 truncate">
                                                    {opt.sub}
                                                </div>
                                            </div>
                                            <ChevronRight size={14} className="text-white/20 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="relative pointer-events-auto">
                        {/* Notification Badge */}
                        {!isOpen && !hasInteracted && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 z-20 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-neutral-900"
                            >
                                <span className="text-[10px] font-bold text-white">1</span>
                            </motion.div>
                        )}

                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 border border-white/10 relative overflow-hidden",
                                isOpen ? "bg-neutral-800 rotate-90" : "bg-neutral-900 hover:bg-black"
                            )}
                        >
                            {/* Glow Effect */}
                            <span className="absolute inset-0 bg-brand-gold/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                            {isOpen ? (
                                <X className="w-6 h-6 text-white/70" />
                            ) : (
                                <MessageCircle className="w-7 h-7 text-brand-gold" strokeWidth={1.5} />
                            )}
                        </motion.button>

                        {/* Status Indicator */}
                        {!isOpen && (
                            <span className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 border-2 border-neutral-900 rounded-full z-10" />
                        )}
                    </div>

                </div>
            )}
        </AnimatePresence>
    )
}
