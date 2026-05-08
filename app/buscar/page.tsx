import type { Metadata } from 'next'
import { getAllSearchData } from '@/lib/search'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Buscador de reviews y comparativas',
  description: 'Busca entre todos nuestros análisis de portátiles, móviles, auriculares, tablets y monitores.',
  robots: { index: false },
}

export default function BuscarPage() {
  const data = getAllSearchData()
  return <SearchClient initialData={data} />
}
