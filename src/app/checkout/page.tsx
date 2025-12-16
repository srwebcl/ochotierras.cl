"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/Section"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, MessageCircle } from "lucide-react"

export default function CheckoutPage() {
    const { items, cartTotal, cartCount } = useCart()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        notes: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const [isProcessing, setIsProcessing] = useState(false)

    const handleGetnetPayment = async () => {
        setIsProcessing(true)
        try {
            const response = await fetch('/api/payment/init', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items,
                    total: cartTotal,
                    buyer: formData
                })
            })

            const data = await response.json()

            if (data.processUrl) {
                if (data.requestId) {
                    localStorage.setItem('getnet_requestId', String(data.requestId))
                }
                window.location.href = data.processUrl
            } else {
                alert('Error al iniciar el pago: ' + (data.error || 'Respuesta desconocida'))
            }
        } catch (error) {
            console.error(error)
            alert('Ocurrió un error al procesar la solicitud.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Construct WhatsApp Message
        const orderId = Math.random().toString(36).substr(2, 6).toUpperCase()
        let message = `*Nueva Orden OchoTierras #${orderId}*\n\n`

        message += `*Cliente:*\n${formData.name}\n${formData.email}\n${formData.phone}\n\n`
        message += `*Dirección:*\n${formData.address}, ${formData.city}\n\n`
        message += `*Pedido:*\n`

        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString()})\n`
        })

        message += `\n*TOTAL: $${cartTotal.toLocaleString()}*\n\n`

        if (formData.notes) {
            message += `*Notas:*\n${formData.notes}`
        }

        const encodedMessage = encodeURIComponent(message)
        window.open(`https://wa.me/56944538170?text=${encodedMessage}`, '_blank')
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50 text-brand-dark">
                <h1 className="text-4xl font-serif font-bold mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-8">Agrega algunos vinos antes de proceder al pago.</p>
                <Link href="/tienda">
                    <Button variant="outline">Volver a la Tienda</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            <div className="container mx-auto px-4">
                <Link href="/tienda" className="flex items-center gap-2 text-gray-500 hover:text-brand-dark mb-8 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} /> Volver a la Tienda
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-12">Finalizar Compra</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Form */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">1. Datos de Envío</h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Ej: Juan Pérez"
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="ejemplo@email.com"
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="+56 9 1234 5678"
                                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Dirección</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="Calle y Número, Depto"
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Ciudad</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder="Ej: La Serena"
                                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Notas del Pedido (Opcional)</label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    placeholder="Instrucciones especiales para el envío o regalo..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-brand-gold transition-colors resize-none"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <Button
                                    onClick={handleGetnetPayment}
                                    disabled={isProcessing || !formData.name || !formData.email || !formData.phone}
                                    className="w-full bg-[#E64B56] hover:bg-[#D43A45] text-white font-bold h-14 uppercase tracking-widest shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Procesando...' : 'Pagar con Getnet (Débito/Crédito)'}
                                </Button>

                                <div className="text-center text-xs text-gray-500 font-medium">O si prefieres coordinar manualmente</div>

                                <Button
                                    onClick={handleSubmit}
                                    variant="outline"
                                    className="w-full border-green-600 text-green-600 hover:bg-green-50 font-bold h-12 uppercase tracking-widest"
                                >
                                    Coordinar por WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-brand-gold/20 sticky top-32">
                        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Resumen</h2>

                        <div className="space-y-4 mb-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-gray-50 rounded flex-shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                                        <p className="text-xs text-brand-gold mt-1">{item.quantity} x ${item.price.toLocaleString('es-CL')}</p>
                                    </div>
                                    <div className="font-bold text-sm text-gray-700">
                                        ${(item.price * item.quantity).toLocaleString('es-CL')}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Envío</span>
                                <span className="text-xs italic">(Por coordinar)</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-brand-dark pt-4 border-t border-gray-100 mt-4">
                                <span>Total</span>
                                <span>${cartTotal.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
