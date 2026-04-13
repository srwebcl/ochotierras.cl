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

    const inputClasses = "w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-white placeholder:text-gray-500 font-sans backdrop-blur-sm group-hover:border-white/20";

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

            {/* Status Messages */}
            <AnimatePresence mode="wait">
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-3 text-green-400 text-sm font-medium"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        ¡Mensaje enviado con éxito! Nos contactaremos pronto.
                    </motion.div>
                )}

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
