"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order')
    const { clearCart } = useCart()

    useEffect(() => {
        if (orderId) {
            clearCart()
        }
    }, [orderId, clearCart])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100"
        >
            <div className="flex justify-center mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
            </div>

            <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2">¡Pago Exitoso!</h1>
            <p className="text-gray-500 mb-8">
                Gracias por tu compra. Tu pedido <span className="font-bold text-brand-dark">#{orderId}</span> ha sido confirmado.
                Te hemos enviado un correo con los detalles.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 text-left">
                <h3 className="text-sm font-bold text-brand-dark mb-2 uppercase tracking-wider">Pasos siguientes:</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>Prepararemos tus vinos con cuidado.</li>
                    <li>Te notificaremos cuando sean despachados.</li>
                    <li>El tiempo estimado de entrega es de 2-4 días hábiles.</li>
                </ul>
            </div>

            <div className="space-y-3">
                <Link href="/tienda">
                    <Button className="w-full h-12 bg-brand-dark hover:bg-brand-red text-white uppercase tracking-widest font-bold rounded-full">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Seguir Comprando
                    </Button>
                </Link>
            </div>
        </motion.div>
    )
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Verificando pago...</p>
                </div>
            }>
                <SuccessContent />
            </Suspense>
        </div>
    )
}
