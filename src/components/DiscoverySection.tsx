"use client"

import { useRef, useEffect, useState } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useAnimationFrame,
    useVelocity,
    wrap
} from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react"

const DISCOVERY_ITEMS = [
    {
        id: 1,
        title: "Turismo",
        subtitle: "Experiencias Únicas",
        image: "/images/general/vina-ochotierras-2.webp",
        link: "/turismo",
    },
    {
        id: 2,
        title: "Vinos",
        subtitle: "Nuestra Colección",
        image: "/images/general/nuestra-vina-ochotierras.webp",
        link: "/nuestros-vinos",
    },
    {
        id: 3,
        title: "Tienda",
        subtitle: "Compra Online",
        image: "/images/general/vina-ochotierras-82.webp",
        link: "/tienda",
    },
    {
        id: 4,
        title: "Contacto",
        subtitle: "Hablemos de Negocios",
        image: "/images/general/ochotierras-lizana.webp",
        link: "/contacto",
    },
    {
        id: 5,
        title: "Bodega",
        subtitle: "Arquitectura & Gravedad",
        image: "/images/general/vina-ochotierras-53.webp",
        link: "/bodega-y-vinedos",
    },
]

export function DiscoverySection() {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const smoothBaseX = useSpring(baseX, {
        stiffness: 150,
        damping: 20
    })

    // Wrap logic: -20 to -45 to ensure smooth looping of the 5 base items repeated
    // We will render items multiple times to cover screen
    const x = useTransform(smoothBaseX, (v) => `${wrap(-20, -45, v)}%`)

    const [isDragging, setIsDragging] = useState(false)

    // Removed auto-scroll useAnimationFrame

    const handleManualNav = (direction: 'left' | 'right') => {
        // Approximate width of one item + gap in percentage relative to total track
        // Tuning this to feel like "one by one"
        const step = 15

        if (direction === 'left') {
            baseX.set(baseX.get() + step)
        } else {
            baseX.set(baseX.get() - step)
        }
    }

    // Duplicate content for infinite loop (enough to cover wide screens)
    // 5 items * 20% width roughly = 100%. We need more for smooth wrapping.
    // Let's triple them.
    const CAROUSEL_ITEMS = [...DISCOVERY_ITEMS, ...DISCOVERY_ITEMS, ...DISCOVERY_ITEMS]

    return (
        <section className="py-32 bg-[#F9F9F9] overflow-hidden relative border-t border-gray-100">

            <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
                <div>
                    <span className="text-brand-gold font-sans uppercase tracking-[0.2em] text-xs font-bold block mb-4">
                        Explora El Universo OchoTierras
                    </span>
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                        Descubre <span className="italic font-light text-gray-400">Más</span>
                    </h2>
                </div>

                {/* Manual Navigation Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleManualNav('left')}
                        className="w-12 h-12 rounded-full border border-gray-300 text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300 active:scale-95"
                        aria-label="Anterior"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => handleManualNav('right')}
                        className="w-12 h-12 rounded-full border border-gray-300 text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300 active:scale-95"
                        aria-label="Siguiente"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="relative w-full overflow-hidden group cursor-grab active:cursor-grabbing">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#F9F9F9] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#F9F9F9] to-transparent z-20 pointer-events-none" />

                {/* Moving track */}
                <div className="flex">
                    <motion.div
                        className="flex gap-8 pl-8"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.000001} // Minimize elastic bounce
                        onDragStart={() => setIsDragging(true)}
                        onDrag={(e, info) => {
                            // Convert px drag to percent movement
                            // Use a sensitivity factor. Px to % depends on viewport.
                            // Assuming 100vw approx.
                            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
                            const sensitivity = 0.1 // Adjust feel
                            const deltaPercent = (info.delta.x / windowWidth) * 100 * -1
                            baseX.set(baseX.get() - deltaPercent)
                        }}
                        onDragEnd={() => {
                            setTimeout(() => setIsDragging(false), 50)
                        }}
                    >
                        {CAROUSEL_ITEMS.map((item, index) => (
                            <Link
                                key={`${item.id}-${index}`}
                                href={item.link}
                                onClick={(e) => {
                                    if (isDragging) e.preventDefault()
                                }}
                                className="relative flex-shrink-0 w-[300px] md:w-[400px] aspect-[3/4] group/card overflow-hidden rounded-sm select-none"
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0 bg-gray-200 pointer-events-none">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover/card:scale-110 grayscale-0 group-hover/card:grayscale" // INVERTED: Color -> Grayscale
                                    />
                                    {/* Overlay: Visible on hover to boost text readability over grayscale */}
                                    <div className="absolute inset-0 bg-brand-dark/0 group-hover/card:bg-brand-dark/40 transition-colors duration-500" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start justify-end h-full transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 pointer-events-none">
                                    <span className="text-brand-gold text-xs font-sans uppercase tracking-[0.2em] mb-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                                        {item.subtitle}
                                    </span>
                                    <div className="flex items-center justify-between w-full">
                                        <h3 className="text-4xl font-serif font-bold text-white leading-none">
                                            {item.title}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center transform translate-x-4 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 delay-100 shadow-lg">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    )
}
