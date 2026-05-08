'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth } from '@/lib/analytics'

export default function AnalyticsClient() {
  const pathname = usePathname()
  const fired50  = useRef(false)
  const fired100 = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
    fired50.current  = false
    fired100.current = false
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total    = document.documentElement.scrollHeight
      const pct      = scrolled / total

      if (!fired50.current && pct >= 0.5) {
        fired50.current = true
        trackScrollDepth(50)
      }
      if (!fired100.current && pct >= 0.95) {
        fired100.current = true
        trackScrollDepth(100)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
