import type { ReviewFrontmatter, ComparativaFrontmatter, MejorFrontmatter, FaqItem } from '@/types'

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || 'https://techreview.es'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES'

const author = { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }

// ── Review + Product ──────────────────────────────────────────
export function reviewJsonLd(frontmatter: ReviewFrontmatter, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url: `${SITE_URL}/reviews/${slug}`,
    inLanguage: 'es',
    author,
    publisher: author,
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
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: link.store },
      })),
    },
  }
}

// ── Comparativa (Article + ItemList) ─────────────────────────
export function comparativaJsonLd(frontmatter: ComparativaFrontmatter, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url: `${SITE_URL}/comparativas/${slug}`,
    inLanguage: 'es',
    author,
    publisher: {
      ...author,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    about: [
      {
        '@type': 'Product',
        name: frontmatter.productA.name,
        brand: { '@type': 'Brand', name: frontmatter.productA.brand },
        offers: {
          '@type': 'Offer',
          price: frontmatter.productA.price,
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'Product',
        name: frontmatter.productB.name,
        brand: { '@type': 'Brand', name: frontmatter.productB.brand },
        offers: {
          '@type': 'Offer',
          price: frontmatter.productB.price,
          priceCurrency: 'EUR',
        },
      },
    ],
  }
}

// ── Mejor / Guía de compra (ItemList) ────────────────────────
export function mejorJsonLd(frontmatter: MejorFrontmatter, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: frontmatter.title,
    description: frontmatter.description,
    url: `${SITE_URL}/mejor/${slug}`,
    inLanguage: 'es',
    numberOfItems: frontmatter.products.length,
    itemListElement: frontmatter.products.map((p) => ({
      '@type': 'ListItem',
      position: p.rank,
      name: p.name,
      url: p.affiliateLinks[0]?.url ?? `${SITE_URL}/mejor/${slug}#producto-${p.rank}`,
      item: {
        '@type': 'Product',
        name: p.name,
        brand: { '@type': 'Brand', name: p.brand },
        image: p.image,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 1,
        },
        offers: p.affiliateLinks.map((l) => ({
          '@type': 'Offer',
          price: l.price,
          priceCurrency: l.currency,
          url: l.url,
          availability: 'https://schema.org/InStock',
        })),
      },
    })),
  }
}

// ── FAQ ───────────────────────────────────────────────────────
export function faqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// ── Breadcrumbs ───────────────────────────────────────────────
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
