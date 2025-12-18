import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Proxy to Laravel Backend
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/api/payment/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || 'Error en el backend' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Payment Proxy Error:', error);
        return NextResponse.json(
            { error: 'Error de conexión con el servidor de pedidos' },
            { status: 500 }
        );
    }
}
