"use client"

import { useState, FormEvent, useEffect } from "react"
import { Send, User, Phone, Mail, Loader2, X, Calendar, Users, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface TourismReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TourismReservationModal({ isOpen, onClose }: TourismReservationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset state when closing
            setTimeout(() => setStatus('idle'), 300);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const tourType = formData.get('tourType');
        const date = formData.get('date');
        const guests = formData.get('guests');
        const extraMessage = formData.get('message');

        const reservationMessage = `SOLICITUD DE RESERVA DE TOUR
        
Tipo de Tour: ${tourType}
Fecha solicitada: ${date}
Cantidad de personas: ${guests}

Mensaje Adicional:
${extraMessage || 'Sin mensaje adicional'}
`;

        const data = {
            name,
            phone,
            email,
            message: reservationMessage,
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
            
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputClasses = "w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all font-sans text-brand-dark group-hover:border-gray-300";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white shadow-2xl rounded-2xl z-[101] overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-brand-dark text-white p-6 relative flex-shrink-0">
                            <button 
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif font-bold mb-1">Reserva tu Experiencia</h2>
                            <p className="text-white/70 text-sm font-light">Completa el formulario y nos contactaremos para confirmar tu visita.</p>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Nombre Completo *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <input name="name" required type="text" className={inputClasses} placeholder="Tu nombre" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <input name="email" required type="email" className={inputClasses} placeholder="tu@email.com" />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Teléfono *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <input name="phone" required type="tel" className={inputClasses} placeholder="+56 9..." />
                                        </div>
                                    </div>

                                    {/* Tour Type */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Tipo de Experiencia *
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <select name="tourType" required className={`${inputClasses} appearance-none bg-transparent cursor-pointer`}>
                                                <option value="" disabled selected>Selecciona una opción...</option>
                                                <option value="Visita Express">Visita Express</option>
                                                <option value="Visita Premium">Visita Premium</option>
                                                <option value="Consulta General">Consulta General de Turismo</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Date */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Fecha Estimada *
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <input name="date" required type="date" className={inputClasses} />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="space-y-1.5 group">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                            Nº de Personas *
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                                            <input name="guests" required type="number" min="1" className={inputClasses} placeholder="Ej: 2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5 group">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                                        Comentarios Adicionales
                                    </label>
                                    <textarea name="message" rows={3} className={`${inputClasses} pl-4 resize-none`} placeholder="¿Alguna restricción alimentaria o consulta adicional?" />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <Button
                                        disabled={isSubmitting || status === 'success'}
                                        className="w-full relative h-12 bg-brand-gold text-white hover:bg-brand-gold/90 transition-all font-bold uppercase tracking-widest text-xs"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</span>
                                        ) : status === 'success' ? (
                                            "¡Solicitud Enviada!"
                                        ) : (
                                            <span className="flex items-center gap-2">Enviar Solicitud <Send className="w-3 h-3" /></span>
                                        )}
                                    </Button>
                                </div>
                                
                                {/* Status Messages */}
                                {status === 'success' && (
                                    <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium border border-green-100">
                                        Hemos recibido tu solicitud. Te contactaremos a la brevedad.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center font-medium border border-red-100">
                                        Ocurrió un error al enviar. Por favor, intenta de nuevo.
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
