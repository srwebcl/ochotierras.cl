"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const defaultImages = [
    "/images/general/vineyard-hero.webp",
    "/images/general/bodega.webp",
    "/images/general/vina-ochotierras-1.webp"
]

interface HeroData {
    title?: string;
    subtitle?: string;
    button_primary_text?: string;
    button_primary_url?: string;
    button_secondary_text?: string;
    button_secondary_url?: string;
    images?: string[];
}

interface HeroProps {
    data?: HeroData[] | null;
}

// Define the interface for the data fetched from the API
interface HeroSection {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    image?: string; // Assuming the API returns a single image URL for the background
    // If the API returns multiple slides, this interface would need to be an array of HeroData
    // For now, assuming it's a single hero section data
}

const defaultSlides: HeroData[] = [
    {
        title: "VIÑA OCHOTIERRAS",
        subtitle: "En el corazón del Valle del Limarí",
        button_primary_text: "Nuestra Viña",
        button_primary_url: "/nosotros",
        button_secondary_text: "Tienda Online",
        button_secondary_url: "/tienda",
        images: ["/images/general/vineyard-hero.webp"]
    }
];

export function Hero({ data }: HeroProps) {
    // If `data` prop is provided, use it as initial state, otherwise null
    // We update to receive an ARRAY of HeroSection from API
    const [apiData, setApiData] = useState<HeroSection[] | null>(null);
    const [isLoading, setIsLoading] = useState(!data || data.length === 0);

    useEffect(() => {
        if (data && data.length > 0) return; // Don't fetch if data provided via props

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/hero-section`;

        // Fetch fresh data on client side to bypass connection issues
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(fetchedData => {
                if (fetchedData && Array.isArray(fetchedData)) {
                    setApiData(fetchedData);
                } else if (fetchedData && !Array.isArray(fetchedData)) {
                    // Handle case where API might still return single object if not deployed yet
                    setApiData([fetchedData]);
                }
            })
            .catch(err => console.error("Client hero fetch failed:", err))
            .finally(() => setIsLoading(false));
    }, [data]);

    // Convert API data to HeroData slides
    const apiHeroSlides: HeroData[] = apiData ? apiData.map(hero => ({
        title: hero.title || "Ochotierras",
        subtitle: hero.subtitle || "Valle del Limarí",
        button_primary_text: hero.buttonText || "Descubrir Colección",
        button_primary_url: "/tienda", // Default to store
        images: hero.image ? [hero.image] : defaultImages, // Use single image for now as bg
    })) : [];

    // Determine the slides to use:
    // 1. If `data` prop is provided and not empty, use it.
    // 2. If `apiHeroSlides` has items (from API fetch), use them.
    // 3. Otherwise, fall back to `defaultSlides`.
    const slides = (data && data.length > 0)
        ? data
        : (apiHeroSlides.length > 0 ? apiHeroSlides : defaultSlides);

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [slides.length, currentSlide]); // Reset timer when slide changes (manual or auto)

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const currentData = slides[currentSlide];

    // Determine image URL
    const getImageUrl = (img?: string) => {
        if (!img) return "";
        if (img.startsWith("/")) return img; // Local static image
        if (img.startsWith("http")) return img; // Absolute URL (API)
        return `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'}/${img}`;
    };

    const bgImage = currentData.images && currentData.images.length > 0
        ? getImageUrl(currentData.images[0])
        : "";

    // Parse title
    const title = currentData.title || "";
    const titleParts = title.includes("OCHOTIERRAS") && title.includes("VIÑA")
        ? title.split("OCHOTIERRAS")
        : [title];

    if (isLoading) {
        return <section className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden" />;
    }

    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden group">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear scale-105 hover:scale-110"
                        style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-dark/90" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-2 md:gap-4 mb-6">
                            <div className="h-[1px] w-8 md:w-12 bg-brand-gold/60" />
                            <h2 className="text-brand-gold font-sans uppercase tracking-[0.15em] md:tracking-[0.3em] text-[10px] md:text-sm font-medium whitespace-nowrap">
                                {currentData.subtitle}
                            </h2>
                            <div className="h-[1px] w-8 md:w-12 bg-brand-gold/60" />
                        </div>

                        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
                            {titleParts.length > 1 ? (
                                <>
                                    {titleParts[0]}
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold bg-300% animate-gradient">
                                        OCHOTIERRAS
                                    </span>
                                    {titleParts[1]}
                                </>
                            ) : (
                                title
                            )}
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8">
                            <Button size="lg" className="min-w-[180px] md:min-w-[200px] h-12 md:h-14 bg-brand-gold text-brand-dark hover:bg-white text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105" asChild>
                                <Link href={currentData.button_primary_url || "/nosotros"}>{currentData.button_primary_text || "Nuestra Viña"}</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="min-w-[180px] md:min-w-[200px] h-12 md:h-14 border-white text-white hover:bg-white hover:text-brand-dark text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 backdrop-blur-sm" asChild>
                                <Link href={currentData.button_secondary_url || "/tienda"}>{currentData.button_secondary_text || "Tienda Online"}</Link>
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-black/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-black/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-brand-gold" : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Descubre</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-gold to-transparent relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-white"
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
