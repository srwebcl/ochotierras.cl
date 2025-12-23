"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link as IntlLink } from "@/i18n/routing"

export function Footer() {
    const t = useTranslations('Footer')
    const navT = useTranslations('Navbar') // Reuse navbar keys for links if needed or generic

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6">

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-10 mb-16">

                    {/* Branding Section (Moved from top) */}
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

                    {/* Contacto */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">{t('contact')}</h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                <span>Ruta D 505, km 11 desde Ovalle<br />Valle del Limarí, Chile</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <div className="flex flex-col">
                                    <a href="https://wa.me/56944538170" className="hover:text-white transition-colors flex items-center gap-2">
                                        +56 94453 8170 <span className="text-xs text-brand-gold bg-brand-gold/10 px-1 rounded">WhatsApp</span>
                                    </a>
                                    <a href="https://wa.me/56532626211" className="hover:text-white transition-colors text-sm text-gray-500">
                                        +56 53 2 626211 (Solo WhatsApp)
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <a href="mailto:info@ochotierras.cl" className="hover:text-white transition-colors">info@ochotierras.cl</a>
                            </li>
                        </ul>
                    </div>

                    {/* Navegación */}
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

                    {/* Ventas */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">{t('sales')}</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="border-b border-white/5 pb-4 mb-4">
                                <span className="block text-white text-sm mb-1 font-bold">{t('national_sales')}</span>
                                <a href="https://wa.me/56995422781" className="block hover:text-brand-gold transition-colors text-sm mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" /> +56 9 9542 2781
                                </a>
                                <a href="mailto:contacto@ochotierras.cl" className="hover:text-brand-gold transition-colors text-sm">contacto@ochotierras.cl</a>
                            </li>
                            <li>
                                <span className="block text-white text-sm mb-1 font-bold">{t('china_sales')}</span>
                                <a href="tel:+56966552222" className="block hover:text-brand-gold transition-colors text-sm mb-1">
                                    +56 9 6655 2222
                                </a>
                                <a href="mailto:yinguowen1979@gmail.com" className="hover:text-brand-gold transition-colors text-sm">yinguowen1979@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Credits */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
                    <p>© {new Date().getFullYear()} Viña OchoTierras. {t('rights_reserved')}</p>

                    <div className="flex items-center gap-6">
                        <IntlLink href="/privacidad" className="hover:text-gray-400">{t('privacy')}</IntlLink>
                        <IntlLink href="/terminos" className="hover:text-gray-400">{t('terms')}</IntlLink>

                        {/* Developer Credit */}
                        <a href="https://srweb.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors ml-4 pl-4 border-l border-gray-800">
                            <span>{t('developed_by')}</span>
                            <span className="font-bold text-gray-300">SRweb</span>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

