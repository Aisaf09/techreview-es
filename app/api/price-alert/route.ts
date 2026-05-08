import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { email, targetPrice, productName, currentPrice } = body ?? {}

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }
  if (!targetPrice || isNaN(Number(targetPrice))) {
    return NextResponse.json({ error: 'Precio inválido' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Servicio no configurado' }, { status: 503 })
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  // Notify the site owner so they can manually check and send the alert
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: `${siteName} <${fromEmail}>`,
      to: [process.env.ADMIN_EMAIL || 'webcraftstudio0109@gmail.com'],
      subject: `[Alerta de precio] ${productName} — objetivo ${targetPrice}€`,
      html: `
        <p><strong>Nueva alerta de precio registrada:</strong></p>
        <ul>
          <li><strong>Producto:</strong> ${productName}</li>
          <li><strong>Precio actual:</strong> ${currentPrice}€</li>
          <li><strong>Precio objetivo:</strong> ${targetPrice}€</li>
          <li><strong>Email usuario:</strong> ${email}</li>
        </ul>
        <p>Cuando el precio baje de ${targetPrice}€, envía un aviso manual a ${email}.</p>
      `,
    }),
  }).catch(() => {/* non-fatal */})

  // Confirm to user
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: `${siteName} <${fromEmail}>`,
      to: [email],
      subject: `Alerta activada: ${productName}`,
      html: `
        <p>Hola,</p>
        <p>Te avisaremos cuando <strong>${productName}</strong> baje de <strong>${targetPrice}€</strong> (precio actual: ${currentPrice}€).</p>
        <p>— ${siteName}</p>
      `,
    }),
  }).catch(() => {/* non-fatal */})

  return NextResponse.json({ ok: true })
}
