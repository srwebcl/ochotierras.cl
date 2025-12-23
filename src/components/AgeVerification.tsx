"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function AgeVerification() {
    const t = useTranslations('AgeVerification');
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const [verifying, setVerifying] = useState(true)

    useEffect(() => {
        // Check local storage on mount
        const verified = localStorage.getItem("ochotierras_age_verified")
        if (!verified) {
            setIsVisible(true)
        } else {
            setVerifying(false)
        }
    }, [])

    const handleYes = () => {
        localStorage.setItem("ochotierras_age_verified", "true")
        setIsLeaving(true)
        setTimeout(() => {
            setIsVisible(false)
            setVerifying(false)
        }, 800) // Wait for exit animation
    }

    const handleNo = () => {
        window.location.href = "https://google.com"
    }

    if (!isVisible && !verifying) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
                >
                    {/* Background Texture/Image (Optional) */}
                    <div className="absolute inset-0 bg-[url('/images/general/hero-nosotros.jpeg')] bg-cover bg-center opacity-20 pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="relative max-w-lg w-[90%] bg-black/80 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl text-center backdrop-blur-xl"
                    >
                        <div className="mb-8">
                            <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-medium">{t('welcome')}</span>
                            <h2 className="font-serif text-3xl md:text-5xl text-white mt-2 mb-2">{t('title')}</h2>
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-6" />
                        </div>

                        <p className="text-gray-300 text-lg md:text-xl font-light mb-8 leading-relaxed">
                            {t('description')}
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-white text-sm uppercase tracking-widest mb-6 font-semibold">{t('question')}</h3>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleYes}
                                    className="min-w-[140px] h-12 bg-brand-gold text-brand-dark hover:bg-white font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105"
                                >
                                    {t('yes_button')}
                                </Button>
                                <Button
                                    onClick={handleNo}
                                    variant="outline"
                                    className="min-w-[140px] h-12 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105"
                                >
                                    {t('no_button')}
                                </Button>
                            </div>
                        </div>

                        <p className="mt-8 text-xs text-white/30">
                            {t('footer')}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
