import { NextResponse } from 'next/server';
import { GetnetService } from '@/app/api/services/getnet';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total, buyer } = body;

        // Basic validation
        if (!items || !total || !buyer) {
            return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
        }

        const getnetService = new GetnetService();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        // Generate unique reference
        const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Expiration: 15 minutes from now
        const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

        const payload = {
            locale: 'es_CL',
            buyer: {
                name: buyer.name,
                surname: ' ', // Optional or split name
                email: buyer.email,
                document: '11111111-1', // Placeholder or ask user for RUT? For now, placeholder for test
                documentType: 'RUT',
                mobile: buyer.phone,
                address: {
                    street: buyer.address,
                    city: buyer.city,
                    country: 'CL'
                }
            },
            payment: {
                reference,
                description: `Pedido OchoTierras ${reference}`,
                amount: {
                    currency: 'CLP',
                    total: total
                },
                allowPartial: false
            },
            expiration,
            returnUrl: `${baseUrl}/checkout/result?reference=${reference}`,
            cancelUrl: `${baseUrl}/checkout`,
            ipAddress: ip,
            userAgent: (await headers()).get('user-agent') || 'Unknown'
        };

        const response = await getnetService.createSession(payload);

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Payment Init Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
