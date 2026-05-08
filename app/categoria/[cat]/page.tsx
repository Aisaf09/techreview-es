import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReviewCard from '@/components/ReviewCard'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getReviewsByCategory, getAllMejor } from '@/lib/mdx'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import Link from 'next/link'
import { Trophy } from 'lucide-react'

interface Props { params: { cat: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export async function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((cat) => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = CATEGORY_LABELS[params.cat as Category]
  if (!label) return {}
  const url = `${SITE_URL}/categoria/${params.cat}`
  return {
    title:       `Mejores ${label} — Análisis y comparativas`,
    description: `Reviews independientes de ${label.toLowerCase()}: análisis técnicos, comparativas y guías de compra actualizadas para elegir sin errores.`,
    alternates:  { canonical: url },
    openGraph:   { url, title: `${label} — TechReview ES` },
  }
}

export default function CategoriaPage({ params }: Props) {
  const category = params.cat as Category
  const label    = CATEGORY_LABELS[category]
  if (!label) notFound()

  const reviews = getReviewsByCategory(category)
  const mejorGuides = getAllMejor().filter((m) => m?.frontmatter.category === category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs crumbs={[{ label }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{label}</h1>
        <p className="text-gray-500">
          {reviews.length} {reviews.length === 1 ? 'análisis' : 'análisis'} disponibles
        </p>
      </div>

      {/* Buying guides for this category */}
      {mejorGuides.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" /> Guías de compra
          </h2>
          <div className="flex flex-wrap gap-3">
            {mejorGuides.map((g) => g && (
              <Link
                key={g.slug}
                href={`/mejor/${g.slug}`}
                className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 font-medium text-sm px-4 py-2 rounded-xl hover:bg-amber-100 transition-colors"
              >
                <Trophy size={14} /> {g.frontmatter.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-2xl mb-2">🔍</p>
          <p className="font-bold text-gray-700">Próximamente</p>
          <p className="text-sm text-gray-400 mt-1">Estamos preparando análisis de {label.toLowerCase()}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => review && (
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
      )}
    </div>
  )
}
