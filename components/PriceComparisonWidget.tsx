'use client'

import { useRef, useState, useEffect } from 'react'
import { ShoppingCart, ExternalLink, TrendingDown, Users, AlertCircle } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'
import { buildAffiliateUrl, cheapestLink, STORE_CONFIG } from '@/lib/affiliate'
import type { AffiliateLink } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  productName: string
  links: AffiliateLink[]
  weeklyBuyers?: number
  stockUrgency?: string
  lastUpdated?: string
  className?: string
}

export default function PriceComparisonWidget({
  productName, links, weeklyBuyers, stockUrgency, lastUpdated, className,
}: Props) {
  const widgetRef  = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)
  const best = cheapestLink(links)

  useEffect(() => {
    const el = widgetRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleClick = (link: AffiliateLink) =>
    trackAffiliateClick(link.store, productName, link.price)

  return (
    <>
      <div
        ref={widgetRef}
        className={cn('rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800', className)}
      >
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2">
            <ShoppingCart size={14} aria-hidden="true" /> Dónde comprar
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {weeklyBuyers && weeklyBuyers > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full">
                <Users size={10} aria-hidden="true" /> {weeklyBuyers} comprados esta semana
              </span>
            )}
            {stockUrgency && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 rounded-full">
                <AlertCircle size={10} aria-hidden="true" /> {stockUrgency}
              </span>
            )}
          </div>
        </div>

        {/* Store rows */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
          {links.map((link, i) => {
            const cfg         = STORE_CONFIG[link.store]
            const isBest      = best?.store === link.store && best?.price === link.price
            const url         = buildAffiliateUrl(link)

            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 px-5 py-3.5 transition-colors',
                  isBest ? 'bg-green-50/70 dark:bg-green-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                )}
              >
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm w-28 shrink-0 truncate">
                  {cfg.label}
                </span>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-black text-brand-700 dark:text-brand-400 text-base">
                    {link.price.toLocaleString('es-ES')} {link.currency}
                  </span>
                  {isBest && (
                    <span className="hidden sm:flex items-center gap-1 text-[10px] font-black text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                      <TrendingDown size={9} aria-hidden="true" /> Mejor precio
                    </span>
                  )}
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  onClick={() => handleClick(link)}
                  aria-label={`Ver ${productName} en ${cfg.label} por ${link.price.toLocaleString('es-ES')} ${link.currency}`}
                  className={cn(
                    'shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-colors',
                    cfg.color
                  )}
                >
                  Ver oferta <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Precios orientativos. Actualizado:{' '}
            {lastUpdated ?? new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}.
            {' '}Como Asociado de Amazon, obtenemos ingresos por compras a través de nuestros enlaces.
          </p>
        </div>
      </div>

      {/* Sticky bar — aparece al hacer scroll más allá del widget */}
      {sticky && best && (
        <div
          role="complementary"
          aria-label="Ver mejor precio"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <ShoppingCart size={16} className="text-brand-600 dark:text-brand-400 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-black text-gray-900 dark:text-white text-sm truncate">{productName}</p>
                <p className="text-brand-700 dark:text-brand-400 font-bold text-xs">
                  Desde {best.price.toLocaleString('es-ES')} {best.currency} en {STORE_CONFIG[best.store].label}
                </p>
              </div>
            </div>
            <a
              href={buildAffiliateUrl(best)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              onClick={() => handleClick(best)}
              className="shrink-0 bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5"
            >
              Ver mejor precio <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
