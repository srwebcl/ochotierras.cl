"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"

export default function Turismo() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/general/hero-turismo.jpeg"
                        alt="Turismo Ochotierras"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 flex justify-start">
                    <div className="max-w-2xl text-left">
                        <span className="block text-brand-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 animate-fade-in-up">
                            Experiencias
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-none animate-fade-in-up delay-100">
                            Visita Viña <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">Ochotierras</span>
                        </h1>
                        <p className="text-xl text-gray-200 font-light mb-10 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                            Sumérgete en el Valle del Limarí. Recorre nuestros viñedos, conoce nuestro proceso gravitacional y degusta vinos inolvidables.
                        </p>
                        <Button className="bg-brand-red text-white hover:bg-white hover:text-brand-dark px-10 py-7 text-sm uppercase tracking-widest font-bold transition-all duration-300 transform hover:translate-x-2 animate-fade-in-up delay-300">
                            <Link href="/contacto">Reservar Visita</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Tour Detail */}
            <Section className="bg-white text-brand-dark overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left - Image Grid (Redesigned) */}
                    <div className="lg:w-1/2 relative h-[600px] w-full flex items-center justify-center">

                        {/* 1. Main Base Image (Viñedos) - Large and rotated slightly */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute left-0 top-0 w-3/4 h-[85%] z-10"
                        >
                            <div className="relative w-full h-full rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src="/images/general/turismo-1.jpeg"
                                    alt="Viñedos del Limarí"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                            </div>
                        </motion.div>

                        {/* 2. Secondary Overlapping Image (Cata) - Overlaid on bottom right */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute right-4 bottom-8 w-3/5 h-[60%] z-20"
                        >
                            <div className="relative w-full h-full rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white">
                                <Image
                                    src="/images/general/turismo.jpeg"
                                    alt="Cata de Vinos"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative Badge */}
                            <div className="absolute -top-6 -right-6 bg-brand-gold text-white font-serif w-24 h-24 rounded-full flex items-center justify-center text-center p-2 shadow-lg animate-spin-slow">
                                <span className="text-xs font-bold uppercase tracking-widest leading-none">Premium<br />Tasting</span>
                            </div>
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/5 blur-[100px] z-0 pointer-events-none" />

                    </div>

                    {/* Right - Info */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">Tour & Degustación</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Una experiencia completa diseñada para los amantes del vino. Comenzamos con un paseo por nuestros viñedos para entender el terroir del Limarí, seguido de un recorrido por nuestra bodega gravitacional donde conocerás los secretos de nuestra elaboración. Finalizamos con una degustación guiada de nuestros vinos Icono.
                        </p>

                        <div className="bg-gray-50 border border-gray-100 p-8 rounded-xl mb-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-brand-gold uppercase tracking-wider text-xs font-bold mb-2">Valor por persona</h4>
                                    <p className="text-3xl font-serif font-bold text-brand-dark">$18.000</p>
                                </div>
                                <div>
                                    <h4 className="text-brand-gold uppercase tracking-wider text-xs font-bold mb-2">Duración</h4>
                                    <p className="text-xl font-serif font-bold text-brand-dark">1 hora 30 min</p>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <h4 className="text-brand-gold uppercase tracking-wider text-xs font-bold mb-2">Incluye</h4>
                                    <ul className="text-gray-600 space-y-1 text-sm">
                                        <li className="flex items-center gap-2"><span className="text-brand-red">✓</span> Recorrido por viñedos y bodega</li>
                                        <li className="flex items-center gap-2"><span className="text-brand-red">✓</span> Degustación de 3 vinos (Línea Reserva y Gran Reserva)</li>
                                        <li className="flex items-center gap-2"><span className="text-brand-red">✓</span> Tabla de quesos y frutos secos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-400 italic">
                                * Mínimo 2 personas. Reservas con 24 horas de anticipación.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
