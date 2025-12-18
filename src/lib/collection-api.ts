export async function getCollectionWines() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/collection-wines`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error('Collection API returned error status:', res.status);
            return [];
        }

        const text = await res.text();
        if (!text) return [];

        try {
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error('Failed to parse Collection API JSON:', e);
            return [];
        }

    } catch (error) {
        console.error('Failed to fetch collection wines:', error);
        return [];
    }
}
