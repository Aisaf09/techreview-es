import { getAllReviews, getAllComparativas, getAllMejor } from './mdx'
import { CATEGORY_LABELS } from '@/types'

export interface SearchResult {
  title: string
  slug: string
  type: 'review' | 'comparativa' | 'mejor'
  href: string
  description: string
  category?: string
  categoryLabel?: string
  rating?: number
  date: string
}

export function getAllSearchData(): SearchResult[] {
  const reviews = getAllReviews().map((r) => ({
    title:         r!.frontmatter.title,
    slug:          r!.slug,
    type:          'review' as const,
    href:          `/reviews/${r!.slug}`,
    description:   r!.frontmatter.description,
    category:      r!.frontmatter.category,
    categoryLabel: CATEGORY_LABELS[r!.frontmatter.category],
    rating:        r!.frontmatter.rating,
    date:          r!.frontmatter.date,
  }))

  const comparativas = getAllComparativas().map((c) => ({
    title:       c!.frontmatter.title,
    slug:        c!.slug,
    type:        'comparativa' as const,
    href:        `/comparativas/${c!.slug}`,
    description: c!.frontmatter.description,
    date:        c!.frontmatter.date,
  }))

  const mejor = getAllMejor().map((m) => ({
    title:         m!.frontmatter.title,
    slug:          m!.slug,
    type:          'mejor' as const,
    href:          `/mejor/${m!.slug}`,
    description:   m!.frontmatter.description,
    category:      m!.frontmatter.category,
    categoryLabel: CATEGORY_LABELS[m!.frontmatter.category],
    date:          m!.frontmatter.date,
  }))

  return [...reviews, ...comparativas, ...mejor].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
