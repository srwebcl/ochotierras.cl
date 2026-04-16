import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        // 1. Email de notificación al equipo
        await resend.emails.send({
            from: 'Ocho Tierras Web <noreply@ochotierras.cl>',
            to: ['info@ochotierras.cl'],
            cc: ['contacto@ochotierras.cl'],
            replyTo: email,
            subject: `📬 Nuevo mensaje de ${name} — Ocho Tierras`,
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <body style="margin:0;padding:0;background:#f4f4f0;font-family:'Helvetica Neue',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 0;">
                  <tr><td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                      <tr><td style="background:#1a1a2e;padding:32px 40px;">
                        <h1 style="margin:0;color:#D4AF37;font-size:20px;font-weight:700;letter-spacing:2px;">📬 NUEVO MENSAJE — OCHO TIERRAS</h1>
                      </td></tr>
                      <tr><td style="padding:40px;">
                        <table width="100%" style="background:#fff8e7;border-left:4px solid #D4AF37;padding:20px;border-radius:0 8px 8px 0;margin-bottom:32px;">
                          <tr><td>
                            <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#1a1a2e;">${name}</p>
                            <p style="margin:0;color:#888;font-size:13px;">${email}${phone ? ' · ' + phone : ''}</p>
                          </td></tr>
                        </table>
                        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#D4AF37;text-transform:uppercase;letter-spacing:2px;">Mensaje</p>
                        <p style="background:#f9f9f6;padding:20px;border-radius:8px;color:#333;font-size:14px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
                      </td></tr>
                      <tr><td style="background:#1a1a2e;padding:16px 40px;text-align:center;">
                        <p style="margin:0;color:#ffffff50;font-size:11px;">Responde directamente a este email para contactar a ${name}</p>
                      </td></tr>
                    </table>
                  </td></tr>
                </table>
                </body></html>
            `,
        });

        // 2. Email de confirmación automático al cliente
        await resend.emails.send({
            from: 'Ocho Tierras <noreply@ochotierras.cl>',
            to: [email],
            subject: '✅ Recibimos tu mensaje — Ocho Tierras',
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <body style="margin:0;padding:0;background:#f4f4f0;font-family:'Helvetica Neue',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 0;">
                  <tr><td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
                      <tr><td style="background:#1a1a2e;padding:40px;text-align:center;">
                        <h1 style="margin:0;color:#D4AF37;font-size:28px;font-weight:300;letter-spacing:4px;text-transform:uppercase;">OCHO TIERRAS</h1>
                        <p style="margin:8px 0 0;color:#ffffff80;font-size:12px;letter-spacing:2px;">Viña & Bodega</p>
                      </td></tr>
                      <tr><td style="background:#D4AF37;padding:32px 40px;text-align:center;">
                        <p style="margin:0;font-size:40px;">✅</p>
                        <h2 style="margin:12px 0 4px;color:#1a1a2e;font-size:22px;font-weight:700;">¡Mensaje Recibido!</h2>
                        <p style="margin:0;color:#1a1a2e99;font-size:14px;">Nos pondremos en contacto contigo a la brevedad</p>
                      </td></tr>
                      <tr><td style="padding:40px;">
                        <p style="margin:0 0 16px;color:#333;font-size:16px;">Hola <strong>${name}</strong>,</p>
                        <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te responderá a la brevedad posible.</p>
                        <table width="100%" style="background:#f9f9f6;border-radius:8px;padding:20px;">
                          <tr><td>
                            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#D4AF37;text-transform:uppercase;letter-spacing:2px;">Tu mensaje</p>
                            <p style="margin:0;color:#555;font-size:14px;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
                          </td></tr>
                        </table>
                      </td></tr>
                      <tr><td style="background:#f9f9f6;padding:32px 40px;text-align:center;border-top:1px solid #eee;">
                        <p style="margin:0 0 8px;color:#888;font-size:13px;">También puedes contactarnos en</p>
                        <a href="mailto:contacto@ochotierras.cl" style="color:#D4AF37;font-size:13px;font-weight:600;text-decoration:none;">contacto@ochotierras.cl</a>
                        <p style="margin:24px 0 0;color:#bbb;font-size:11px;">© ${new Date().getFullYear()} Viña Ocho Tierras. Todos los derechos reservados.</p>
                      </td></tr>
                    </table>
                  </td></tr>
                </table>
                </body></html>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error enviando email:', error);
        return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
    }
}
