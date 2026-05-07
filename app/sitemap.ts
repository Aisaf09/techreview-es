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

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/buscar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...reviews,
    ...comparativas,
    ...mejor,
    ...categories,
  ]
}
