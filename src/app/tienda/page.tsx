import { Section } from "@/components/ui/Section"
import Image from "next/image"
import { StoreProductGrid } from "@/components/StoreProductGrid"

export default function Tienda() {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-brand-dark">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image src="/images/general/tienda_hero_new.png" alt="Tienda Background" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-brand-dark/60 z-10" />

                <div className="container relative z-20 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Tienda Online</h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Recibe la excelencia del Valle del Limarí directamente en tu hogar.
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <Section className="bg-gray-50 text-brand-dark">
                {/* Filters (Visual Only - Logic later if needed) */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up">
                    {['Todos', 'Tintos', 'Blancos', 'Alta Gama', 'Packs'].map((filter) => (
                        <button key={filter} className="px-6 py-2 rounded-full border border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white transition-all text-sm uppercase tracking-wider font-bold">
                            {filter}
                        </button>
                    ))}
                </div>

                <StoreProductGrid />
            </Section>
        </div>
    )
}
