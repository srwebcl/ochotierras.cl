"use client"

import { Section } from "@/components/ui/Section"

export default function PrivacyPage() {
    return (
        <div className="pt-20">
            <Section className="bg-white text-gray-800">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-serif font-bold text-brand-dark mb-8">Política de Privacidad</h1>

                    <div className="prose prose-lg text-gray-600">
                        <p>Última actualización: Diciembre 2025</p>

                        <h3>1. Información que recolectamos</h3>
                        <p>
                            En Viña OchoTierras valoramos su privacidad. Solo recolectamos información básica necesaria para procesar sus pedidos y mejorar su experiencia en nuestro sitio web. Esto puede incluir su nombre, dirección de correo electrónico, número de teléfono y dirección de envío.
                        </p>

                        <h3>2. Uso de la información</h3>
                        <p>
                            La información recolectada se utiliza exclusivamente para:
                        </p>
                        <ul>
                            <li>Procesar y enviar sus pedidos.</li>
                            <li>Comunicarnos con usted respecto a su compra.</li>
                            <li>Enviar información sobre nuevos productos o promociones (solo si ha aceptado recibirla).</li>
                        </ul>

                        <h3>3. Protección de datos</h3>
                        <p>
                            Implementamos medidas de seguridad para proteger su información personal. No vendemos, intercambiamos ni transferimos su información personal a terceros, excepto cuando sea necesario para completar su pedido (por ejemplo, empresas de transporte).
                        </p>

                        <h3>4. Cookies</h3>
                        <p>
                            Nuestro sitio web utiliza cookies para mejorar la experiencia de navegación y recordar sus preferencias, como los artículos en su carrito de compras.
                        </p>

                        <h3>5. Contacto</h3>
                        <p>
                            Si tiene preguntas sobre nuestra política de privacidad, por favor contáctenos en contacto@ochotierras.cl.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    )
}
