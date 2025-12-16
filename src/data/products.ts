export interface Product {
    id: number;
    name: string;
    slug: string;
    category: string;
    price: number;
    image: string;
    type: string;
    tag?: string;
    soldOut?: boolean;
    description: string;
    tastingNotes?: {
        nose?: string;
        mouth?: string;
        pairing?: string;
    };
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Chardonnay Reserva",
        slug: "chardonnay-reserva",
        category: "Vinos Blancos",
        price: 9000,
        image: "/images/bottles/chardonnay-reserva.webp",
        type: "Blanco",
        tag: "Best Seller",
        description: "Un Chardonnay elegante y fresco, proveniente de viñedos costeros con influencia marina.",
        tastingNotes: {
            nose: "Frutas tropicales, piña, notas cítricas y un toque de vainilla.",
            mouth: "Fresco, equilibrado, con buena acidez y persistencia.",
            pairing: "Pescados grasos, mariscos, quesos suaves."
        }
    },
    {
        id: 2,
        name: "Cabernet Sauvignon Reserva Especial",
        slug: "cabernet-sauvignon-reserva-especial",
        category: "Vinos Tintos",
        price: 12900,
        image: "https://placehold.co/300x500/500000/FFFFFF.png?text=Cabernet",
        type: "Tinto",
        tag: "Nuevo",
        description: "Un Cabernet Sauvignon con carácter, estructurado y de gran potencial de guarda.",
        tastingNotes: {
            nose: "Frutos negros, cassis, pimienta y notas de tabaco.",
            mouth: "Taninos firmes, cuerpo medio-alto y final largo.",
            pairing: "Carnes rojas asadas, quesos maduros."
        }
    },
    {
        id: 3,
        name: "Syrah Reserva Especial",
        slug: "syrah-reserva-especial",
        category: "Vinos Tintos",
        price: 12900,
        image: "https://placehold.co/300x500/500000/FFFFFF.png?text=Syrah",
        type: "Tinto",
        description: "Nuestro Syrah emblemático, intenso y especiado, reflejo del Valle del Limarí.",
        tastingNotes: {
            nose: "Arándanos, violetas, pimienta negra y notas cárnicas.",
            mouth: "Jugoso, tenso, con taninos suaves y gran frescor.",
            pairing: "Cordero, carnes de caza, pastas con salsas intensas."
        }
    },
    {
        id: 4,
        name: "Reserva Privada (Carmenere-Syrah)",
        slug: "reserva-privada-carmenere-syrah",
        category: "Vinos Iconos",
        price: 18900,
        image: "https://placehold.co/300x500/000000/D4AF37.png?text=Reserva+Privada",
        type: "Alta Gama",
        description: "Una mezcla única que combina la suavidad del Carmenere con la estructura del Syrah.",
        tastingNotes: {
            nose: "Frutos rojos maduros, especias dulces, chocolate.",
            mouth: "Sedoso, envolvente, con taninos pulidos.",
            pairing: "Pastel de choclo, guisos, carnes magras."
        }
    },
    {
        id: 5,
        name: "Gran Reserva",
        slug: "gran-reserva",
        category: "Vinos Iconos",
        price: 24900,
        image: "https://placehold.co/300x500/000000/D4AF37.png?text=Gran+Reserva",
        type: "Icono",
        tag: "Limitado",
        description: "La máxima expresión de nuestro terroir. Un vino complejo, profundo y elegante.",
        tastingNotes: {
            nose: "Capas complejas de fruta negra, cuero, grafito y especias.",
            mouth: "Potente, estructurado, pero con una elegancia y finura excepcionales.",
            pairing: "Cortes de carne premium, quesos de gran maduración."
        }
    },
    {
        id: 6,
        name: "Pack Degustación",
        slug: "pack-degustacion",
        category: "Packs",
        price: 35000,
        image: "https://placehold.co/500x300?text=Pack+Degustacion",
        type: "Pack",
        soldOut: true,
        description: "Una selección de nuestros mejores vinos para conocer la diversidad de OchoTierras."
    }
]
