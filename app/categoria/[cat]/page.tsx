import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReviewCard from '@/components/ReviewCard'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getReviewsByCategory } from '@/lib/mdx'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'

interface Props {
  params: { cat: string }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((cat) => ({ cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = CATEGORY_LABELS[params.cat as Category]
  if (!label) return {}
  return {
    title: `Mejores ${label} — Reviews y análisis`,
    description: `Análisis, comparativas y guías de compra de ${label.toLowerCase()}. Encuentra el mejor producto para ti.`,
  }
}

export default function CategoriaPage({ params }: Props) {
  const category = params.cat as Category
  const label = CATEGORY_LABELS[category]
  if (!label) notFound()

  const reviews = getReviewsByCategory(category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs crumbs={[{ label }]} />
      <div className="mt-8 mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">{label}</h1>
        <p className="text-gray-500">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} disponibles
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-semibold">Próximamente</p>
          <p className="text-sm mt-1">Estamos preparando análisis de {label.toLowerCase()}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => review && (
            <ReviewCard
              key={review.slug}
              frontmatter={review.frontmatter}
              slug={review.slug}
              readingTime={review.readingTime}
            />
          ))}
        </div>
      )}
    </div>
  )
}
