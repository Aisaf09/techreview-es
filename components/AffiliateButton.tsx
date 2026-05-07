'use client'

import { ExternalLink, ShoppingCart } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'
import type { AffiliateLink } from '@/types'
import { STORE_LABELS } from '@/types'

interface AffiliateButtonProps {
  link: AffiliateLink
  productName: string
}

const storeColors: Record<AffiliateLink['store'], string> = {
  amazon: 'bg-amber-400 hover:bg-amber-500 text-gray-900',
  pccomponentes: 'bg-blue-600 hover:bg-blue-700 text-white',
  mediamarkt: 'bg-red-600 hover:bg-red-700 text-white',
  fnac: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
}

export default function AffiliateButton({ link, productName }: AffiliateButtonProps) {
  const handleClick = () => {
    trackAffiliateClick(link.store, productName, link.price)
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl font-semibold transition-colors ${storeColors[link.store]}`}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart size={16} />
        Ver oferta en {STORE_LABELS[link.store]}
      </span>
      <span className="flex items-center gap-1">
        {link.price.toLocaleString('es-ES')} {link.currency}
        <ExternalLink size={14} />
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
      </p>
    </div>
  )
}
