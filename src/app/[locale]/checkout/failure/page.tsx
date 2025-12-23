"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function FailurePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2">Pago Fallido</h1>
                <p className="text-gray-500 mb-8">
                    Lo sentimos, tu transacción no pudo completarse.
                    No se han realizado cargos a tu cuenta.
                </p>

                <div className="space-y-3">
                    <Link href="/checkout">
                        <Button className="w-full h-12 bg-brand-dark hover:bg-black text-white uppercase tracking-widest font-bold rounded-full">
                            Intentar Nuevamente
                        </Button>
                    </Link>
                    <Link href="/tienda">
                        <Button variant="ghost" className="w-full h-12 text-gray-500 hover:text-brand-dark uppercase tracking-widest font-bold rounded-full">
                            Volver a la Tienda <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
