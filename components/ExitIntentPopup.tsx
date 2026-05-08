'use client'

import { useState, useEffect } from 'react'
import { X, TrendingDown } from 'lucide-react'
import { buildAffiliateUrl, cheapestLink, STORE_CONFIG } from '@/lib/affiliate'
import { trackAffiliateClick } from '@/lib/analytics'
import type { AffiliateLink } from '@/types'

interface Props {
  productName: string
  links: AffiliateLink[]
}

const SESSION_KEY = 'exit-intent-shown'

export default function ExitIntentPopup({ productName, links }: Props) {
  const [open, setOpen] = useState(false)
  const best = cheapestLink(links)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let timer: ReturnType<typeof setTimeout>

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        clearTimeout(timer)
        sessionStorage.setItem(SESSION_KEY, '1')
        setOpen(true)
        document.removeEventListener('mouseleave', onLeave)
      }
    }

    // Activate after 8s so it doesn't fire immediately
    timer = setTimeout(() => {
      document.addEventListener('mouseleave', onLeave)
    }, 8000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!open || !best) return null

  const url = buildAffiliateUrl(best)
  const cfg = STORE_CONFIG[best.store]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Oferta antes de irte"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 max-w-md w-full p-7 relative">
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl" aria-hidden="true">💡</span>
          <p className="font-black text-gray-900 dark:text-white text-lg leading-snug">
            ¿Te vas sin ver el mejor precio?
          </p>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
          Hemos encontrado <strong className="text-gray-900 dark:text-white">{productName}</strong> al mejor precio disponible ahora mismo.
        </p>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-0.5 flex items-center gap-1">
              <TrendingDown size={12} aria-hidden="true" /> Mejor precio en {cfg.label}
            </p>
            <p className="font-black text-2xl text-green-800 dark:text-green-300">
              {best.price.toLocaleString('es-ES')} {best.currency}
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            onClick={() => {
              trackAffiliateClick(best.store, productName, best.price)
              setOpen(false)
            }}
            className={`flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-sm transition-colors ${cfg.color}`}
          >
            Ver oferta
          </a>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          No me interesa
        </button>
      </div>
    </div>
  )
}
