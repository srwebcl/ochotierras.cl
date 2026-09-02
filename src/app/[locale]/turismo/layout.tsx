import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const title = isEnglish ? 'Wine Tourism | Ocho Tierras' : 'Turismo Enológico | Ocho Tierras';
    const description = isEnglish
        ? 'Visit Viña Ochotierras in the Limarí Valley: guided tours and wine tastings through our vineyards and underground winery.'
        : 'Visita Viña Ochotierras en el Valle del Limarí: recorridos guiados y degustaciones de vino por nuestros viñedos y bodega subterránea.';

    return {
        title,
        description,
        alternates: buildAlternates('/turismo', locale),
        openGraph: { title, description },
    };
}

// Contenido real de los tours, en los dos idiomas — se mantiene a mano acá
// (igual que el resto de este layout) porque son datos fijos de la página,
// no algo que venga de la API. Si el texto visible de /turismo cambia,
// hay que actualizar esto también para que no quede desalineado.
const trips = {
    es: [
        {
            name: "Visita Express",
            description: "Recorrido guiado por la bodega y explicación de nuestros procesos de vinificación. Sin reserva previa.",
            duration: "PT15M",
            price: "0",
        },
        {
            name: "Visita Premium",
            description: "Recorrido guiado completo por la bodega y los viñedos, relato histórico de Viña Ochotierras, degustación de 2 vinos seleccionados y tabla de productos locales. Mínimo 4 personas, con 24 horas de anticipación.",
            duration: "PT2H",
            price: "20000",
        },
    ],
    en: [
        {
            name: "Tour & Tasting",
            description: "Guided walk through our vineyards and gravitational winery, finishing with a tasting of 3 wines (Reserve and Grand Reserve Line) and a cheese and nuts board. Minimum 2 people, 24 hours in advance.",
            duration: "PT1H30M",
            price: null, // "Price per person" sin monto fijo publicado en la versión en inglés
        },
    ],
};

export default async function TurismoLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isEnglish = locale === 'en';
    const localizedTrips = isEnglish ? trips.en : trips.es;

    return (
        <>
            {/* Renderizado en el servidor a propósito, mismo motivo que en las
                fichas de producto: si viviera solo en el cliente no estaría
                en el HTML inicial que lee Google. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        localizedTrips.map((trip) => ({
                            "@context": "https://schema.org",
                            "@type": "TouristTrip",
                            "name": trip.name,
                            "description": trip.description,
                            "touristType": isEnglish ? "Wine tourism" : "Enoturismo",
                            "provider": {
                                "@type": "Winery",
                                "name": "Viña Ochotierras",
                                "url": "https://www.ochotierras.cl"
                            },
                            "itinerary": {
                                "@type": "ItemList",
                                "itemListElement": {
                                    "@type": "TouristAttraction",
                                    "name": "Viña Ochotierras",
                                    "address": "Ruta D 505, km 11 desde Ovalle, Valle del Limarí, Chile"
                                }
                            },
                            ...(trip.duration ? { "duration": trip.duration } : {}),
                            ...(trip.price !== null ? {
                                "offers": {
                                    "@type": "Offer",
                                    "price": trip.price,
                                    "priceCurrency": "CLP",
                                    "availability": "https://schema.org/InStock"
                                }
                            } : {})
                        }))
                    )
                }}
            />
            {children}
        </>
    );
}
