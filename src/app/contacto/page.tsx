"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contacto() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/general/vineyard-hero.webp" alt="Contacto" fill className="object-cover opacity-40" />
                    <div className="absolute inset-0 bg-brand-dark/50" />
                </div>
                <div className="container relative z-10 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Contacto</h1>
                    <p className="text-xl text-gray-200 font-light">Estamos aquí para responder tus consultas.</p>
                </div>
            </section>

            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    {/* Contacto Details */}
                    <div>
                        <h2 className="text-4xl font-serif font-bold text-brand-dark mb-8">Información</h2>
                        <div className="space-y-8">

                            {/* Ubicación */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-1">Ubicación</h3>
                                    <p className="text-gray-600">Ruta D 505, km 11 desde Ovalle.<br />Valle del Limarí, Chile.</p>
                                </div>
                            </div>

                            {/* Teléfonos Principal */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-1">Contacto General</h3>
                                    <p className="text-gray-600">+56 94453 8170 (WhatsApp)</p>
                                    <p className="text-gray-500 text-sm">+56 53 2 626211 (Solo WhatsApp)</p>
                                </div>
                            </div>

                            {/* Ventas Nacional & Exportación */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-1">Ventas Nacional / Exportación</h3>
                                    <p className="text-gray-600 font-bold">+56 9 9542 2781</p>
                                    <a href="mailto:contacto@ochotierras.cl" className="text-brand-gold hover:underline">contacto@ochotierras.cl</a>
                                </div>
                            </div>

                            {/* Ventas China */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-1">Ventas Colonia China</h3>
                                    <p className="text-gray-600 font-bold">+56 9 6655 2222</p>
                                    <a href="mailto:yinguowen1979@gmail.com" className="text-brand-gold hover:underline">yinguowen1979@gmail.com</a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-1">Email General</h3>
                                    <a href="mailto:info@ochotierras.cl" className="text-gray-600 hover:text-brand-gold transition-colors">info@ochotierras.cl</a>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-gray-50 p-10 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">Envíanos un mensaje</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Nombre</label>
                                    <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder="Tu nombre" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Teléfono</label>
                                    <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder="+56 9..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder="tu@email.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Mensaje</label>
                                <textarea rows={5} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder="¿En qué podemos ayudarte?" />
                            </div>

                            <Button className="w-full bg-brand-dark text-white hover:bg-brand-red py-6 text-lg uppercase tracking-widest font-bold">
                                Enviar Mensaje
                            </Button>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    )
}
