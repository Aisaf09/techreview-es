'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Star, BookOpen, Trophy } from 'lucide-react'
import type { SearchResult } from '@/lib/search'
import { cn } from '@/lib/utils'

const TYPE_META = {
  review:      { label: 'Review',      icon: <Star size={13} />,     color: 'bg-brand-100 text-brand-700' },
  comparativa: { label: 'Comparativa', icon: <BookOpen size={13} />, color: 'bg-purple-100 text-purple-700' },
  mejor:       { label: 'Guía',        icon: <Trophy size={13} />,   color: 'bg-amber-100 text-amber-700' },
}

export default function SearchClient({ initialData }: { initialData: SearchResult[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'review' | 'comparativa' | 'mejor'>('all')

  const results = useMemo(() => {
    let data = initialData
    if (filter !== 'all') data = data.filter((r) => r.type === filter)
    if (!query.trim()) return data

    const q = query.toLowerCase()
    return data.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.categoryLabel?.toLowerCase().includes(q)
    )
  }, [query, filter, initialData])

  const counts = useMemo(() => ({
    all:        initialData.length,
    review:     initialData.filter((r) => r.type === 'review').length,
    comparativa:initialData.filter((r) => r.type === 'comparativa').length,
    mejor:      initialData.filter((r) => r.type === 'mejor').length,
  }), [initialData])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Buscador</h1>
      <p className="text-gray-500 mb-8">{initialData.length} análisis disponibles</p>

      {/* Search input */}
      <div className="relative mb-5">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Busca un producto, marca o categoría..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-base border border-gray-200 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
          autoFocus
          aria-label="Buscar análisis"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'review', 'comparativa', 'mejor'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors border',
              filter === t
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-600'
            )}
          >
            {t === 'all' ? 'Todo' : TYPE_META[t].label} ({counts[t]})
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-25" />
          <p className="font-semibold text-gray-500">Sin resultados para &ldquo;{query}&rdquo;</p>
          <p className="text-sm mt-1">Prueba con otro término o usa los filtros.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => {
            const meta = TYPE_META[r.type]
            return (
              <li key={`${r.type}-${r.slug}`}>
                <Link
                  href={r.href}
                  className="group flex gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-card transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={cn('flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full', meta.color)}>
                        {meta.icon} {meta.label}
                      </span>
                      {r.categoryLabel && (
                        <span className="text-xs text-gray-400">{r.categoryLabel}</span>
                      )}
                      {r.rating && (
                        <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                          ★ {r.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {r.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{r.description}</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-brand-500 transition-colors self-center shrink-0 text-xl">
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
