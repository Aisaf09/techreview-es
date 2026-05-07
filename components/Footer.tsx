import Link from 'next/link'
import { Cpu } from 'lucide-react'
import { CATEGORY_LABELS } from '@/types'
import type { Category } from '@/types'

const categories = Object.keys(CATEGORY_LABELS) as Category[]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-black text-xl text-white mb-3">
              <Cpu size={22} className="text-brand-400" />
              TechReview ES
            </Link>
            <p className="text-sm leading-relaxed">
              Análisis independientes, comparativas honestas y guías de compra para ayudarte a elegir la mejor tecnología.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href={`/categoria/${cat}`} className="text-sm hover:text-white transition-colors">
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contenido</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/reviews" className="hover:text-white transition-colors">Últimas reviews</Link></li>
              <li><Link href="/comparativas" className="hover:text-white transition-colors">Comparativas</Link></li>
              <li><Link href="/mejor" className="hover:text-white transition-colors">Mejores productos</Link></li>
              <li><Link href="/buscar" className="hover:text-white transition-colors">Buscador</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} TechReview ES. Todos los derechos reservados.</p>
          <p>
            Este sitio participa en programas de afiliación. Los precios mostrados son orientativos y pueden variar.
          </p>
        </div>
      </div>
    </footer>
  )
}
