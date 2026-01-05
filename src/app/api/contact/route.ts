import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer Transporter
        // Note: User needs to configure these variables in .env
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'mail.ochotierras.cl',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true, // true for 465, false for others
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email Content
        const mailOptions = {
            from: `"Web Ochotierras" <${process.env.SMTP_USER || 'info@ochotierras.cl'}>`,
            to: 'info@ochotierras.cl',
            cc: 'contacto@ochotierras.cl',
            replyTo: email,
            subject: `Nuevo Mensaje Web de ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #6D2829;">Nuevo Mensaje de Contacto</h2>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> ${phone || 'No indicado'}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <h3>Mensaje:</h3>
                    <p style="background: #f9f9f9; p: 15px; border-radius: 5px;">${message}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">Enviado desde el formulario web de ochotierras.cl</p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Error sending email' },
            { status: 500 }
        );
    }
}
