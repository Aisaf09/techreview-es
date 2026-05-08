import Link from 'next/link'
import { ArrowLeft, Search, Laptop, Smartphone, Headphones } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* 404 art */}
      <div className="relative mb-8">
        <p className="text-[120px] sm:text-[160px] font-black text-gray-100 dark:text-gray-800 leading-none select-none" aria-hidden="true">404</p>
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          <Laptop    size={32} className="text-brand-400 animate-float" style={{ animationDelay: '0ms' }}   aria-hidden="true" />
          <Smartphone size={28} className="text-violet-400 animate-float" style={{ animationDelay: '300ms' }} aria-hidden="true" />
          <Headphones size={30} className="text-rose-400 animate-float"   style={{ animationDelay: '600ms' }} aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
        Página no encontrada
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
        Esta página no existe o ha sido movida. Prueba a buscar lo que necesitas o navega a una de nuestras secciones.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Inicio
        </Link>
        <Link
          href="/buscar"
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-5 py-2.5 rounded-xl hover:border-brand-400 transition-colors text-sm"
        >
          <Search size={15} aria-hidden="true" /> Buscador
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { href: '/categoria/portatiles', label: 'Portátiles' },
          { href: '/categoria/moviles',    label: 'Móviles' },
          { href: '/categoria/auriculares', label: 'Auriculares' },
          { href: '/categoria/tablets',    label: 'Tablets' },
          { href: '/categoria/monitores',  label: 'Monitores' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
