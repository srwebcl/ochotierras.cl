export async function getHeroSection() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/hero`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error('Hero API returned error status:', res.status);
            return null;
        }

        const text = await res.text();
        if (!text) {
            return null;
        }

        try {
            const data = JSON.parse(text);
            // Ensure we always return an array, even if the API returns a single object (though it shouldn't now)
            return Array.isArray(data) ? data : (data ? [data] : []);
        } catch (e) {
            console.error('Failed to parse Hero API JSON:', e);
            return [];
        }

    } catch (error) {
        console.error('Failed to fetch hero section:', error);
        return null;
    }
}
