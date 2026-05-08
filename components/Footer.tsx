import Link from 'next/link'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'
import { Cpu } from 'lucide-react'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <Cpu size={16} className="text-white" />
              </div>
              <span className="font-black text-lg text-white">
                TechReview<span className="text-brand-400">ES</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-5">
              Análisis independientes, comparativas honestas y guías de compra para ayudarte a elegir la mejor tecnología al mejor precio.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'X', href: 'https://twitter.com/techreviewes', char: '𝕏' },
                { label: 'YouTube', href: '#', char: '▶' },
                { label: 'Instagram', href: '#', char: '◉' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-9 h-9 bg-gray-800 hover:bg-brand-700 rounded-lg flex items-center justify-center transition-colors text-sm font-bold"
                >
                  {s.char}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Categorías</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categoria/${cat}`}
                    className="text-sm hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Contenido</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/categoria/portatiles', label: 'Últimas reviews' },
                { href: '/comparativas/iphone-vs-samsung', label: 'Comparativas' },
                { href: '/mejor/portatiles-menos-500-euros', label: 'Guías de compra' },
                { href: '/buscar', label: 'Buscador' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} TechReview ES. Todos los derechos reservados.</p>
          <p className="text-center">
            Participamos en programas de afiliación de Amazon y otras tiendas. Los precios son orientativos y pueden variar.
          </p>
        </div>
      </div>
    </footer>
  )
}
