"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link as IntlLink } from "@/i18n/routing"

export function Footer() {
    const t = useTranslations('Footer')
    const navT = useTranslations('Navbar')
    const tContact = useTranslations('Contacto.info') // Reuse navbar keys for links if needed or generic

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6">

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-10 mb-16">

                    {/* Branding Section */}
                    <div>
                        <IntlLink href="/" className="block mb-6 relative w-32 h-12">
                            <Image
                                src="/images/logos/logo-white.webp"
                                alt="OchoTierras Logo"
                                fill
                                className="object-contain object-left"
                                sizes="200px"
                            />
                        </IntlLink>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {t('quote')}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-black transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-black transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Horario & Ubicación */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">Horario y Ubicación</h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            {/* Horario */}
                            <li>
                                <p className="text-white font-bold text-sm mb-1">{tContact('schedule_title')}</p>
                                <p className="text-gray-400 text-sm">{tContact('schedule_val')}</p>
                            </li>
                            {/* Ubicación */}
                            <li className="flex items-start gap-2">
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">{tContact('location_title')}</p>
                                    <div className="flex gap-2 text-gray-400 text-sm">
                                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span className="whitespace-pre-line">{tContact('location_val')}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Canales de Atención */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">Canales de Atención</h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            {/* Teléfono / WhatsApp */}
                            <li>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{tContact('phone_title')}</p>
                                <a href="https://wa.me/56944538170" className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <Phone className="w-4 h-4" /> {tContact('phone_val_1')}
                                </a>
                            </li>
                            {/* WhatsApp Only */}
                            <li>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{tContact('whatsapp_label')}</p>
                                <a href="https://wa.me/56532626211" className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <div className="relative">
                                        <Phone className="w-4 h-4" />
                                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    {tContact('phone_val_2')}
                                </a>
                            </li>
                            {/* Email */}
                            <li>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{tContact('email_title')}</p>
                                <a href="mailto:contacto@ochotierras.cl" className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <Mail className="w-4 h-4" /> contacto@ochotierras.cl
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Ventas */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">{t('sales')}</h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            {/* Nacional */}
                            <li>
                                <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{tContact('sales_title')}</span>
                                <a href="https://wa.me/56995422781" className="block text-white font-bold hover:text-brand-gold transition-colors text-sm mb-1 flex items-center gap-2">
                                    +56 9 9542 2781
                                </a>
                                <a href="mailto:contacto@ochotierras.cl" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">contacto@ochotierras.cl</a>
                            </li>
                            {/* China */}
                            <li>
                                <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{tContact('china_title')}</span>
                                <a href="tel:+56966552222" className="block text-white font-bold hover:text-brand-gold transition-colors text-sm mb-1">
                                    +56 9 6655 2222
                                </a>
                                <a href="mailto:yinguowen1979@gmail.com" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">yinguowen1979@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 5: Navegación */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">{t('explore')}</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><IntlLink href="/nosotros" className="hover:text-white transition-colors flex items-center gap-2 group">{navT('about')} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></IntlLink></li>
                            <li><IntlLink href="/nuestros-vinos" className="hover:text-white transition-colors flex items-center gap-2 group">{navT('wines')} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></IntlLink></li>
                            <li><IntlLink href="/bodega-y-vinedos" className="hover:text-white transition-colors flex items-center gap-2 group">{navT('winery')} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></IntlLink></li>
                            <li><IntlLink href="/turismo" className="hover:text-white transition-colors flex items-center gap-2 group">{navT('tourism')} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></IntlLink></li>
                            <li><IntlLink href="/tienda" className="hover:text-white transition-colors flex items-center gap-2 group">{navT('shop')} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></IntlLink></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Credits */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-6">
                        <IntlLink href="/privacidad" className="hover:text-gray-400">{t('privacy')}</IntlLink>
                        <IntlLink href="/terminos" className="hover:text-gray-400">{t('terms')}</IntlLink>

                        {/* Developer Credit */}
                        <a href="https://srweb.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors ml-4 pl-4 border-l border-gray-800">
                            <span>{t('developed_by')}</span>
                            <span className="font-bold text-gray-300">SRweb</span>
                        </a>
                    </div>

                    <p>© {new Date().getFullYear()} Viña OchoTierras. {t('rights_reserved')}</p>
                </div>

            </div>
        </footer>
    )
}

