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

    // 'max' significa "está bien seguir mostrando lo viejo hasta por un año
    // mientras se actualiza de a poco" — lo usan para revalidaciones que
    // pasan DENTRO de un Server Action (alguien que ya está en el sitio).
    // Este endpoint lo llama el backend desde afuera (un aviso tipo
    // webhook), que es justo el caso donde la propia documentación de
    // Next.js dice que hay que usar { expire: 0 } para que el cambio se
    // vea de inmediato, no eventualmente.
    revalidateTag(tag, { expire: 0 });

    return NextResponse.json({ revalidated: true, tag });
}
