import TiendaClient from "./TiendaClient"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'

async function safeFetchJson(url: string, tags: string[]): Promise<any[]> {
    try {
        const res = await fetch(url, { next: { revalidate: 3600, tags } })
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (e) {
        console.error('Failed to fetch for /tienda:', url, e)
        return []
    }
}

export default async function Tienda({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params

    // Todo lo que la página necesita se trae acá, en el servidor, en paralelo
    // — antes cada sección (banners, packs, productos) lo pedía por separado
    // en el navegador, y la página se veía vacía mientras tanto.
    const [products, packs, banners] = await Promise.all([
        safeFetchJson(`${API_URL}/api/products`, ['products']),
        safeFetchJson(`${API_URL}/api/packs`, ['products']),
        safeFetchJson(`${API_URL}/api/store-banners`, ['store-banners']),
    ])

    return (
        <TiendaClient
            locale={locale}
            products={products}
            packs={packs}
            banners={banners}
        />
    )
}
