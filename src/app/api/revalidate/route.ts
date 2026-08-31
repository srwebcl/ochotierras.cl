import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// El backend llama a esto (con un secreto compartido) cada vez que se guarda
// algo editable desde el panel — así el catálogo/hero/datos de contacto se
// actualizan al instante en vez de esperar hasta 1 hora (el revalidate del
// fetch). Ver App\Services\FrontendRevalidator en el backend.
export async function POST(request: Request) {
    let body: { secret?: string; tag?: string };

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    const { secret, tag } = body;

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Secreto inválido' }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ error: 'Falta el tag a revalidar' }, { status: 400 });
    }

    revalidateTag(tag, 'max');

    return NextResponse.json({ revalidated: true, tag });
}
