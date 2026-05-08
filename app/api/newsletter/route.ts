import { NextRequest, NextResponse } from 'next/server'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || `newsletter@techreview.es`

function welcomeHtml(email: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,sans-serif;background:#f9fafb;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#1d4ed8,#1e3a8a);padding:32px 24px;text-align:center">
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900">${SITE_NAME}</h1>
      <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Reviews independientes de tecnología</p>
    </div>
    <div style="padding:32px 24px">
      <h2 style="color:#111827;font-size:18px;margin:0 0 12px">¡Bienvenido a la lista!</h2>
      <p style="color:#4b5563;line-height:1.6;margin:0 0 16px">
        Gracias por suscribirte a <strong>${SITE_NAME}</strong>. A partir de ahora recibirás nuestras últimas reviews, comparativas y guías de compra directamente en tu email.
      </p>
      <p style="color:#4b5563;line-height:1.6;margin:0 0 24px">
        Analizamos portátiles, móviles, auriculares, tablets y monitores con tests reales y sin influencias de fabricantes.
      </p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'}" style="display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:10px;font-size:14px">
        Ver últimas reviews →
      </a>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #f3f4f6;text-align:center">
      <p style="color:#9ca3af;font-size:12px;margin:0">
        Has recibido este email porque ${email} se suscribió a ${SITE_NAME}.
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email: string | undefined = body?.email

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Newsletter no configurado' }, { status: 503 })
  }

  // Add to audience if configured
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (audienceId) {
    await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ email, unsubscribed: false }),
    }).catch(() => {/* non-fatal */})
  }

  // Send welcome email
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: [email],
      subject: `Bienvenido a ${SITE_NAME}`,
      html: welcomeHtml(email),
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    console.error('Resend error:', data)
    return NextResponse.json({ error: 'Error al enviar el correo de bienvenida' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
