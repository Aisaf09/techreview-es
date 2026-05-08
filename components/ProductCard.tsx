import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink, Tag } from 'lucide-react'
import type { CatalogProduct } from '@/lib/catalog'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

const BADGE_STYLES: Record<string, string> = {
  'Recomendado': 'badge-best',
  'Oferta':      'badge-sale',
  'Nuevo':       'badge-new',
  'Mejor valor': 'badge-best',
  'Gaming':      'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Premium':     'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
}

interface ProductCardProps {
  product: CatalogProduct
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const cardContent = (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-700 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-gray-700">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', BADGE_STYLES[product.badge] ?? 'badge-best')}>
              {product.badge}
            </span>
          )}
          {discount && discount > 5 && (
            <span className="badge-sale text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        {/* Rating */}
        <span className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
          <Star size={9} className="fill-amber-400" aria-hidden="true" /> {product.rating.toFixed(1)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-0.5">{product.brand}</p>
        <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {product.shortName ?? product.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-3">{product.description}</p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="font-black text-brand-700 dark:text-brand-400 text-base leading-none">
              {formatPrice(product.price, product.currency)}
            </p>
            {product.originalPrice && (
              <p className="text-[11px] text-gray-400 line-through mt-0.5">{formatPrice(product.originalPrice, product.currency)}</p>
            )}
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Ver ${product.shortName ?? product.name} en ${product.store}`}
            className="shrink-0 flex items-center gap-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Tag size={11} aria-hidden="true" /> Ver precio
          </a>
        </div>

        {product.reviewSlug && (
          <Link
            href={`/reviews/${product.reviewSlug}`}
            className="mt-2 flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            <ExternalLink size={10} aria-hidden="true" /> Leer análisis completo
          </Link>
        )}
      </div>
    </div>
  )

  return cardContent
}
