import { Metadata } from "next"
import { getTranslations, getLocale } from "next-intl/server"
import { getSiteSettings, onlyDigits } from "@/lib/site-settings-api"
import { buildAlternates } from "@/lib/seo"
import ContactoClient from "./ContactoClient"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const isEnglish = locale === 'en'
    const title = isEnglish ? 'Contact Us | Ocho Tierras' : 'Contacto | Ocho Tierras'
    const description = isEnglish
        ? 'Get in touch with Viña Ochotierras: visits, wholesale and export sales, or general inquiries about our wines from Limarí Valley, Chile.'
        : 'Contáctanos: visitas a la viña, ventas nacionales y de exportación, o consultas generales sobre nuestros vinos del Valle del Limarí, Chile.'

    return {
        title,
        description,
        alternates: buildAlternates('/contacto', locale),
        openGraph: { title, description },
    }
}

export default async function Contacto() {
    const tContact = await getTranslations('Contacto.info')
    const locale = await getLocale()
    const settings = await getSiteSettings()

    const isEnglish = locale === 'en'

    // Si la API no responde, se cae a los valores que había hardcodeados antes
    // (los mismos que usa el footer, para que ambos coincidan siempre).
    const schedule = (isEnglish ? settings?.scheduleEn : settings?.schedule) || tContact('schedule_val')
    const location = (isEnglish ? settings?.locationEn : settings?.location) || tContact('location_val')
    const phoneWhatsappDigits = onlyDigits(settings?.phoneWhatsapp) || '56944538170'
    const whatsappOnlyDigits = onlyDigits(settings?.whatsappOnly) || '56532626211'
    const email = settings?.email || 'contacto@ochotierras.cl'

    const rawSalesContacts = settings?.salesContacts?.length
        ? settings.salesContacts
        : [
            { title: tContact('sales_title'), titleEn: tContact('sales_title'), phone: '56995422781', email: 'contacto@ochotierras.cl' },
            { title: tContact('china_title'), titleEn: tContact('china_title'), phone: '56966552222', email: 'yinguowen1979@gmail.com' },
        ]

    const salesContacts = rawSalesContacts.map((contact) => ({
        ...contact,
        displayTitle: ((isEnglish ? contact.titleEn : contact.title) || contact.title) ?? '',
        digits: onlyDigits(contact.phone),
    }))

    return (
        <ContactoClient
            schedule={schedule}
            location={location}
            phoneWhatsappDigits={phoneWhatsappDigits}
            whatsappOnlyDigits={whatsappOnlyDigits}
            email={email}
            salesContacts={salesContacts}
        />
    )
}
