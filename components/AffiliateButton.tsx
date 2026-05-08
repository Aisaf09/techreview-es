'use client'

import { ExternalLink, ShoppingCart } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'
import { buildAffiliateUrl, STORE_CONFIG } from '@/lib/affiliate'
import type { AffiliateLink } from '@/types'

interface AffiliateButtonProps {
  link: AffiliateLink
  productName: string
}

export default function AffiliateButton({ link, productName }: AffiliateButtonProps) {
  const cfg = STORE_CONFIG[link.store]
  const url = buildAffiliateUrl(link)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      onClick={() => trackAffiliateClick(link.store, productName, link.price)}
      aria-label={`Ver ${productName} en ${cfg.label} por ${link.price.toLocaleString('es-ES')} ${link.currency}`}
      className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl font-semibold transition-colors ${cfg.color}`}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart size={16} aria-hidden="true" />
        Ver oferta en {cfg.label}
      </span>
      <span className="flex items-center gap-1">
        {link.price.toLocaleString('es-ES')} {link.currency}
        <ExternalLink size={14} aria-hidden="true" />
      </span>
    </a>
  )
}

export function AffiliateButtonGroup({ links, productName }: { links: AffiliateLink[]; productName: string }) {
  return (
    <div className="my-6 space-y-3">
      {links.map((link, i) => (
        <AffiliateButton key={i} link={link} productName={productName} />
      ))}
      <p className="text-xs text-gray-400 text-center mt-2">
        Precio orientativo. Puede variar en el momento de la compra.
        Como Asociado de Amazon, obtenemos ingresos por las compras a través de nuestros enlaces.
      </p>
    </div>
  )
}
