"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState, FormEvent } from "react"

import { CinematicHero } from "@/components/CinematicHero"

export default function Contacto() {
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
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            {/* Cinematic Hero */}
            <CinematicHero
                title={t('title')}
                subtitle={t('subtitle')}
                backgroundImage="/images/general/hero-nosotros.jpeg"
            />

            <Section className="bg-gradient-to-b from-white to-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Contact Info Column (5 cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-6 relative inline-block">
                                {t('info.title')}
                                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-gold"></span>
                            </h2>
                            <p className="text-gray-600 mb-8 max-w-md">
                                Encuentra el canal perfecto para comunicarte con nosotros. Estamos atentos a tus requerimientos.
                            </p>

                            <div className="space-y-6">

                                {/* Card 1: Atención y Ubicación */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Horario & Ubicación
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold text-gray-900">{t('info.schedule_title')}</p>
                                            <p className="text-gray-600 text-sm">{t('info.schedule_val')}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-50">
                                            <p className="font-bold text-gray-900">{t('info.location_title')}</p>
                                            <div className="flex items-start gap-2 mt-1">
                                                <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                                                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{t('info.location_val')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: Contacto General */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Canales de Atención
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Teléfono / WhatsApp */}
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-brand-dark/5 text-brand-dark flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">{t('info.phone_title')}</p>
                                                <a href="https://wa.me/56944538170" className="block text-brand-dark font-bold hover:text-brand-gold transition-colors">
                                                    {t('info.phone_val_1')}
                                                </a>
                                            </div>
                                        </div>

                                        {/* WhatsApp Only */}
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-brand-dark/5 text-brand-dark flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                                <div className="relative">
                                                    <Phone className="w-5 h-5" />
                                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">{t('info.whatsapp_label')}</p>
                                                <a href="https://wa.me/56532626211" className="block text-brand-dark font-bold hover:text-brand-gold transition-colors">
                                                    {t('info.phone_val_2')}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-brand-dark/5 text-brand-dark flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase">{t('info.email_title')}</p>
                                                <a href="mailto:contacto@ochotierras.cl" className="text-brand-dark font-bold hover:text-brand-gold transition-colors">
                                                    contacto@ochotierras.cl
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Ventas Especializadas */}
                                <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-6 relative z-10 border-b border-brand-gold/20 pb-2">
                                        Ventas
                                    </h3>

                                    <div className="space-y-6 relative z-10">
                                        {/* Nacional / Export */}
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">{t('info.sales_title')}</p>
                                            <p className="text-lg font-bold">+56 9 9542 2781</p>
                                            <a href="mailto:contacto@ochotierras.cl" className="text-brand-gold text-sm hover:underline">contacto@ochotierras.cl</a>
                                        </div>

                                        {/* China */}
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">{t('info.china_title')}</p>
                                            <p className="text-lg font-bold">+56 9 6655 2222</p>
                                            <a href="mailto:yinguowen1979@gmail.com" className="text-brand-gold text-sm hover:underline">yinguowen1979@gmail.com</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Form Column (7 cols) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-2">{t('form.title')}</h2>
                            <p className="text-gray-500 mb-8">Déjanos tus datos y te contactaremos a la brevedad.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('form.name')}</label>
                                        <input
                                            name="name"
                                            required
                                            type="text"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            placeholder={t('form.placeholder_name')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('form.phone')}</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            placeholder={t('form.placeholder_phone')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('form.email')}</label>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                        placeholder={t('form.placeholder_email')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('form.message')}</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none"
                                        placeholder={t('form.placeholder_message')}
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-dark text-white hover:bg-brand-red py-7 text-lg uppercase tracking-widest font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Enviando...' : (
                                            <span className="flex items-center gap-2">
                                                {t('form.submit')} <Send className="w-5 h-5" />
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                {status === 'success' && (
                                    <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                                        ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo.
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                                        Hubo un error al enviar el mensaje. Por favor intenta nuevamente.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
