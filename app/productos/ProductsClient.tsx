'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import type { CatalogProduct } from '@/lib/catalog'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import { cn } from '@/lib/utils'

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Destacados' },
  { value: 'rating',     label: 'Mejor valorados' },
  { value: 'price-asc',  label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest',     label: 'Más recientes' },
]

const PRICE_PRESETS = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: 'Hasta 200€', min: 0, max: 200 },
  { label: '200€ – 500€', min: 200, max: 500 },
  { label: '500€ – 1000€', min: 500, max: 1000 },
  { label: 'Más de 1000€', min: 1000, max: Infinity },
]

const PAGE_SIZE = 12

interface Props { products: CatalogProduct[] }

export default function ProductsClient({ products }: Props) {
  const [category, setCategory]   = useState<Category | 'all'>('all')
  const [sort,     setSort]       = useState('featured')
  const [priceIdx, setPriceIdx]   = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [page,     setPage]       = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)] as (Category | 'all')[]

  const filtered = useMemo(() => {
    const preset = PRICE_PRESETS[priceIdx]
    let list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (p.price < preset.min || p.price > preset.max) return false
      if (p.rating < minRating) return false
      return true
    })
    switch (sort) {
      case 'rating':     list = [...list].sort((a, b) => b.rating - a.rating); break
      case 'price-asc':  list = [...list].sort((a, b) => a.price - b.price); break
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break
      case 'newest':     list = [...list].sort((a, b) => b.year - a.year); break
      default:           list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break
    }
    return list
  }, [products, category, sort, priceIdx, minRating])

  const paged = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paged.length < filtered.length

  const resetFilters = () => {
    setCategory('all')
    setPriceIdx(0)
    setMinRating(0)
    setSort('featured')
    setPage(1)
  }

  const hasActiveFilters = category !== 'all' || priceIdx !== 0 || minRating > 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">Catálogo de productos</h1>
        <p className="text-gray-500 dark:text-gray-400">{filtered.length} productos encontrados</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setPage(1) }}
            className={cn(
              'shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border',
              category === cat
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400'
            )}
          >
            {cat === 'all' ? 'Todos' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors',
            showFilters
              ? 'bg-brand-50 dark:bg-brand-900/30 border-brand-300 text-brand-700 dark:text-brand-400'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
          )}
        >
          <SlidersHorizontal size={15} aria-hidden="true" /> Filtros
          {hasActiveFilters && (
            <span className="w-4 h-4 bg-brand-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">!</span>
          )}
        </button>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1) }}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={12} aria-hidden="true" /> Limpiar filtros
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Rango de precio</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => { setPriceIdx(i); setPage(1) }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                    priceIdx === i
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-brand-400'
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Valoración mínima</p>
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => { setMinRating(r); setPage(1) }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                    minRating === r
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-brand-400'
                  )}
                >
                  {r === 0 ? 'Cualquiera' : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
          <SlidersHorizontal size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" aria-hidden="true" />
          <p className="font-bold text-gray-700 dark:text-gray-300">Sin resultados</p>
          <p className="text-sm text-gray-400 mt-1">Prueba a cambiar los filtros.</p>
          <button onClick={resetFilters} className="mt-4 text-sm text-brand-600 dark:text-brand-400 hover:underline font-semibold">Limpiar filtros</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paged.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Cargar más productos
                <span className="text-xs text-gray-400">({filtered.length - paged.length} restantes)</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
