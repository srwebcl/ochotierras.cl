import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viña Ochotierras",
  description: "Vinos de autor del Valle del Limarí.",
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { SmartWhatsApp } from "@/components/SmartWhatsApp";
import { AgeVerification } from "@/components/AgeVerification";

import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/CartSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-brand-dark text-white`}
      >
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
      </body>
    </html>
  );
}
