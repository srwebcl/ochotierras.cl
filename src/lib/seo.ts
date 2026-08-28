export const SITE_URL = 'https://www.ochotierras.cl';

/**
 * Arma canonical + hreflang correctos para una ruta específica.
 *
 * Antes, el layout raíz dejaba `canonical: '/'` fijo para TODAS las páginas
 * (le decía a Google que la versión canónica de cualquier ficha de producto
 * era el home) y lo mismo para los idiomas. Cada página debe llamar esto
 * con su propia ruta (sin el prefijo de idioma).
 *
 * @param path Ruta sin locale, ej. '/tienda/reserva-especial' o '' para el home.
 * @param locale Idioma actual de la página ('es' | 'en').
 */
export function buildAlternates(path: string, locale: string) {
    return {
        canonical: `${SITE_URL}/${locale}${path}`,
        languages: {
            es: `${SITE_URL}/es${path}`,
            en: `${SITE_URL}/en${path}`,
            'x-default': `${SITE_URL}/es${path}`,
        },
    };
}
