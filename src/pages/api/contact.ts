import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, company, message, honeypot, formTime, isDemo } = body;

    // Validaciones de seguridad del lado del servidor
    if (honeypot.website || honeypot.phone || honeypot.url) {
      console.warn('Bot detected: Honeypot filled');
      return new Response(JSON.stringify({ error: 'Invalid submission' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (formTime < 3000) {
      console.warn('Bot detected: Form submitted too quickly');
      return new Response(JSON.stringify({ error: 'Submission too fast' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validaciones básicas
    if (isDemo) {
      // Para demo solo requerimos email
      if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required for demo access' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // Para contacto normal requerimos name, email y message
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Enviar email usando Resend
    const emailData = await resend.emails.send({
      from: 'QArk Contact <noreply@qark.app>', // Cambiar por tu dominio verificado
      to: ['contacto@qark.app'],
      replyTo: email,
      subject: `${isDemo ? '[DEMO] ' : ''}Nuevo contacto de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo contacto - QArk</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              ${isDemo ? '🚀 Nueva Solicitud de Demo' : '📧 Nuevo Mensaje de Contacto'}
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>👤 Nombre:</strong> ${name || 'No proporcionado (demo)'}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>🏢 Empresa:</strong> ${company || 'No especificada'}</p>
              <p><strong>📝 Tipo:</strong> ${isDemo ? 'Solicitud de Demo' : 'Contacto General'}</p>
            </div>
            
            ${!isDemo && message ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #1f2937;">💬 Mensaje:</h3>
              <div style="background: white; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : `
            <div style="margin: 20px 0; background: #dbeafe; padding: 15px; border-radius: 8px;">
              <h3 style="color: #1e40af;">🚀 Solicitud de Demo</h3>
              <p style="color: #1e3a8a; margin: 5px 0;">El usuario ha solicitado acceso a la demo de QArk.</p>
              <p style="color: #1e3a8a; margin: 5px 0;"><strong>Próximos pasos:</strong> Enviar credenciales de acceso a la demo.</p>
            </div>
            `}
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 12px; color: #6b7280;">
              📅 Enviado el: ${new Date().toLocaleString('es-ES')}<br>
              🌐 Desde: QArk Contact Form
            </p>
          </div>
        </body>
        </html>
      `
    });

    console.log('Email sent successfully:', emailData.data?.id);
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: emailData.data?.id,
      message: 'Email sent successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};