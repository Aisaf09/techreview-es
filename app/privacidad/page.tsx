import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Información sobre cómo TechReview ES trata tus datos personales y el uso de cookies.',
  robots: { index: true, follow: false },
}

const SITE_URL   = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview-es.vercel.app'
const SITE_NAME  = 'TechReview ES'
const CONTACT_EMAIL = 'contacto@techreview.es'

export default function PrivacidadPage() {
  const updated = '8 de mayo de 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400">Última actualización: {updated}</p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand-600 dark:prose-a:text-brand-400">

        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos recabados a través de <strong>{SITE_URL}</strong> es el titular del sitio web <strong>{SITE_NAME}</strong>.
        </p>
        <ul>
          <li><strong>Nombre/Razón social:</strong> [TU NOMBRE COMPLETO O RAZÓN SOCIAL]</li>
          <li><strong>NIF/CIF:</strong> [TU NIF]</li>
          <li><strong>Dirección:</strong> [TU DIRECCIÓN]</li>
          <li><strong>Email de contacto:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
        </ul>

        <h2>2. Datos que recabamos</h2>
        <p>Recabamos los siguientes datos:</p>
        <ul>
          <li><strong>Datos de navegación:</strong> Dirección IP anonimizada, páginas visitadas, tiempo de visita, dispositivo y navegador — mediante Google Analytics 4.</li>
          <li><strong>Email:</strong> Si te suscribes al newsletter, almacenamos tu dirección de correo electrónico para enviarte comunicaciones sobre nuevas reviews y guías.</li>
          <li><strong>Datos de contacto:</strong> Si utilizas el formulario de contacto, recibimos tu nombre, email y el mensaje que nos envías.</li>
        </ul>

        <h2>3. Finalidad del tratamiento</h2>
        <ul>
          <li><strong>Analytics:</strong> Analizar el tráfico del sitio para mejorar el contenido y la experiencia de usuario.</li>
          <li><strong>Newsletter:</strong> Enviar comunicaciones sobre nuevas reviews, comparativas y guías de compra.</li>
          <li><strong>Contacto:</strong> Responder a consultas o solicitudes enviadas a través del formulario.</li>
        </ul>

        <h2>4. Base jurídica</h2>
        <ul>
          <li><strong>Cookies analíticas:</strong> Consentimiento del usuario (art. 6.1.a RGPD).</li>
          <li><strong>Newsletter:</strong> Consentimiento explícito al suscribirse (art. 6.1.a RGPD).</li>
          <li><strong>Formulario de contacto:</strong> Interés legítimo para responder a la consulta (art. 6.1.f RGPD).</li>
        </ul>

        <h2>5. Plazo de conservación</h2>
        <ul>
          <li><strong>Datos de analytics:</strong> 14 meses (configuración predeterminada de GA4).</li>
          <li><strong>Email del newsletter:</strong> Hasta que solicites la baja.</li>
          <li><strong>Datos de contacto:</strong> 1 año desde la última comunicación.</li>
        </ul>

        <h2>6. Transferencias internacionales</h2>
        <p>
          Google Analytics 4 puede transferir datos a servidores ubicados en Estados Unidos. Google LLC está adherido al marco EU-US Data Privacy Framework, que garantiza un nivel de protección adecuado conforme al RGPD.
        </p>
        <p>
          El servicio de newsletter Resend también puede procesar datos en servidores fuera del EEE bajo las mismas garantías.
        </p>

        <h2>7. Tus derechos</h2>
        <p>Puedes ejercer los siguientes derechos enviando un email a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>:</p>
        <ul>
          <li><strong>Acceso:</strong> Saber qué datos tenemos sobre ti.</li>
          <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
          <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos.</li>
          <li><strong>Oposición:</strong> Oponerte al tratamiento.</li>
          <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
          <li><strong>Limitación:</strong> Restringir el tratamiento en determinadas circunstancias.</li>
        </ul>
        <p>
          También puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.
        </p>

        <h2>8. Política de cookies</h2>
        <p>Utilizamos las siguientes cookies:</p>

        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Cookie</th>
                <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Tipo</th>
                <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Finalidad</th>
                <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {[
                { name: 'techreview-cookie-consent', tipo: 'Propia · Esencial', desc: 'Guarda tu preferencia de cookies', dur: '1 año' },
                { name: 'theme',                     tipo: 'Propia · Preferencia', desc: 'Guarda el modo claro/oscuro elegido', dur: 'Persistente' },
                { name: '_ga, _ga_*',                tipo: 'Terceros · Analítica', desc: 'Google Analytics — análisis de tráfico', dur: '2 años / 13 meses' },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.tipo}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.desc}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Puedes gestionar o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que rechazar las cookies analíticas no afecta al funcionamiento del sitio.
        </p>

        <h2>9. Links de afiliados</h2>
        <p>
          {SITE_NAME} participa en programas de afiliación de Amazon y otras tiendas. Cuando haces clic en un enlace de afiliado y realizas una compra, podemos recibir una comisión sin coste adicional para ti. Esto no influye en nuestras valoraciones ni recomendaciones.
        </p>

        <h2>10. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o del servicio. Te notificaremos cambios significativos a través del newsletter o mediante un aviso destacado en el sitio.
        </p>

        <hr />
        <p className="text-sm">
          Para cualquier consulta sobre privacidad, escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </article>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/aviso-legal" className="text-brand-600 dark:text-brand-400 hover:underline">Aviso Legal</Link>
        <Link href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">← Volver al inicio</Link>
      </div>
    </div>
  )
}
