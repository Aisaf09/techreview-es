'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { CATEGORY_LABELS } from '@/types'

// Static data passed via server component would be better but this works for demo
const placeholderResults = [
  { title: 'MacBook Air M3', slug: 'macbook-air-m3', category: 'portatiles', description: 'El portátil ultradelgado de Apple con chip M3.' },
  { title: 'iPhone 15 Pro', slug: 'iphone-15-pro', category: 'moviles', description: 'El smartphone más avanzado de Apple en 2024.' },
  { title: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', category: 'auriculares', description: 'Auriculares con cancelación de ruido líderes del mercado.' },
]

export default function BuscarPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return placeholderResults.filter(
      (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Buscar reviews</h1>

      <div className="relative mb-8">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Busca un producto, marca o categoría..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          autoFocus
        />
      </div>

      {query && results.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No hemos encontrado resultados para <strong>{query}</strong>.
        </p>
      )}

      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/reviews/${r.slug}`}
                className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wide">
                      {CATEGORY_LABELS[r.category as keyof typeof CATEGORY_LABELS]}
                    </span>
                    <h2 className="font-bold text-gray-900 mt-0.5">{r.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{r.description}</p>
                  </div>
                  <span className="text-brand-500 shrink-0">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!query && (
        <div className="text-center py-12 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p>Empieza a escribir para buscar...</p>
        </div>
      )}
    </div>
  )
}
