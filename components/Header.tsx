'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, Menu, X, Cpu, ChevronDown } from 'lucide-react'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import { cn } from '@/lib/utils'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

const categoryIcons: Record<Category, string> = {
  portatiles: '💻',
  moviles:    '📱',
  auriculares:'🎧',
  tablets:    '📋',
  monitores:  '🖥️',
}

export default function Header() {
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [catOpen,     setCatOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCatOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/60 shadow-sm'
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow">
              <Cpu size={16} className="text-white" />
            </div>
            <span className="font-black text-lg text-gray-900">
              TechReview<span className="text-brand-600">ES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                catOpen ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}>
                Categorías <ChevronDown size={14} className={cn('transition-transform', catOpen && 'rotate-180')} />
              </button>

              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-card border border-gray-100 py-2 animate-scale-in">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categoria/${cat}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      <span className="text-base">{categoryIcons[cat]}</span>
                      {CATEGORY_LABELS[cat]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { href: '/categoria/portatiles', label: 'Portátiles' },
              { href: '/comparativas/iphone-vs-samsung', label: 'Comparativas' },
              { href: '/mejor/portatiles-menos-500-euros', label: 'Guías' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/buscar"
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <Search size={15} />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'
        )}
      >
        <div className="bg-white px-4 py-4 space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Categorías</p>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              <span>{categoryIcons[cat]}</span>
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2" />
          <Link href="/buscar" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-50">
            <Search size={16} /> Buscar
          </Link>
        </div>
      </div>
    </header>
  )
}
