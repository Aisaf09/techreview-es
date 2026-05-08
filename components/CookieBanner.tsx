'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

const CONSENT_KEY = 'techreview-cookie-consent'

function updateGtagConsent(granted: boolean) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage:        granted ? 'granted' : 'denied',
    })
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    } else {
      updateGtagConsent(stored === 'accepted')
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    updateGtagConsent(true)
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    updateGtagConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <Cookie size={22} className="text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Usamos cookies</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Utilizamos cookies propias y de terceros (Google Analytics) para analizar el tráfico y mejorar la experiencia. Puedes aceptarlas o rechazarlas. Más información en nuestra{' '}
              <Link href="/privacidad" className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:no-underline">
                política de privacidad
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 justify-end">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl transition-colors"
          >
            Solo esenciales
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
