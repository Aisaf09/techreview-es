import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllSearchData } from '@/lib/search'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Buscador de reviews y comparativas',
  description: 'Busca entre todos nuestros análisis de portátiles, móviles, auriculares, tablets y monitores.',
  robots: { index: false },
}

export default function BuscarPage() {
  const data = getAllSearchData()
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-12 text-gray-400">Cargando buscador…</div>}>
      <SearchClient initialData={data} />
    </Suspense>
  )
}
