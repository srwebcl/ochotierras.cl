"use client"

import React, { ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CinematicHeroProps {
    title: ReactNode
    subtitle?: string | ReactNode
    badge?: string
    description?: string
    backgroundImage: string
    align?: 'center' | 'left'
    heightClass?: string
    children?: ReactNode
}

export function CinematicHero({
    title,
    subtitle,
    badge,
    description,
    backgroundImage,
    align = 'center',
    heightClass = 'h-[calc(100vh-80px)]',
    children
}: CinematicHeroProps) {
    return (
        <div className={cn("relative bg-[#050505] text-white flex items-center overflow-hidden cursor-default group", heightClass, align === 'center' ? 'justify-center' : 'justify-start')}>

            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </motion.div>
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Spotlight Gradient - Follows Mouse (CSS Only for perf) */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.15),_transparent_40%)] pointer-events-none transition-transform duration-300 ease-out group-hover:scale-110" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/pattern-noise.png')] pointer-events-none" />

            {/* Content */}
            <div className={cn("container mx-auto px-6 relative z-10 mt-32", align === 'center' ? 'text-center' : 'text-left')}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {badge && (
                        <span className="inline-block mb-6 text-brand-gold font-sans uppercase tracking-[0.4em] text-xs font-bold border-b border-brand-gold/30 pb-2">
                            {badge}
                        </span>
                    )}

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 pb-4 leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 break-words max-w-full">
                        {title}
                    </h1>

                    {subtitle && (
                        <div className="text-2xl md:text-3xl font-light text-gray-200 mb-6 font-serif">
                            {subtitle}
                        </div>
                    )}

                    {description && (
                        <p className={cn("text-gray-400 text-lg md:text-xl font-light mb-16 leading-relaxed", align === 'center' ? 'max-w-xl mx-auto' : 'max-w-lg')}>
                            {description}
                        </p>
                    )}

                    {children}
                </motion.div>
            </div>
        </div>
    )
}
