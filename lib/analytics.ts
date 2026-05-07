'use client'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackAffiliateClick(store: string, productName: string, price: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: `${store} - ${productName}`,
      value: price,
      store,
      product_name: productName,
    })
  }
}
