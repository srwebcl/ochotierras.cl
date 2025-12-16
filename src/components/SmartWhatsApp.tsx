"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

export function SmartWhatsApp() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("Hola, ¿en qué podemos ayudarte?")
    const [showBubble, setShowBubble] = useState(false)

    // Context Logic: Customize message based on URL
    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 3000) // Delay bubble appearance

        switch (pathname) {
            case "/":
                setMessage("Bienvenido a OchoTierras. ¿Te gustaría conocer nuestra historia?")
                break
            case "/nuestros-vinos":
                setMessage("¿Buscas una recomendación de nuestros enólogos?")
                break
            case "/bodega-y-vinedos":
                setMessage("Agenda una visita privada a nuestra bodega gravitacional.")
                break
            case "/tienda":
                setMessage("¿Necesitas ayuda con tu pedido o envío?")
                break
            case "/contacto":
                setMessage("Hablemos directamente. Estamos aquí para ti.")
                break
            default:
                setMessage("Hola, ¿en qué podemos ayudarte hoy?")
        }

        return () => clearTimeout(timer)
    }, [pathname])

    const whatsappNumber = "56944538170" // Primary WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

            {/* Smart Bubble Tooltip */}
            <AnimatePresence>
                {showBubble && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white text-brand-dark px-4 py-3 rounded-lg shadow-xl max-w-[250px] relative pointer-events-auto cursor-pointer border border-brand-gold/20"
                        onClick={() => window.open(whatsappUrl, '_blank')}
                    >
                        <p className="text-sm font-serif italic leading-relaxed">
                            "{message}"
                        </p>
                        {/* Little triangle pointer */}
                        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-brand-gold/20" />

                        {/* Close Bubble Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowBubble(false)
                            }}
                            className="absolute -top-2 -left-2 bg-gray-100 hover:bg-gray-200 rounded-full p-0.5 text-gray-500"
                        >
                            <X size={12} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full bg-brand-dark hover:bg-brand-gold text-white shadow-2xl transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setShowBubble(true)}
            >
                {/* Ping Animation Effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-20 animate-ping group-hover:opacity-40 duration-1000" />

                <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
            </motion.a>

        </div>
    )
}
