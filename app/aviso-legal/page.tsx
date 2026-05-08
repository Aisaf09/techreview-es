import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal, condiciones de uso y propiedad intelectual de TechReview ES.',
  robots: { index: true, follow: false },
}

const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview-es.vercel.app'
const CONTACT_EMAIL = 'webcraftstudio0109@gmail.com'

export default function AvisoLegalPage() {
  const updated = '8 de mayo de 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Aviso Legal</h1>
        <p className="text-sm text-gray-400">Última actualización: {updated}</p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand-600 dark:prose-a:text-brand-400">

        <h2>1. Titular del sitio web</h2>
        <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), se informa:</p>
        <ul>
          <li><strong>Nombre:</strong> TechReview ES</li>
          <li><strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          <li><strong>Sitio web:</strong> <a href={SITE_URL}>{SITE_URL}</a></li>
        </ul>

        <h2>2. Condiciones de uso</h2>
        <p>
          El acceso y uso de este sitio web implica la aceptación plena de las presentes condiciones. Si no estás de acuerdo, debes abstenerte de utilizar el sitio.
        </p>
        <p>
          El titular se reserva el derecho a modificar, suspender o interrumpir el acceso al sitio sin previo aviso.
        </p>

        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio — incluyendo textos, fotografías, gráficos, logotipos, iconos, imágenes, código fuente y diseño — son propiedad del titular o de terceros que han autorizado su uso.
        </p>
        <p>
          Queda prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos sin autorización expresa por escrito del titular, salvo las excepciones previstas en la ley.
        </p>
        <p>
          Las imágenes de productos utilizadas en las reseñas son propiedad de sus respectivos fabricantes y se utilizan con fines informativos al amparo de las condiciones de los programas de afiliación correspondientes.
        </p>

        <h2>4. Responsabilidad</h2>
        <p>
          Los análisis, valoraciones y recomendaciones publicados en este sitio reflejan la opinión independiente del equipo editorial. No garantizamos que los precios, especificaciones o disponibilidad de los productos sean exactos en el momento de la consulta, ya que pueden variar.
        </p>
        <p>
          El titular no se hace responsable de los daños o perjuicios derivados del uso de la información contenida en el sitio, ni de los sitios web de terceros a los que pueda enlazar.
        </p>

        <h2>5. Programa de afiliados</h2>
        <p>
          Este sitio participa en el <strong>Programa de Afiliados de Amazon</strong> y otros programas de afiliación. Algunos enlaces del sitio son enlaces de afiliado, lo que significa que podemos recibir una comisión si realizas una compra a través de ellos, sin coste adicional para ti.
        </p>
        <p>
          Esta relación no influye en la independencia de nuestros análisis ni en las puntuaciones asignadas a los productos.
        </p>

        <h2>6. Política de publicidad</h2>
        <p>
          Este sitio puede mostrar anuncios a través de Google AdSense o redes similares. Los anunciantes no tienen influencia sobre el contenido editorial. Las opiniones expresadas son exclusivamente del equipo de {'{SITE_NAME}'}.
        </p>

        <h2>7. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de este sitio, las partes se someten a los juzgados y tribunales competentes conforme a la normativa vigente.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Para cualquier consulta legal puedes contactar con nosotros en: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>

      </article>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/privacidad" className="text-brand-600 dark:text-brand-400 hover:underline">Política de Privacidad</Link>
        <Link href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">← Volver al inicio</Link>
      </div>
    </div>
  )
}
