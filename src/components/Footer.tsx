import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import { getTranslations, getLocale } from "next-intl/server"
import { Link as IntlLink } from "@/i18n/routing"
import { getSiteSettings } from "@/lib/site-settings-api"

// Deja solo dígitos, para armar links de wa.me/tel de forma confiable
// aunque en el panel se haya escrito el número con espacios o el "+".
function onlyDigits(value: string | null | undefined): string {
    return (value ?? "").replace(/\D/g, "")
}

export async function Footer() {
    const t = await getTranslations('Footer')
    const navT = await getTranslations('Navbar')
    const tContact = await getTranslations('Contacto.info')
    const locale = await getLocale()
    const settings = await getSiteSettings()

    const isEnglish = locale === 'en'

    // Si la API no responde, se cae a los valores que había hardcodeados antes.
    const schedule = (isEnglish ? settings?.scheduleEn : settings?.schedule) || tContact('schedule_val')
    const location = (isEnglish ? settings?.locationEn : settings?.location) || tContact('location_val')
    const phoneWhatsapp = settings?.phoneWhatsapp || '56944538170'
    const whatsappOnly = settings?.whatsappOnly || '56532626211'
    const email = settings?.email || 'contacto@ochotierras.cl'
    const salesContacts = settings?.salesContacts?.length
        ? settings.salesContacts
        : [
            { title: tContact('sales_title'), titleEn: tContact('sales_title'), phone: '56995422781', email: 'contacto@ochotierras.cl' },
            { title: tContact('china_title'), titleEn: tContact('china_title'), phone: '56966552222', email: 'yinguowen1979@gmail.com' },
        ]

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
                                <p className="text-gray-400 text-sm whitespace-pre-line">{schedule}</p>
                            </li>
                            {/* Ubicación */}
                            <li className="flex items-start gap-2">
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">{tContact('location_title')}</p>
                                    <div className="flex gap-2 text-gray-400 text-sm">
                                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span className="whitespace-pre-line">{location}</span>
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
                                <a href={`https://wa.me/${onlyDigits(phoneWhatsapp)}`} className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <Phone className="w-4 h-4" /> +{onlyDigits(phoneWhatsapp)}
                                </a>
                            </li>
                            {/* WhatsApp Only */}
                            <li>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{tContact('whatsapp_label')}</p>
                                <a href={`https://wa.me/${onlyDigits(whatsappOnly)}`} className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <div className="relative">
                                        <Phone className="w-4 h-4" />
                                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    +{onlyDigits(whatsappOnly)}
                                </a>
                            </li>
                            {/* Email */}
                            <li>
                                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{tContact('email_title')}</p>
                                <a href={`mailto:${email}`} className="hover:text-brand-gold transition-colors flex items-center gap-2 text-white font-medium">
                                    <Mail className="w-4 h-4" /> {email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Ventas */}
                    <div>
                        <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-8">{t('sales')}</h4>
                        <ul className="space-y-6 text-gray-300 font-light">
                            {salesContacts.map((contact, index) => {
                                const title = (isEnglish ? contact.titleEn : contact.title) || contact.title
                                const digits = onlyDigits(contact.phone)

                                return (
                                    <li key={`${contact.email ?? contact.phone ?? title}-${index}`}>
                                        <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{title}</span>
                                        {digits && (
                                            <a href={`https://wa.me/${digits}`} className="block text-white font-bold hover:text-brand-gold transition-colors text-sm mb-1 flex items-center gap-2">
                                                +{digits}
                                            </a>
                                        )}
                                        {contact.email && (
                                            <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-brand-gold transition-colors text-sm">{contact.email}</a>
                                        )}
                                    </li>
                                )
                            })}
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

