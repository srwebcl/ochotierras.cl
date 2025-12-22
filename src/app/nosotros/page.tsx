import { Section } from "@/components/ui/Section"
import Image from "next/image"

export default function Nosotros() {
    return (
        <div className="pt-20">
            {/* Hero / Header - Parallax Style */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark fixed-parallax">
                    {/* Use vineyard hero as background */}
                    <div className="absolute inset-0 bg-[url('/images/general/hero-nosotros.jpeg')] bg-cover bg-center opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="inline-block border text-brand-gold border-brand-gold px-4 py-1 mb-6 text-sm uppercase tracking-widest font-bold">
                        Desde 1993
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">Nuestra Historia</h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        Una bodega de producción limitada en el corazón del Valle del Limarí.
                    </p>
                </div>
            </section>

            {/* Story Timeline */}
            <Section className="bg-white text-brand-dark py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-brand-gold/30" />
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-none">
                            Raíces <br /> <span className="text-brand-red italic">Profundas</span>
                        </h2>

                        <div className="border-l border-brand-dark/20 pl-8 ml-2 space-y-12">
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-brand-gold rounded-full border-4 border-white" />
                                <span className="text-brand-gold font-bold text-xl block mb-2">1993</span>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    La historia comienza cuando se plantaron las primeras parras en nuestras tierras, buscando el terroir perfecto.
                                </p>
                            </div>
                            <div className="relative">
                                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-brand-red rounded-full border-4 border-white" />
                                <span className="text-brand-red font-bold text-xl block mb-2">2005</span>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Nace Viña Ochotierras como tal. Comenzamos a hacer nuestros propios y únicos vinos prácticamente a mano, cuidando cada detalle para lograr la máxima expresión de nuestro Valle.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full shadow-2xl overflow-hidden rounded-sm group">
                        {/* Placeholder for now - replace with historical photo if available */}
                        <Image
                            src="/images/general/vinedos-nosotros.jpeg"
                            alt="Historia de Viña Ochotierras"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </div>
            </Section>

            {/* The Valley - Dark Mode */}
            <Section className="bg-brand-dark text-white py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/general/hero-nosotros.jpeg')] bg-cover bg-center opacity-10 blur-sm" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="order-2 md:order-1 relative h-[500px] w-full">
                        <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4" />
                        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
                            <Image
                                src="/images/general/valle-limari.jpg"
                                alt="Valle del Limarí"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8">Valle del Limarí</h2>
                        <p className="text-xl leading-relaxed text-gray-300 mb-6 font-light">
                            Tierra de contrastes. Suelos minerales y sol del norte, acariciados por la "Camanchaca".
                        </p>
                        <p className="text-lg leading-relaxed text-gray-400">
                            Nuestras viñas crecen en un entorno semi-désertico. La niebla fría proveniente del Pacífico modera las temperaturas, permitiendo una maduración lenta que otorga acidez vibrante, frescura y una marcada mineralidad a nuestros vinos.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10">
                                <span className="block text-brand-gold text-2xl mb-1">🌤</span>
                                <span className="text-sm font-bold uppercase tracking-widest">Alta Luminosidad</span>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10">
                                <span className="block text-brand-gold text-2xl mb-1">🌫</span>
                                <span className="text-sm font-bold uppercase tracking-widest">Camanchaca</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Philosophy */}
            <Section className="bg-white text-brand-dark py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Nuestra Filosofía</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-10" />
                    <p className="text-2xl leading-relaxed text-gray-600 mb-16 italic font-serif">
                        &quot;Creemos en la mínima intervención como camino a la excelencia.&quot;
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <span className="text-4xl mb-6 block text-gray-300 group-hover:text-brand-red transition-colors">01.</span>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">Vendimia Manual</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Cada racimo es seleccionado y cosechado a mano para asegurar que solo la mejor fruta llegue a la bodega. No utilizamos maquinaria que pueda dañar las uvas.
                            </p>
                        </div>
                        <div className="p-10 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                            <span className="text-4xl mb-6 block text-gray-300 group-hover:text-brand-red transition-colors">02.</span>
                            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">Movimiento por Gravedad</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Minimizamos el uso de bombas, moviendo el vino suavemente por gravedad. Esto preserva los aromas naturales y la estructura tánica, entregando vinos redondos y elegantes.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
