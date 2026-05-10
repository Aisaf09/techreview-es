import type { MetadataRoute } from 'next'
import { getAllReviews, getAllComparativas, getAllMejor } from '@/lib/mdx'
import { CATEGORY_LABELS } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export default function sitemap(): MetadataRoute.Sitemap {
  const reviews = getAllReviews().map((r) => ({
    url: `${SITE_URL}/reviews/${r!.slug}`,
    lastModified: new Date(r!.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const comparativas = getAllComparativas().map((c) => ({
    url: `${SITE_URL}/comparativas/${c!.slug}`,
    lastModified: new Date(c!.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const mejor = getAllMejor().map((m) => ({
    url: `${SITE_URL}/mejor/${m!.slug}`,
    lastModified: new Date(m!.frontmatter.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const categories = Object.keys(CATEGORY_LABELS).map((cat) => ({
    url: `${SITE_URL}/categoria/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const staticPages = [
    { url: SITE_URL,                        changeFrequency: 'daily'   as const, priority: 1.0 },
    { url: `${SITE_URL}/about`,             changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE_URL}/contacto`,          changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${SITE_URL}/productos`,         changeFrequency: 'weekly'  as const, priority: 0.6 },
    { url: `${SITE_URL}/buscar`,            changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${SITE_URL}/privacidad`,        changeFrequency: 'yearly'  as const, priority: 0.2 },
    { url: `${SITE_URL}/aviso-legal`,       changeFrequency: 'yearly'  as const, priority: 0.2 },
  ].map((p) => ({ ...p, lastModified: new Date() }))

  return [
    ...staticPages,
    ...reviews,
    ...comparativas,
    ...mejor,
    ...categories,
  ]
}
