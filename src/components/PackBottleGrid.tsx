"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface PackItem {
    id: number;
    name: string;
    quantity: number;
    image?: string;
}

interface PackBottleGridProps {
    items: PackItem[];
    className?: string;
}

export function PackBottleGrid({ items, className }: PackBottleGridProps) {
    // Flatten items to get a list of all bottles to display (e.g. 2 Syrah, 2 Carmenere -> [S, S, C, C])
    // Limit to 6 MAX for visual sanity, though packs are usually 6.
    // Ensure quantity is treated as a number (API pivot might return string)
    const bottles = items.flatMap(item => Array(Number(item.quantity)).fill(item)).slice(0, 6);

    // Calculate overlap and layout dynamics
    const total = bottles.length;

    return (
        <div className={cn("flex items-end justify-center relative h-full w-full", className)}>
            {bottles.map((bottle, index) => {
                // Formatting Logic: "Center Stage"
                // The middle bottle(s) should be in front (highest Z) and largest.
                // As we go out, z-index drops, scale drops, and we rotate slightly inward.

                const centerIndex = (total - 1) / 2;
                const distanceFromCenter = Math.abs(index - centerIndex);
                const isCenter = distanceFromCenter < 0.6; // exact center or shared center

                // Z-Index: Higher at center
                const zIndex = 10 - Math.floor(distanceFromCenter);

                // Scale: 1 at center, smaller at edges
                const scale = 1 - (distanceFromCenter * 0.05);

                // X Offset: Overlap logic (manual squeeze)
                // We don't use margin here to allow precise control. We use translate X.
                // Shift left if on left side, right if on right side, relative to natural flex position?
                // Actually negative margins are easier for flex, let's stick to negative margins but add transforms.

                const xParams = index === 0 ? '' : '-ml-8 md:-ml-12'; // Tight overlap

                // Rotation: REMOVED as per user request (Straight alignment)
                const rotateDeg = 0;

                // Y Offset: Arch effect (Center is higher or lower? Let's make center slightly forward/lower for impact)
                const yOffset = Math.abs(index - centerIndex) * 4;

                return (
                    <div
                        key={`${bottle.id}-${index}`}
                        className={cn(
                            "relative transition-all duration-500 ease-out hover:scale-110 hover:z-20",
                            xParams
                        )}
                        style={{
                            zIndex: zIndex,
                            transform: `translateY(-${yOffset}px) scale(${scale})`,
                        }}
                    >
                        {/* More Imposing Dimensions */}
                        <div className="relative w-16 h-48 md:w-24 md:h-72 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
                            <Image
                                src={bottle.image || '/images/bottles/chardonnay-reserva.webp'}
                                alt={bottle.name}
                                fill
                                className="object-contain"
                                sizes="200px" // Increased size hint
                            />
                            {/* Reflection/Shine effect could go here */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
