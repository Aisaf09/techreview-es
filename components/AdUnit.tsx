'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
}

export default function AdUnit({ slot, format = 'auto', className }: AdUnitProps) {
  const ref         = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const clientId    = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (!clientId || initialized.current || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !initialized.current) {
          initialized.current = true
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
          } catch { /* ignore duplicate push errors */ }
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [clientId])

  if (!clientId) return null

  return (
    <div ref={ref} className={className} aria-label="Publicidad" role="complementary">
      <ins
        className="adsbygoogle block"
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
