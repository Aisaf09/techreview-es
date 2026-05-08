import type { Metadata } from 'next'
import { Shield, Zap, BarChart3, Users, Award, Clock } from 'lucide-react'
import BreadCrumbs from '@/components/BreadCrumbs'
import NewsletterForm from '@/components/NewsletterForm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export const metadata: Metadata = {
  title: 'Sobre nosotros — Quiénes somos y nuestra metodología',
  description: 'Conoce al equipo detrás de TechReview ES, nuestra metodología de análisis independiente y cómo elegimos los productos que analizamos.',
  alternates: { canonical: `${SITE_URL}/about` },
}

const values = [
  { icon: Shield,   title: 'Independencia editorial',  desc: 'Ningún fabricante financia ni condiciona nuestras opiniones. Los productos se compran con nuestro dinero o se devuelven tras el análisis.' },
  { icon: Zap,      title: 'Pruebas reales',            desc: 'Usamos cada producto durante al menos 7 días en escenarios cotidianos. Medimos con instrumentos: colorímetro, luxómetro, benchmarks.' },
  { icon: BarChart3, title: 'Datos objetivos',          desc: 'Nuestras puntuaciones se calculan con una rúbrica pública de 10 criterios ponderados. No hay opiniones sin datos detrás.' },
  { icon: Users,    title: 'Transparencia de afiliados', desc: 'Ganamos comisiones por ventas vía nuestros enlaces. Esto nunca afecta la puntuación. Lo indicamos en cada análisis.' },
  { icon: Award,    title: 'Actualización continua',    desc: 'Revisamos precios y disponibilidad semanalmente. Si un producto baja de precio o hay una versión mejor, actualizamos el artículo.' },
  { icon: Clock,    title: 'Contexto temporal',         desc: 'Cada análisis incluye la fecha de publicación y revisión. La tecnología cambia; nosotros también.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs crumbs={[{ label: 'Sobre nosotros' }]} />

      {/* Hero */}
      <section className="mt-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 text-balance">
          Análisis de tecnología sin concesiones
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Somos un equipo de entusiastas de la tecnología convencidos de que comprar un portátil, un móvil o unos auriculares no debería ser una apuesta. Creamos TechReview ES para ofrecer análisis técnicos honestos, sin presión de anunciantes ni compromisos editoriales.
        </p>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Nuestros principios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 card-shadow">
              <div className="shrink-0 w-10 h-10 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Cómo analizamos un producto</h2>
        <ol className="space-y-4">
          {[
            { step: '01', title: 'Compra o préstamo', desc: 'Adquirimos el producto al precio de mercado o lo recibimos en préstamo del fabricante. En ambos casos lo indicamos claramente.' },
            { step: '02', title: 'Uso intensivo (7-14 días)', desc: 'Lo usamos como usuario final: trabajo, gaming, viajes, exteriores. No solo en laboratorio.' },
            { step: '03', title: 'Medición técnica', desc: 'Benchmarks de CPU/GPU, colorimetría de pantalla, autonomía de batería bajo carga real, calidad de audio con herramientas especializadas.' },
            { step: '04', title: 'Puntuación por rúbrica', desc: 'Aplicamos nuestra rúbrica de 10 criterios ponderados. La nota final es un cálculo, no una impresión subjetiva.' },
            { step: '05', title: 'Publicación y actualización', desc: 'Publicamos el análisis completo con todos los datos. Lo actualizamos cuando cambia el precio o aparece competencia relevante.' },
          ].map((item) => (
            <li key={item.step} className="flex gap-5 items-start">
              <span className="shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-black">{item.step}</span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-3xl p-8 sm:p-10 text-center">
        <h2 className="text-2xl font-black text-white mb-2">Mantente al día</h2>
        <p className="text-brand-200 mb-6 text-sm">Reviews exclusivas, comparativas y guías directamente en tu email. Sin spam.</p>
        <NewsletterForm className="max-w-md mx-auto" />
      </section>
    </div>
  )
}
