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
    alternates: {
      canonical: '/',
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-brand-dark text-white`}
        suppressHydrationWarning
      >
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
