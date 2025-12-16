"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CheckoutResultPage() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'approved' | 'rejected' | 'pending' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const { clearCart } = useCart()

    useEffect(() => {
        const checkStatus = async () => {
            const requestId = localStorage.getItem('getnet_requestId')

            // Should verify if we have a requestId. 
            // If the URL has 'reference', we might assume it's a return.
            // But checking the actual status from API is safer.

            if (!requestId) {
                setStatus('error')
                setMessage('No se encontró información de la transacción.')
                return
            }

            try {
                const response = await fetch('/api/payment/status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ requestId })
                })

                const data = await response.json()

                if (data.status) {
                    // Getnet status structure: status: { status: 'APPROVED', ... }
                    const paymentStatus = data.status.status

                    if (paymentStatus === 'APPROVED') {
                        setStatus('approved')
                        clearCart()
                    } else if (paymentStatus === 'REJECTED') {
                        setStatus('rejected')
                        setMessage(data.status.message || 'El pago fue rechazado.')
                    } else {
                        setStatus('pending')
                        setMessage(data.status.message || 'El pago está pendiente o en proceso.')
                    }
                } else {
                    setStatus('error')
                    setMessage('Respuesta inválida del servidor de pagos.')
                }

            } catch (error) {
                console.error(error)
                setStatus('error')
                setMessage('Error al verificar el estado del pago.')
            }
        }

        checkStatus()
    }, [clearCart])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">

                {status === 'loading' && (
                    <div className="flex flex-col items-center py-12">
                        <Loader2 className="animate-spin text-brand-gold mb-4" size={48} />
                        <h2 className="text-xl font-bold text-gray-800">Verificando pago...</h2>
                    </div>
                )}

                {status === 'approved' && (
                    <div className="flex flex-col items-center py-8">
                        <CheckCircle className="text-green-500 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
                        <p className="text-gray-500 mb-8">Tu pedido ha sido confirmado. Recibirás un correo con los detalles.</p>
                        <Link href="/tienda" className="w-full">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 uppercase tracking-widest">
                                Volver a la Tienda
                            </Button>
                        </Link>
                    </div>
                )}

                {status === 'rejected' && (
                    <div className="flex flex-col items-center py-8">
                        <XCircle className="text-red-500 mb-4" size={64} />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pago Rechazado</h2>
                        <p className="text-gray-500 mb-8">{message}</p>
                        <div className="flex flex-col gap-3 w-full">
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full bg-brand-dark hover:bg-black text-white font-bold h-12 uppercase tracking-widest">
                                    Intentar Nuevamente
                                </Button>
                            </Link>
                            <Link href="/tienda" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Volver a la Tienda
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {(status === 'error' || status === 'pending') && (
                    <div className="flex flex-col items-center py-8">
                        <div className="text-yellow-500 mb-4">
                            {status === 'pending' ? <Loader2 className="animate-spin" size={64} /> : <XCircle size={64} />}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {status === 'pending' ? 'Pago Pendiente' : 'Hubo un problema'}
                        </h2>
                        <p className="text-gray-500 mb-8">{message}</p>
                        <Link href="/checkout" className="w-full">
                            <Button variant="outline" className="w-full">
                                Volver al Checkout
                            </Button>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    )
}
