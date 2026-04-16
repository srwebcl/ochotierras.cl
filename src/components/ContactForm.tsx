"use client"

import { useState, FormEvent } from "react"
import { Send, User, Phone, Mail, MessageSquare, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function ContactForm() {
    const t = useTranslations('Contacto');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
            
            // Reset status after a few seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputClasses = "w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-white placeholder:text-gray-500 font-sans backdrop-blur-sm group-hover:border-white/20 [&:-webkit-autofill]:bg-gray-900 [&:-webkit-autofill]:[transition:background-color_9999s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

    // Estado de éxito: mostrar panel en lugar del formulario
    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center text-center py-16 space-y-6"
            >
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="text-5xl"
                        >
                            ✅
                        </motion.div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping opacity-30" />
                </div>

                <div className="space-y-3">
                    <h3 className="text-3xl font-serif font-bold text-white">¡Mensaje Enviado!</h3>
                    <p className="text-gray-400 font-light max-w-sm">
                        Hemos recibido tu mensaje. Te responderemos a la brevedad posible al correo que indicaste.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-brand-gold text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    Revisa tu bandeja de entrada — te enviamos una copia
                </div>

                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-xs text-gray-500 hover:text-brand-gold transition-colors uppercase tracking-widest"
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within:text-brand-gold uppercase tracking-[0.2em] ml-1 transition-colors">
                        {t('form.name')}
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                        <input
                            name="name"
                            required
                            type="text"
                            className={inputClasses}
                            placeholder={t('form.placeholder_name')}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-gray-400 group-focus-within:text-brand-gold uppercase tracking-[0.2em] ml-1 transition-colors">
                        {t('form.phone')}
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                        <input
                            name="phone"
                            type="tel"
                            className={inputClasses}
                            placeholder={t('form.placeholder_phone')}
                        />
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 group-focus-within:text-brand-gold uppercase tracking-[0.2em] ml-1 transition-colors">
                    {t('form.email')}
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                    <input
                        name="email"
                        required
                        type="email"
                        className={inputClasses}
                        placeholder={t('form.placeholder_email')}
                    />
                </div>
            </div>

            {/* Message */}
            <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-gray-400 group-focus-within:text-brand-gold uppercase tracking-[0.2em] ml-1 transition-colors">
                    {t('form.message')}
                </label>
                <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500 group-focus-within:text-brand-gold transition-colors" />
                    <textarea
                        name="message"
                        required
                        rows={4}
                        className={`${inputClasses} pl-12 resize-none`}
                        placeholder={t('form.placeholder_message')}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <Button
                    disabled={isSubmitting}
                    className="w-full relative h-14 md:h-16 bg-brand-gold overflow-hidden text-white hover:bg-brand-gold/90 transition-all duration-300 disabled:opacity-70 group/btn"
                >
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-shine" />
                    
                    <span className="relative flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-xs font-bold">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t('form.submit').split(' ')[0]}...
                            </>
                        ) : (
                            <>
                                {t('form.submit')}
                                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </span>
                </Button>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center gap-3 text-red-400 text-sm font-medium"
                    >
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        Hubo un error al enviar. Por favor, intenta de nuevo.
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes shine {
                    100% {
                        transform: skewX(-12deg) translateX(300%);
                    }
                }
                .animate-shine {
                    animation: shine 0.8s ease-in-out;
                }
            `}</style>
        </form>
    )
}
