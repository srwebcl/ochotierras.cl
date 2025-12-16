"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NuestrosVinos() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 bg-[url('/images/general/vineyard-hero.webp')] bg-cover bg-center opacity-30 fixed-parallax" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/40" />

                <div className="container relative z-10 px-4 text-center">
                    <span className="block text-brand-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-bold animate-fade-in-up">
                        Nuestra Colección
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight animate-fade-in-up delay-100">
                        Vinos de <span className="italic text-brand-red">Carácter</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-300 font-light leading-relaxed animate-fade-in-up delay-200">
                        La expresión pura del Valle del Limarí en cada botella.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <Section className="bg-white text-brand-dark text-center">
                <div className="max-w-4xl mx-auto">
                    <p className="text-2xl font-serif text-brand-dark mb-8 leading-relaxed">
                        &quot;La cosecha y selección de las uvas se realiza manualmente, asegurando que solo lo mejor de nuestro viñedo llegue a su copa.&quot;
                    </p>
                    <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
                </div>
            </Section>

            {/* Chardonnay Showcase */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[600px] flex items-center justify-center group">
                            <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <Image
                                src="/images/bottles/chardonnay-reserva.webp"
                                alt="Chardonnay Reserva"
                                width={250}
                                height={800}
                                className="drop-shadow-2xl transform group-hover:-translate-y-4 transition-transform duration-500 relative z-10"
                            />
                        </div>
                        <div>
                            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-2 block">Blancos</span>
                            <h2 className="text-5xl font-serif font-bold text-brand-dark mb-6">Chardonnay Reserva</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Un vino que refleja la frescura del Limarí. De suave color dorado, sus aromas recuerdan a frutas tropicales maduras como piña y mango, integrados con sutiles notas minerales y un toque de vainilla francesa.
                            </p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <span className="w-2 h-2 bg-brand-gold rounded-full" />
                                    <span>100% Chardonnay</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <span className="w-2 h-2 bg-brand-gold rounded-full" />
                                    <span>Crianza en barricas francesas</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <span className="w-2 h-2 bg-brand-gold rounded-full" />
                                    <span>Ideal para mariscos y pescados grasos</span>
                                </li>
                            </ul>
                            <Button className="bg-brand-dark text-white hover:bg-brand-red px-8 py-6 uppercase tracking-widest text-xs font-bold transition-colors">
                                <Link href="/tienda">Comprar Ahora</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reserva Especial */}
            <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/5 skew-x-12 transform origin-top-right" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">Tintos</span>
                            <h2 className="text-5xl font-serif font-bold text-white mb-6">Reserva Especial</h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Nuestra línea única que representa la esencia del Valle del Limarí. Vinos con cuerpo, estructura y una elegancia que perdura.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                                <div className="p-4 border border-white/10 bg-white/5 text-center rounded hover:bg-white/10 transition-colors cursor-default">
                                    <h3 className="font-serif font-bold text-xl mb-1 text-white">Cabernet</h3>
                                    <span className="text-xs uppercase text-brand-gold">Sauvignon</span>
                                </div>
                                <div className="p-4 border border-white/10 bg-white/5 text-center rounded hover:bg-white/10 transition-colors cursor-default">
                                    <h3 className="font-serif font-bold text-xl mb-1 text-white">Syrah</h3>
                                    <span className="text-xs uppercase text-brand-gold">Limarí</span>
                                </div>
                                <div className="p-4 border border-white/10 bg-white/5 text-center rounded hover:bg-white/10 transition-colors cursor-default">
                                    <h3 className="font-serif font-bold text-xl mb-1 text-white">Blend</h3>
                                    <span className="text-xs uppercase text-brand-gold">Ensamblaje</span>
                                </div>
                            </div>

                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark px-8 py-6 uppercase tracking-widest text-xs font-bold transition-colors">
                                <Link href="/tienda">Ver Colección</Link>
                            </Button>
                        </div>

                        <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center group">
                            <div className="relative w-[300px] h-[600px]">
                                <div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full" />
                                <Image
                                    src="https://placehold.co/300x900/500000/FFFFFF.png?text=Vinos+Tintos"
                                    alt="Vinos Tintos"
                                    fill
                                    className="object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* High End Lines */}
            <Section className="bg-white text-brand-dark">
                <div className="text-center mb-20">
                    <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Alta Gama</span>
                    <h2 className="text-5xl font-serif font-bold text-brand-dark mb-6">Iconos de la Bodega</h2>
                    <p className="max-w-2xl mx-auto text-gray-600">Producciones limitadas, numeradas y creadas con la paciencia que requiere la excelencia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Reserva Privada Card */}
                    <div className="group relative overflow-hidden rounded-lg bg-gray-50 border border-gray-100 p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Image src="/images/logos/logo-gold.png" alt="Logo" width={100} height={100} />
                        </div>

                        <h3 className="text-4xl font-serif font-bold text-brand-dark mb-4">Reserva Privada</h3>
                        <div className="w-12 h-1 bg-brand-dark mb-6 group-hover:w-24 transition-all duration-500" />
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Variedades Carmenere y Syrah con una crianza de 10 a 12 meses en barricas de roble francés. Un equilibrio perfecto entre fruta y madera.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-2 mb-8 uppercase tracking-wider font-bold">
                            <li>• Syrah</li>
                            <li>• Carmenere</li>
                        </ul>
                        <Button variant="link" className="text-brand-red p-0 hover:text-brand-dark font-bold uppercase tracking-widest" asChild>
                            <Link href="/tienda">Comprar Reserva Privada →</Link>
                        </Button>
                    </div>

                    {/* Gran Reserva Card */}
                    <div className="group relative overflow-hidden rounded-lg bg-brand-dark text-white p-8 md:p-12 hover:shadow-2xl transition-all duration-300 ring-1 ring-white/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-brand-red" />

                        <h3 className="text-4xl font-serif font-bold text-brand-gold mb-4">Gran Reserva</h3>
                        <div className="w-12 h-1 bg-white mb-6 group-hover:w-24 transition-all duration-500" />
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Nuestros mejores vinos. Producción anual de solo 17.000 botellas. Guarda de 14 a 18 meses. Etiquetado y lacrado a mano. Una obra de arte en cada botella.
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 mb-8 uppercase tracking-wider font-bold">
                            <li>• Ensamblaje 24 Barricas</li>
                            <li>• Syrah 10 Barricas</li>
                        </ul>
                        <Button variant="link" className="text-brand-gold p-0 hover:text-white font-bold uppercase tracking-widest" asChild>
                            <Link href="/tienda">Comprar Gran Reserva →</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    )
}
