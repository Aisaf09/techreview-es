'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, Cpu, ChevronDown, Laptop, Smartphone, Headphones, Tablet, Monitor } from 'lucide-react'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

const categoryIcons: Record<Category, ReactNode> = {
  portatiles:  <Laptop     size={16} aria-hidden="true" />,
  moviles:     <Smartphone size={16} aria-hidden="true" />,
  auriculares: <Headphones size={16} aria-hidden="true" />,
  tablets:     <Tablet     size={16} aria-hidden="true" />,
  monitores:   <Monitor    size={16} aria-hidden="true" />,
}

export default function Header() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [catOpen,      setCatOpen]      = useState(false)
  const [searchOpen,   setSearchOpen]   = useState(false)
  const [searchQuery,  setSearchQuery]  = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router   = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      router.push(`/buscar?q=${encodeURIComponent(q)}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

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
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm'
          : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow">
              <Cpu size={16} className="text-white" />
            </div>
            <span className="font-black text-lg text-gray-900 dark:text-white">
              TechReview<span className="text-brand-600 dark:text-brand-400">ES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                catOpen ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              )}>
                Categorías <ChevronDown size={14} className={cn('transition-transform', catOpen && 'rotate-180')} />
              </button>

              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700 border border-gray-100 py-2 animate-scale-in">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categoria/${cat}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
                    >
                      <span className="text-brand-500">{categoryIcons[cat]}</span>
                      {CATEGORY_LABELS[cat]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { href: '/productos', label: 'Productos' },
              { href: '/comparativas/iphone-vs-samsung', label: 'Comparativas' },
              { href: '/mejor/portatiles-menos-500-euros', label: 'Guías' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
              >
                {item.label}
              </Link>
            ))}

            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-1 ml-2">
                <input
                  ref={searchInputRef}
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false) }}
                  onKeyDown={(e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') } }}
                  placeholder="Buscar..."
                  aria-label="Buscar en TechReview ES"
                  className="w-44 pl-3 pr-2 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button type="submit" aria-label="Buscar" className="p-1.5 text-brand-600 dark:text-brand-400">
                  <Search size={15} aria-hidden="true" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Abrir buscador"
                className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
              >
                <Search size={15} aria-hidden="true" />
              </button>
            )}

            <ThemeToggle />
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
        <div className="bg-white dark:bg-gray-900 px-4 py-4 space-y-1">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">Categorías</p>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
            >
              <span className="text-brand-500">{categoryIcons[cat]}</span>
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
          <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
          <Link href="/buscar" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <Search size={16} aria-hidden="true" /> Buscar
          </Link>
        </div>
      </div>
    </header>
  )
}
