'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm({ className }: { className?: string }) {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error,  setError]  = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, introduce un email válido.')
      return
    }
    setError('')
    setStatus('loading')
    // Simulated submission — wire up to real API (Mailchimp, ConvertKit, etc.)
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl px-5 py-4 ${className ?? ''}`}>
        <CheckCircle size={20} className="text-green-500 shrink-0" aria-hidden="true" />
        <p className="text-green-800 dark:text-green-300 font-semibold text-sm">
          ¡Suscrito! Recibirás nuestras próximas reviews en tu bandeja de entrada.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
        >
          {status === 'loading' ? (
            <Loader size={15} className="animate-spin" aria-hidden="true" />
          ) : null}
          Suscribirme
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs mt-2">
          <AlertCircle size={12} aria-hidden="true" /> {error}
        </p>
      )}
    </form>
  )
}
