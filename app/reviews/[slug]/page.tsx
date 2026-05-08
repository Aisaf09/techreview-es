import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getReview, getAllReviews } from '@/lib/mdx'
import { reviewJsonLd } from '@/lib/structured-data'
import StarRating from '@/components/StarRating'
import ProsConsList from '@/components/ProsConsList'
import SpecsTable from '@/components/SpecsTable'
import { AffiliateButtonGroup } from '@/components/AffiliateButton'
import TableOfContents from '@/components/TableOfContents'
import BreadCrumbs from '@/components/BreadCrumbs'
import ReviewCard from '@/components/ReviewCard'
import { CATEGORY_LABELS } from '@/types'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import { getLatestReviews } from '@/lib/mdx'

interface Props { params: { slug: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export async function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReview(params.slug)
  if (!review) return {}
  const { frontmatter } = review
  const url = `${SITE_URL}/reviews/${params.slug}`

  return {
    title:       frontmatter.title,
    description: frontmatter.description,
    alternates:  { canonical: url },
    openGraph: {
      title:         frontmatter.title,
      description:   frontmatter.description,
      images:        [{ url: frontmatter.image, width: 1200, height: 630, alt: frontmatter.title }],
      type:          'article',
      publishedTime: frontmatter.date,
      url,
    },
    twitter: {
      card:        'summary_large_image',
      title:       frontmatter.title,
      description: frontmatter.description,
      images:      [frontmatter.image],
    },
  }
}

export default function ReviewPage({ params }: Props) {
  const review = getReview(params.slug)
  if (!review) notFound()

  const { frontmatter, content, readingTime } = review
  const jsonLd    = reviewJsonLd(frontmatter, params.slug)
  const minPrice  = Math.min(...frontmatter.affiliateLinks.map((l) => l.price))
  const related   = getLatestReviews(3).filter((r) => r?.slug !== params.slug).slice(0, 3)

  const ratingColor = frontmatter.rating >= 4.5 ? 'text-green-600' : frontmatter.rating >= 4.0 ? 'text-amber-600' : 'text-orange-600'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs crumbs={[
          { label: CATEGORY_LABELS[frontmatter.category], href: `/categoria/${frontmatter.category}` },
          { label: frontmatter.title },
        ]} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          {/* ── Main content ────────────────────────────────── */}
          <div>
            {/* Hero card */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-8 card-shadow">
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image
                  src={frontmatter.image}
                  alt={`${frontmatter.brand} ${frontmatter.model} — imagen de review`}
                  fill className="object-cover" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    {CATEGORY_LABELS[frontmatter.category]}
                  </span>
                  <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <StarRating rating={frontmatter.rating} size="xs" showNumber={false} />
                    <span className={`font-black text-sm ${ratingColor}`}>{frontmatter.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                  <span className="font-medium text-gray-600">{frontmatter.brand}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(frontmatter.date)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{readingTime}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 text-balance">
                  {frontmatter.title}
                </h1>
                <p className="text-gray-500 leading-relaxed mb-6">{frontmatter.description}</p>

                {/* Score + price bar */}
                <div className="grid grid-cols-2 gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Nota TechReview</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-black ${ratingColor}`}>{frontmatter.rating.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                    <StarRating rating={frontmatter.rating} size="sm" showNumber={false} className="mt-1" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Desde</p>
                    <p className="text-2xl font-black text-brand-700">{formatPrice(minPrice)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Precio orientativo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros / Cons */}
            <ProsConsList pros={frontmatter.pros} cons={frontmatter.cons} />

            {/* Specs */}
            <SpecsTable specs={frontmatter.specs} />

            {/* Affiliate CTA */}
            <div className="my-8 bg-brand-50 border border-brand-100 rounded-2xl p-6">
              <p className="font-bold text-brand-900 mb-1">¿Te convence? Consulta el precio actual</p>
              <p className="text-sm text-brand-700 mb-4">Los precios pueden variar. Comprueba la oferta antes de comprar.</p>
              <AffiliateButtonGroup links={frontmatter.affiliateLinks} productName={`${frontmatter.brand} ${frontmatter.model}`} />
            </div>

            {/* MDX */}
            <article className="prose prose-gray max-w-none">
              <MDXRemote source={content} />
            </article>

            {/* Bottom affiliate */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-black text-gray-900 text-lg mb-4">Ver precios y ofertas</h3>
              <AffiliateButtonGroup links={frontmatter.affiliateLinks} productName={`${frontmatter.brand} ${frontmatter.model}`} />
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="hidden lg:block space-y-6">
            <TableOfContents />

            {/* Quick verdict */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 card-shadow">
              <h3 className="font-black text-gray-900 text-sm mb-3 uppercase tracking-wide">Veredicto rápido</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl font-black ${ratingColor}`}>{frontmatter.rating.toFixed(1)}</span>
                <StarRating rating={frontmatter.rating} size="sm" showNumber={false} />
              </div>
              <div className="space-y-1 text-sm">
                {frontmatter.pros.slice(0, 3).map((p, i) => (
                  <p key={i} className="flex items-start gap-2 text-green-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>{p}
                  </p>
                ))}
                {frontmatter.cons.slice(0, 2).map((c, i) => (
                  <p key={i} className="flex items-start gap-2 text-red-600">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>{c}
                  </p>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <AffiliateButtonGroup links={frontmatter.affiliateLinks.slice(0, 1)} productName={`${frontmatter.brand} ${frontmatter.model}`} />
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related reviews ─────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Más análisis recientes</h2>
              <a href="/categoria/portatiles" className="flex items-center gap-1 text-sm text-brand-600 font-semibold hover:underline">
                Ver todos <ArrowRight size={14} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => r && (
                <ReviewCard key={r.slug} frontmatter={r.frontmatter} slug={r.slug} readingTime={r.readingTime} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
