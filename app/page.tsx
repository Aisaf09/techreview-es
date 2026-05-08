import Link from 'next/link'
import { ArrowRight, Shield, Zap, BarChart3, Star, Laptop, Smartphone, Headphones, Tablet, Monitor } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import { getLatestReviews, getFeaturedReviews, getAllReviews } from '@/lib/mdx'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import type { ReactNode } from 'react'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

const categoryMeta: Record<Category, { icon: ReactNode; desc: string; gradient: string }> = {
  portatiles:  { icon: <Laptop  size={28} className="text-white" aria-hidden="true" />, desc: 'Ultrabooks, gaming, profesional', gradient: 'from-blue-500 to-indigo-600' },
  moviles:     { icon: <Smartphone size={28} className="text-white" aria-hidden="true" />, desc: 'Flagship, gama media, cámaras',  gradient: 'from-violet-500 to-purple-700' },
  auriculares: { icon: <Headphones size={28} className="text-white" aria-hidden="true" />, desc: 'ANC, gaming, true wireless',      gradient: 'from-rose-500 to-pink-700' },
  tablets:     { icon: <Tablet  size={28} className="text-white" aria-hidden="true" />, desc: 'iPad, Android, productividad',    gradient: 'from-amber-500 to-orange-600' },
  monitores:   { icon: <Monitor  size={28} className="text-white" aria-hidden="true" />, desc: 'Gaming, 4K, OLED, curvo',        gradient: 'from-teal-500 to-cyan-700' },
}

export default function HomePage() {
  const latestReviews = getLatestReviews(6)
  const featured      = getFeaturedReviews(3)
  const allReviews    = getAllReviews()
  const totalCount    = allReviews.length

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-animated" style={{ backgroundSize: '400% 400%' }}>
        {/* Mesh overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoNHY0aDJWNjBoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">{totalCount} reviews publicadas · Actualizado semanalmente</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6 animate-fade-in-up text-balance">
              La tecnología que merece tu dinero,{' '}
              <span className="text-amber-300">analizada a fondo</span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-relaxed animate-fade-in-up animation-delay-100 max-w-xl">
              Reviews independientes, comparativas honestas y guías de compra para portátiles, móviles, auriculares, tablets y monitores.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up animation-delay-200">
              <Link
                href="/categoria/portatiles"
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Ver reviews <ArrowRight size={16} />
              </Link>
              <Link
                href="/mejor/portatiles-menos-500-euros"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/30"
              >
                Guías de compra
              </Link>
            </div>
          </div>

          {/* Floating stats */}
          <div className="absolute bottom-8 right-8 hidden lg:flex gap-4 animate-fade-in animation-delay-400">
            {[
              { label: 'Reviews', value: `${totalCount}+` },
              { label: 'Categorías', value: '5' },
              { label: 'Nota media', value: '4.5' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-5 py-3 text-center">
                <p className="text-white font-black text-xl">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Zap size={20} className="text-amber-500" />, title: 'Tests reales', desc: 'Medimos rendimiento, batería y pantalla con datos objetivos.' },
            { icon: <Shield size={20} className="text-green-500" />, title: 'Sin patrocinios', desc: 'Ningún fabricante influye en nuestras puntuaciones.' },
            { icon: <BarChart3 size={20} className="text-brand-500" />, title: 'Comparativas claras', desc: 'Tablas lado a lado para decidir sin errores.' },
          ].map((item, i) => (
            <div
              key={i}
              className={`reveal bg-white dark:bg-gray-800 rounded-2xl p-5 card-shadow flex gap-4 items-start animation-delay-${i * 100}`}
            >
              <div className="shrink-0 w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-1">Explorar</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Por categoría</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const meta = categoryMeta[cat]
            const count = allReviews.filter((r) => r?.frontmatter.category === cat).length
            return (
              <Link
                key={cat}
                href={`/categoria/${cat}`}
                className={`reveal group relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br ${meta.gradient} animation-delay-${i * 100} hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="relative">
                  <div className="mb-3">{meta.icon}</div>
                  <p className="font-black text-white text-sm">{CATEGORY_LABELS[cat]}</p>
                  <p className="text-white/70 text-xs mt-0.5">{meta.desc}</p>
                  {count > 0 && (
                    <span className="mt-3 inline-block bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {count} {count === 1 ? 'análisis' : 'análisis'}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── LATEST REVIEWS ─────────────────────────────────── */}
      {latestReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-1">Recientes</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Últimas reviews</h2>
            </div>
            <Link
              href="/categoria/portatiles"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
            >
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestReviews.map((review, i) => review && (
              <div key={review.slug} className={`reveal animation-delay-${(i % 3) * 100}`}>
                <ReviewCard
                  frontmatter={review.frontmatter}
                  slug={review.slug}
                  readingTime={review.readingTime}
                  priority={i < 3}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURED PICKS ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-gradient-to-br from-gray-950 to-brand-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Selección editorial</p>
                </div>
                <h2 className="text-3xl font-black text-white">Los más recomendados</h2>
                <p className="text-gray-400 mt-1">Productos que han superado nuestros tests con nota alta</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((review, i) => review && (
                <div key={review.slug} className={`reveal animation-delay-${i * 100}`}>
                  <ReviewCard
                    frontmatter={review.frontmatter}
                    slug={review.slug}
                    readingTime={review.readingTime}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST SECTION ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl card-shadow p-8 sm:p-12 text-center reveal">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <Shield size={14} /> Metodología transparente
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 text-balance">
            ¿Cómo hacemos nuestras reviews?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Cada producto pasa por un protocolo de pruebas de al menos una semana. Medimos rendimiento con benchmarks estandarizados, autonomía en uso real, calidad de pantalla con colorímetro, y ergonomía en uso diario. Nunca aceptamos dinero de fabricantes a cambio de opiniones positivas.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { value: '7+ días', label: 'Tiempo de prueba' },
              { value: '20+ tests', label: 'Por producto' },
              { value: '0€', label: 'De fabricantes' },
              { value: '100%', label: 'Opinión propia' },
            ].map((item) => (
              <div key={item.label} className="px-6">
                <p className="text-2xl font-black text-brand-700 mb-1">{item.value}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
