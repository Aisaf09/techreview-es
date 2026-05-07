import Link from 'next/link'
import { ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import { getLatestReviews, getFeaturedReviews } from '@/lib/mdx'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

const categoryIcons: Record<Category, string> = {
  portatiles: '💻',
  moviles: '📱',
  auriculares: '🎧',
  tablets: '📋',
  monitores: '🖥️',
}

export default function HomePage() {
  const latestReviews = getLatestReviews(6)
  const featured = getFeaturedReviews(3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Reviews 100% independientes
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-5 text-balance">
              La tecnología que merece tu dinero, analizada a fondo
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Análisis exhaustivos, comparativas honestas y guías de compra de portátiles, móviles, auriculares, tablets y monitores.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categoria/portatiles"
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Ver reviews <ArrowRight size={16} />
              </Link>
              <Link
                href="/comparativas"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Comparativas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <Zap size={22} className="text-brand-500" />, title: 'Análisis en profundidad', desc: 'Tests reales de rendimiento, batería y pantalla.' },
            { icon: <Shield size={22} className="text-green-500" />, title: 'Independencia editorial', desc: 'Ningún fabricante influye en nuestras puntuaciones.' },
            { icon: <BarChart3 size={22} className="text-purple-500" />, title: 'Comparativas detalladas', desc: 'Tablas y gráficos para elegir sin errores.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Explorar por categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <span className="text-3xl">{categoryIcons[cat]}</span>
              <span className="font-semibold text-gray-700 text-sm group-hover:text-brand-600 transition-colors">
                {CATEGORY_LABELS[cat]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest reviews */}
      {latestReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">Últimas reviews</h2>
            <Link href="/categoria/portatiles" className="text-sm text-brand-600 hover:underline font-medium flex items-center gap-1">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestReviews.map((review) => review && (
              <ReviewCard
                key={review.slug}
                frontmatter={review.frontmatter}
                slug={review.slug}
                readingTime={review.readingTime}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured picks */}
      {featured.length > 0 && (
        <section className="bg-brand-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-white mb-2">Selección destacada</h2>
            <p className="text-blue-200 mb-8 text-sm">Los productos que más nos han convencido</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((review) => review && (
                <ReviewCard
                  key={review.slug}
                  frontmatter={review.frontmatter}
                  slug={review.slug}
                  readingTime={review.readingTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
