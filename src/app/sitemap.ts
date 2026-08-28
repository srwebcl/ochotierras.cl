import { MetadataRoute } from 'next';

const baseUrl = 'https://www.ochotierras.cl';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl';
const locales = ['es', 'en'];

async function safeFetchJson(url: string): Promise<any[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch for sitemap:', url, e);
    return [];
  }
}

function forEachLocale(
  path: string,
  entries: MetadataRoute.Sitemap,
  options: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
) {
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: options.changeFrequency,
      priority: options.priority,
    });
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, packs, categories] = await Promise.all([
    safeFetchJson(`${apiUrl}/api/products`),
    safeFetchJson(`${apiUrl}/api/packs`),
    safeFetchJson(`${apiUrl}/api/categories`),
  ]);

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];

  // Páginas principales
  forEachLocale('/tienda', entries, { changeFrequency: 'daily', priority: 0.9 });
  forEachLocale('/nuestros-vinos', entries, { changeFrequency: 'weekly', priority: 0.8 });
  forEachLocale('/nosotros', entries, { changeFrequency: 'monthly', priority: 0.6 });
  forEachLocale('/bodega-y-vinedos', entries, { changeFrequency: 'monthly', priority: 0.6 });
  forEachLocale('/turismo', entries, { changeFrequency: 'monthly', priority: 0.6 });
  forEachLocale('/contacto', entries, { changeFrequency: 'yearly', priority: 0.5 });

  // Vinos individuales
  products.forEach((product: any) => {
    if (!product?.slug) return;
    forEachLocale(`/tienda/${product.slug}`, entries, { changeFrequency: 'weekly', priority: 0.7 });
  });

  // Packs (antes no se incluían en absoluto)
  packs.forEach((pack: any) => {
    if (!pack?.slug) return;
    forEachLocale(`/tienda/pack/${pack.slug}`, entries, { changeFrequency: 'weekly', priority: 0.7 });
  });

  // Categorías
  categories.forEach((category: any) => {
    if (!category?.slug) return;
    forEachLocale(`/tienda/categoria/${category.slug}`, entries, { changeFrequency: 'weekly', priority: 0.6 });
  });

  // Nota: /privacidad y /terminos se dejan fuera a propósito — quedaron con
  // noindex (ver sus layout.tsx) por ser boilerplate legal de bajo valor de
  // búsqueda. /coleccion/{slug} también se deja fuera: es el mismo producto
  // que /tienda/{slug} con el canonical apuntando allá (ver su layout.tsx).

  return entries;
}
