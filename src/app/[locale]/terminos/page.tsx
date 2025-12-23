"use client"

import { Section } from "@/components/ui/Section"

export default function TerminosPage() {
    return (
        <div className="pt-20">
            <Section className="bg-white text-gray-800">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-serif font-bold text-brand-dark mb-8">Términos y Condiciones</h1>

                    <div className="prose prose-lg text-gray-600">
                        <p>Bienvenido al sitio web de Viña OchoTierras. Al utilizar este sitio, usted acepta los siguientes términos y condiciones.</p>

                        <h3>1. Venta de Alcohol</h3>
                        <p>
                            La venta de alcohol está prohibida a menores de 18 años. Al realizar una compra en nuestro sitio, usted declara ser mayor de edad según la legislación chilena.
                        </p>

                        <h3>2. Precios y Disponibilidad</h3>
                        <p>
                            Todos los precios están en Pesos Chilenos (CLP) e incluyen IVA. Nos reservamos el derecho de modificar los precios y la disponibilidad de los productos sin previo aviso. En caso de falta de stock de un producto pagado, nos contactaremos para ofrecer una alternativa o el reembolso.
                        </p>

                        <h3>3. Envíos y Despachos</h3>
                        <p>
                            Realizamos despachos a todo Chile a través de empresas externas. Los tiempos de entrega son estimados y pueden variar según la ubicación y contingencias. Viña OchoTierras no se hace responsable por retrasos imputables a la empresa de transporte, aunque gestionaremos cualquier incidencia para resolverla.
                        </p>

                        <h3>4. Cambios y Devoluciones</h3>
                        <p>
                            Si un producto llega dañado o no corresponde a lo comprado, debe contactarnos dentro de las 24 horas siguientes a la recepción con fotografías del producto para gestionar el cambio o reembolso.
                        </p>

                        <h3>5. Propiedad Intelectual</h3>
                        <p>
                            Todo el contenido de este sitio web (imágenes, textos, logos) es propiedad de Viña OchoTierras y está protegido por las leyes de propiedad intelectual.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    )
}
