import Link from 'next/link'
import Image from 'next/image'
import StarRating from './StarRating'
import { CATEGORY_LABELS } from '@/types'
import type { ReviewFrontmatter } from '@/types'
import { Clock, ArrowRight, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ReviewCardProps {
  frontmatter: ReviewFrontmatter
  slug: string
  readingTime?: string
  priority?: boolean
}

export default function ReviewCard({ frontmatter, slug, readingTime, priority = false }: ReviewCardProps) {
  const minPrice = Math.min(...frontmatter.affiliateLinks.map((l) => l.price))

  return (
    <Link
      href={`/reviews/${slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-gray-800 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={frontmatter.image}
          alt={`Review ${frontmatter.brand} ${frontmatter.model} — ${frontmatter.title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-brand-700 dark:text-brand-400 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {CATEGORY_LABELS[frontmatter.category]}
        </span>
        {/* Rating overlay */}
        <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-amber-400 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star size={10} className="fill-amber-400" aria-hidden="true" /> {frontmatter.rating.toFixed(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{frontmatter.brand}</span>
          {readingTime && (
            <>
              <span className="text-gray-200">·</span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} /> {readingTime}
              </span>
            </>
          )}
        </div>

        <h2 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
          {frontmatter.title}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-4">
          {frontmatter.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Desde</p>
            <p className="font-black text-brand-700 dark:text-brand-400 text-sm">{formatPrice(minPrice)}</p>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
            Ver análisis <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}
