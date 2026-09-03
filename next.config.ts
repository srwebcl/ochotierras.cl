import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Next.js exige declarar de antemano qué valores de "quality" se pueden
    // pedir; si no está en esta lista, usa 75 sin avisar (así quedó el fondo
    // del modal de edad en 82KB en vez de bajar más, con quality={20} puesto
    // en el componente pero ignorado). 75 es el que ya usa el resto del
    // sitio por defecto — se agrega 20 para las imágenes puramente
    // decorativas (fondos difuminados/semitransparentes).
    qualities: [20, 75],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ochotierras.cl",
      },
      {
        protocol: "https",
        hostname: "api.ochotierras.cl",
      },
      {
        protocol: "https",
        hostname: "www.ochotierras.cl",
      },
    ],
  },
  async headers() {
    // Nota: Google Tag Manager puede cargar tags adicionales configurados
    // desde su propio panel (no desde este código) que requieran nuevos
    // orígenes en script-src/connect-src/frame-src. Si se agrega un tag
    // nuevo en GTM (p. ej. Meta Pixel) y algo deja de funcionar, revisar
    // primero la consola del navegador por errores de Content-Security-Policy
    // y sumar el dominio correspondiente aquí.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.ochotierras.cl https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.analytics.google.com",
      "frame-src 'self' https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
