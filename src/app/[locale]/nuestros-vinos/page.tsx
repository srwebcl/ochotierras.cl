import NuestrosVinosClient from "./NuestrosVinosClient"

async function getCategories(): Promise<any[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/categories-wines`, {
            next: { revalidate: 3600, tags: ['products'] },
        })
        if (!res.ok) return []
        const data = await res.json()
        if (!Array.isArray(data)) return []

        // Misma regla que antes se aplicaba en el navegador: solo categorías
        // con vinos, sin packs ni estuches (esos tienen su propia sección).
        return data.filter((cat: any) =>
            cat.wines.length > 0 &&
            !cat.slug.toLowerCase().includes('pack') &&
            !cat.slug.toLowerCase().includes('estuche')
        )
    } catch (e) {
        console.error('Failed to fetch categories-wines:', e)
        return []
    }
}

export default async function NuestrosVinosPage() {
    const categories = await getCategories()

    return <NuestrosVinosClient categories={categories} />
}
