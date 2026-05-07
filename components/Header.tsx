'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, Cpu } from 'lucide-react'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-brand-700">
            <Cpu size={24} className="text-brand-500" />
            TechReview<span className="text-brand-500"> ES</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categoria/${cat}`}
                className="text-sm text-gray-600 hover:text-brand-600 transition-colors font-medium"
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
            <Link href="/buscar" className="text-gray-500 hover:text-brand-600 transition-colors">
              <Search size={18} />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-brand-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categoria/${cat}`}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-brand-600 py-1"
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
          <Link href="/buscar" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-600 py-1">
            <Search size={16} /> Buscar
          </Link>
        </div>
      )}
    </header>
  )
}
