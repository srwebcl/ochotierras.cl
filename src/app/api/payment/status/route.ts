import { NextResponse } from 'next/server';
import { GetnetService } from '@/app/api/services/getnet';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { requestId } = body;

        if (!requestId) {
            return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
        }

        const getnetService = new GetnetService();
        const response = await getnetService.getRequestStatus(requestId);

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Payment Status Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
