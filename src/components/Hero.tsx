"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

// --- TYPES ---
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

interface HeroSection {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonPrimaryUrl?: string;
    buttonSecondaryText?: string;
    buttonSecondaryUrl?: string;
    image?: string;
}

const defaultImages = [
    "/images/general/vineyard-hero.webp",
    "/images/general/bodega.webp",
    "/images/general/vina-ochotierras-1.webp"
]

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

// --- SUB-COMPONENTS ---

// 1. Film Grain Texture
const FilmGrain = () => (
    <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.07] mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);

// 2. Magnetic Button (Simplified for Hero)
const MagneticButton = ({ children, className, variant = "primary", ...props }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.1); // Magnetic strength
        y.set(middleY * 0.1);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{ x, y }}
            className="inline-block"
        >
            <Button
                className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    variant === "primary"
                        ? "bg-brand-gold text-brand-dark hover:bg-[#D4AF37] hover:brightness-110"
                        : "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
};


// --- MAIN COMPONENT ---

export function Hero({ data }: HeroProps) {
    // API State
    const [apiData, setApiData] = useState<HeroSection[] | null>(null);
    const [isLoading, setIsLoading] = useState(!data || data.length === 0);

    // Initial Fetch
    useEffect(() => {
        if (data && data.length > 0) return;

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://api.ochotierras.cl'}/api/hero-section`;

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(fetchedData => {
                if (fetchedData && Array.isArray(fetchedData)) {
                    setApiData(fetchedData);
                } else if (fetchedData && !Array.isArray(fetchedData)) {
                    setApiData([fetchedData]);
                }
            })
            .catch(err => console.error("Client hero fetch failed:", err))
            .finally(() => setIsLoading(false));
    }, [data]);

    // Data Processing
    const apiHeroSlides: HeroData[] = apiData ? apiData.map(hero => ({
        title: hero.title || "Ochotierras",
        subtitle: hero.subtitle || "Valle del Limarí",
        button_primary_text: hero.buttonText || "Descubrir Colección",
        button_primary_url: hero.buttonPrimaryUrl || "/tienda",
        button_secondary_text: hero.buttonSecondaryText || "Tienda Online",
        button_secondary_url: hero.buttonSecondaryUrl || "/tienda",
        images: hero.image ? [hero.image] : defaultImages,
    })) : [];

    const slides = (data && data.length > 0)
        ? data
        : (apiHeroSlides.length > 0 ? apiHeroSlides : defaultSlides);

    // Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0); // For progress ring

    // Auto-advance Logic
    useEffect(() => {
        if (slides.length <= 1) return;
        setProgress(0); // Reset progress

        const interval = 6000; // 6s per slide
        const tick = 100; // Update progress every 100ms

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);

        const progressTimer = setInterval(() => {
            setProgress(old => Math.min(old + (tick / interval) * 100, 100));
        }, tick);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
    }, [slides.length, currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
        const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
        mouseX.set((clientX - centerX) * 0.05); // Move background 5% of mouse distance
        mouseY.set((clientY - centerY) * 0.05);
    };

    const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Render Helpers
    const currentData = slides[currentSlide];

    const getImageUrl = (img?: string) => {
        if (!img) return "";
        if (img.startsWith("/")) return img;
        if (img.startsWith("http")) return img;
        return `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'}/${img}`;
    };

    const bgImage = currentData.images && currentData.images.length > 0
        ? getImageUrl(currentData.images[0])
        : "";

    const titleParts = currentData.title?.includes("OCHOTIERRAS")
        ? currentData.title.split("OCHOTIERRAS")
        : [currentData.title || ""];

    // --- RENDER ---

    if (isLoading) {
        return <section className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden" />;
    }

    return (
        <section
            className="relative h-screen min-h-[600px] w-full overflow-hidden group bg-black"
            onMouseMove={handleMouseMove}
        >
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    {/* Parallax Container */}
                    <motion.div
                        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${bgImage}')`,
                            x: parallaxX,
                            y: parallaxY
                        }}
                    />

                    {/* Cinematic Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
                    {/* Vignette using radial gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                </motion.div>
            </AnimatePresence>

            {/* Texture */}
            <FilmGrain />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-col items-center"
                    >
                        {/* Subtitle with Growing Lines */}
                        <div className="flex items-center gap-4 mb-6 overflow-hidden">
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 48, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-[1px] bg-brand-gold/80"
                            />
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-brand-gold font-sans uppercase tracking-[0.3em] text-[10px] md:text-sm font-medium whitespace-nowrap"
                            >
                                {currentData.subtitle}
                            </motion.h2>
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 48, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-[1px] bg-brand-gold/80"
                            />
                        </div>

                        {/* Staggered Title Animation */}
                        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-10 tracking-tighter leading-[0.9] overflow-hidden">
                            {titleParts.length > 1 ? (
                                <div className="flex flex-col items-center">
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom cubic bezier
                                        className="block"
                                    >
                                        {titleParts[0]}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-200% animate-shine"
                                        style={{ textShadow: "0 4px 30px rgba(212, 175, 55, 0.3)" }}
                                    >
                                        OCHOTIERRAS
                                    </motion.span>
                                    <motion.span
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="block"
                                    >
                                        {titleParts[1]}
                                    </motion.span>
                                </div>
                            ) : (
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="block"
                                >
                                    {currentData.title}
                                </motion.span>
                            )}
                        </h1>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-6 pt-8 w-full justify-center px-4"
                        >
                            <MagneticButton variant="primary" asChild>
                                <Button
                                    size="lg"
                                    className="relative min-w-[240px] h-16 text-xs md:text-sm font-bold tracking-[0.2em] uppercase bg-brand-gold text-brand-dark border border-brand-gold shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] hover:bg-white hover:text-brand-dark hover:border-white hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.8)] transition-all duration-500 overflow-hidden group"
                                    asChild
                                >
                                    <Link href={currentData.button_primary_url || "/nosotros"}>
                                        <span className="relative z-10">{currentData.button_primary_text || "Nuestra Viña"}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    </Link>
                                </Button>
                            </MagneticButton>

                            <MagneticButton variant="outline" asChild>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="relative min-w-[240px] h-16 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white bg-white/5 border border-white/50 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] transition-all duration-500 group"
                                    asChild
                                >
                                    <Link href={currentData.button_secondary_url || "/tienda"}>
                                        <span className="relative z-10">{currentData.button_secondary_text || "Tienda Online"}</span>
                                    </Link>
                                </Button>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation & Progress */}
            {slides.length > 1 && (
                <>
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white transition-all p-4 rounded-full border border-white/0 hover:border-white/20 hover:bg-white/10 backdrop-blur-sm group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 transition-transform group-hover:-translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Right Arrow with Progress Ring (Optional approach) or separate */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
                        {/* Circle Progress Indicator Wrapper */}
                        <div className="relative flex items-center justify-center">
                            {/* SVG Progress Ring */}
                            <svg className="absolute w-20 h-20 -rotate-90 pointer-events-none">
                                <circle
                                    cx="40" cy="40" r="38"
                                    fill="none"
                                    stroke="bg-white/10"
                                    strokeWidth="1"
                                    className="stroke-white/10"
                                />
                                <circle
                                    cx="40" cy="40" r="38"
                                    fill="none"
                                    stroke="#D4AF37" // Brand Gold
                                    strokeWidth="1.5"
                                    strokeDasharray="239" // 2 * pi * 38
                                    strokeDashoffset={239 - (239 * progress) / 100}
                                    className="transition-all duration-100 ease-linear"
                                />
                            </svg>

                            <button
                                onClick={nextSlide}
                                className="text-white/40 hover:text-white transition-all p-4 rounded-full hover:bg-white/10 backdrop-blur-sm group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 transition-transform group-hover:translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-light">Descubre</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/3 bg-brand-gold"
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
