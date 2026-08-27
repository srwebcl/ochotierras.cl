export interface SalesContact {
    title: string | null;
    titleEn: string | null;
    phone: string | null;
    email: string | null;
}

export interface SiteSettings {
    schedule: string | null;
    scheduleEn: string | null;
    location: string | null;
    locationEn: string | null;
    phoneWhatsapp: string | null;
    whatsappOnly: string | null;
    email: string | null;
    salesContacts: SalesContact[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/site-settings`, {
            next: { revalidate: 3600, tags: ['site-settings'] },
        });

        if (!res.ok) {
            console.error('Site Settings API returned error status:', res.status);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error('Failed to fetch site settings:', error);
        return null;
    }
}
