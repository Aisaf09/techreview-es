import Link from 'next/link'
import Image from 'next/image'
import StarRating from './StarRating'
import { CATEGORY_LABELS } from '@/types'
import type { ReviewFrontmatter } from '@/types'
import { Clock } from 'lucide-react'

interface ReviewCardProps {
  frontmatter: ReviewFrontmatter
  slug: string
  readingTime?: string
}

export default function ReviewCard({ frontmatter, slug, readingTime }: ReviewCardProps) {
  const minPrice = Math.min(...frontmatter.affiliateLinks.map((l) => l.price))

  return (
    <Link
      href={`/reviews/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {CATEGORY_LABELS[frontmatter.category]}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={frontmatter.rating} size="sm" />
          {readingTime && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} /> {readingTime}
            </span>
          )}
        </div>
        <h2 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
          {frontmatter.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-3">{frontmatter.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{frontmatter.brand}</span>
          <span className="font-bold text-brand-700 text-sm">
            Desde {minPrice.toLocaleString('es-ES')} {frontmatter.currency}
          </span>
        </div>
      </div>
    </Link>
  )
}
