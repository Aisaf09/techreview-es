import type { AffiliateLink } from '@/types'

export const AMAZON_TAG   = process.env.NEXT_PUBLIC_AMAZON_TAG          || 'techreviewes-21'
export const PCC_REF      = process.env.NEXT_PUBLIC_PCCOMPONENTES_REF   || ''
export const AWIN_MID     = process.env.NEXT_PUBLIC_AWIN_MEDIAMARKT_MID || ''
export const AWIN_AFFID   = process.env.NEXT_PUBLIC_AWIN_AFFID          || ''

export const STORE_CONFIG = {
  amazon: {
    label:    'Amazon',
    color:    'bg-amber-400 hover:bg-amber-500 text-gray-900',
    rowBg:    'bg-amber-50/60 dark:bg-amber-900/10',
  },
  pccomponentes: {
    label:    'PcComponentes',
    color:    'bg-[#E84B4B] hover:bg-[#d43b3b] text-white',
    rowBg:    'bg-red-50/40 dark:bg-red-900/10',
  },
  mediamarkt: {
    label:    'MediaMarkt',
    color:    'bg-[#CC071E] hover:bg-[#b00619] text-white',
    rowBg:    'bg-rose-50/40 dark:bg-rose-900/10',
  },
  fnac: {
    label:    'Fnac',
    color:    'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
    rowBg:    'bg-yellow-50/40 dark:bg-yellow-900/10',
  },
} satisfies Record<AffiliateLink['store'], { label: string; color: string; rowBg: string }>

export function buildAffiliateUrl(link: AffiliateLink): string {
  try {
    switch (link.store) {
      case 'amazon':        return addParam(link.url, 'tag', AMAZON_TAG)
      case 'pccomponentes': return PCC_REF   ? addParam(link.url, 'ref', PCC_REF) : link.url
      case 'mediamarkt':    return buildAwinUrl(link.url)
      default:              return link.url
    }
  } catch {
    return link.url
  }
}

function addParam(url: string, key: string, value: string): string {
  const u = new URL(url)
  u.searchParams.set(key, value)
  return u.toString()
}

function buildAwinUrl(destination: string): string {
  if (!AWIN_MID || !AWIN_AFFID) return destination
  return `https://www.awin1.com/cread.php?awinmid=${AWIN_MID}&awinaffid=${AWIN_AFFID}&ued=${encodeURIComponent(destination)}`
}

/** Returns the store with the lowest price */
export function cheapestLink(links: AffiliateLink[]): AffiliateLink | null {
  if (!links.length) return null
  return links.reduce((a, b) => a.price <= b.price ? a : b)
}
