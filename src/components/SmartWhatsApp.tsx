"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

export function SmartWhatsApp() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("Hola")
    const [showBubble, setShowBubble] = useState(false)

    // Context Logic: Customize message based on URL
    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 3000) // Delay bubble appearance

        switch (pathname) {
            case "/":
                setMessage("Bienvenido. ¿Conoces nuestra historia?")
                break
            case "/nuestros-vinos":
                setMessage("¿Buscas una recomendación?")
                break
            case "/bodega-y-vinedos":
                setMessage("Agenda tu visita privada.")
                break
            case "/tienda":
                setMessage("¿Ayuda con tu pedido?")
                break
            case "/contacto":
                setMessage("Hablemos.")
                break
            default:
                setMessage("¿En qué podemos ayudarte?")
        }

        return () => clearTimeout(timer)
    }, [pathname])

    const whatsappNumber = "56944538170" // Primary WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* Smart Bubble Tooltip */}
            <AnimatePresence>
                {showBubble && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white text-brand-dark px-3 py-2 rounded-lg shadow-xl max-w-[180px] relative pointer-events-auto cursor-pointer border border-brand-gold/20"
                        onClick={() => window.open(whatsappUrl, '_blank')}
                    >
                        <p className="text-xs font-serif italic leading-relaxed">
                            "{message}"
                        </p>
                        {/* Little triangle pointer */}
                        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45 border-r border-b border-brand-gold/20" />

                        {/* Close Bubble Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowBubble(false)
                            }}
                            className="absolute -top-1.5 -left-1.5 bg-gray-100 hover:bg-gray-200 rounded-full p-0.5 text-gray-500 shadow-sm"
                        >
                            <X size={10} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto relative group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-dark hover:bg-brand-gold text-white shadow-2xl transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setShowBubble(true)}
            >
                {/* Ping Animation Effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-20 animate-ping group-hover:opacity-40 duration-1000" />

                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
            </motion.a>

        </div>
    )
}
