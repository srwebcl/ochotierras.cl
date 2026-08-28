import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css"; // Moved up

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://www.ochotierras.cl'),
    title: {
      template: t('title.template'),
      default: t('title.default'),
    },
    description: t('description'),
    // Este es el fallback para el home de cada idioma. Cada página interna
    // define su propio alternates (ver src/lib/seo.ts) — antes esto quedaba
    // fijo en '/' para todo el sitio y rompía el canonical de cada ficha.
    alternates: buildAlternates('', locale),
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      url: 'https://www.ochotierras.cl',
      siteName: 'Viña Ochotierras',
      images: [
        {
          url: '/images/general/hero-nosotros.jpeg',
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === 'es' ? 'es_CL' : 'en_US',
      type: 'website',
    },
  };
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { SmartWhatsApp } from "@/components/SmartWhatsApp";
import { AgeVerification } from "@/components/AgeVerification";

import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/CartSidebar";
import Script from "next/script";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Winery',
    name: 'Viña Ochotierras',
    url: 'https://www.ochotierras.cl',
    logo: 'https://www.ochotierras.cl/images/logos/logo-white.webp',
    image: 'https://www.ochotierras.cl/images/general/hero-nosotros.jpeg',
    email: 'contacto@ochotierras.cl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ruta D 505, km 11 desde Ovalle',
      addressLocality: 'Valle del Limarí',
      addressRegion: 'Coquimbo',
      addressCountry: 'CL',
    },
    sameAs: [
      'https://www.instagram.com/ochotierras.cl/',
      'https://www.facebook.com/ochotierras.cl/',
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P98QWP9G');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-brand-dark text-white`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P98QWP9G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar />
            <CartSidebar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <SmartWhatsApp />
            <AgeVerification />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
