import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/catalog'
import ProductsClient from './ProductsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export const metadata: Metadata = {
  title: 'Catálogo de productos — Portátiles, móviles, auriculares y más',
  description: 'Explora nuestro catálogo de más de 50 productos con precios, valoraciones y análisis detallados. Filtra por categoría, precio y valoración.',
  alternates: { canonical: `${SITE_URL}/productos` },
  openGraph: { url: `${SITE_URL}/productos` },
}

export default function ProductosPage() {
  const products = getAllProducts()
  return <ProductsClient products={products} />
}
