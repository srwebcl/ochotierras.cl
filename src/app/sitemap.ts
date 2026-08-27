import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ochotierras.cl';

  // We fetch products to dynamically add them to sitemap
  let products = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/products`);
    if (res.ok) {
      products = await res.json();
    }
  } catch (e) {
    console.error('Failed to fetch products for sitemap', e);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/es/tienda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/en/tienda`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/es/nuestros-vinos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/nuestros-vinos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/es/contacto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/en/contacto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  products.forEach((product: any) => {
    sitemapEntries.push({
      url: `${baseUrl}/es/tienda/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    sitemapEntries.push({
      url: `${baseUrl}/en/tienda/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
