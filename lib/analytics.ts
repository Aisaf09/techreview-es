'use client'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function fire(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

export function trackAffiliateClick(store: string, productName: string, price: number) {
  fire('event', 'affiliate_click', {
    event_category: 'affiliate',
    event_label: `${store} - ${productName}`,
    value: price,
    store,
    product_name: productName,
  })
}

export function trackSearch(query: string) {
  if (!query.trim()) return
  fire('event', 'search_query', { search_term: query })
}

export function trackScrollDepth(percent: 50 | 100) {
  fire('event', `scroll_depth_${percent}`, {
    event_category: 'engagement',
    value: percent,
  })
}
