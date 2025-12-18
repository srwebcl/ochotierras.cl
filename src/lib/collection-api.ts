export interface Wine {
    id: number;
    name: string;
    subtitle?: string;
    type?: string;
    price: number;
    image?: string;
    bgGradient?: string;
    accentColor?: string;
    accentColorHex?: string;
    description?: string;
    stock?: number;
}

export async function getCollectionWines(): Promise<Wine[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/collection-wines`, {
            next: { revalidate: 60 } // Revalidate every minute
        });

        if (!res.ok) {
            return [];
        }

        const data = await res.json();
        return data as Wine[];
    } catch (error) {
        console.error('Failed to fetch collection wines:', error);
        return [];
    }
}
