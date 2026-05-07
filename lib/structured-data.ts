import type { ReviewFrontmatter, ComparativaFrontmatter } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export function reviewJsonLd(frontmatter: ReviewFrontmatter, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    url: `${SITE_URL}/reviews/${slug}`,
    author: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES',
      url: SITE_URL,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: frontmatter.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@type': 'Product',
      name: `${frontmatter.brand} ${frontmatter.model}`,
      brand: { '@type': 'Brand', name: frontmatter.brand },
      image: frontmatter.image,
      offers: frontmatter.affiliateLinks.map((link) => ({
        '@type': 'Offer',
        price: link.price,
        priceCurrency: link.currency,
        url: link.url,
        seller: { '@type': 'Organization', name: link.store },
      })),
    },
  }
}

export function comparativaJsonLd(frontmatter: ComparativaFrontmatter, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    url: `${SITE_URL}/comparativas/${slug}`,
    author: {
      '@type': 'Organization',
      name: process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES',
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
