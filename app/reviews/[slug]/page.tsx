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
import { CATEGORY_LABELS } from '@/types'
import { Clock, Calendar } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const reviews = getAllReviews()
  return reviews.map((r) => ({ slug: r!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReview(params.slug)
  if (!review) return {}
  const { frontmatter } = review
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: frontmatter.image }],
      type: 'article',
      publishedTime: frontmatter.date,
      url: `${SITE_URL}/reviews/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.image],
    },
  }
}

export default function ReviewPage({ params }: Props) {
  const review = getReview(params.slug)
  if (!review) notFound()

  const { frontmatter, content, readingTime } = review
  const jsonLd = reviewJsonLd(frontmatter, params.slug)
  const minPrice = Math.min(...frontmatter.affiliateLinks.map((l) => l.price))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs
          crumbs={[
            { label: CATEGORY_LABELS[frontmatter.category], href: `/categoria/${frontmatter.category}` },
            { label: frontmatter.title },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Main content */}
          <div>
            {/* Hero */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 shadow-sm">
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 sm:p-8">
                <span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {CATEGORY_LABELS[frontmatter.category]}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 text-balance">
                  {frontmatter.title}
                </h1>
                <p className="text-gray-500 mb-4">{frontmatter.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <StarRating rating={frontmatter.rating} size="lg" />
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(frontmatter.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {readingTime}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Precio desde</p>
                    <p className="text-2xl font-black text-brand-700">
                      {minPrice.toLocaleString('es-ES')} {frontmatter.currency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Nota TechReview</p>
                    <p className="text-3xl font-black text-amber-500">{frontmatter.rating.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros/Cons */}
            <ProsConsList pros={frontmatter.pros} cons={frontmatter.cons} />

            {/* Specs */}
            <SpecsTable specs={frontmatter.specs} />

            {/* Affiliate buttons */}
            <AffiliateButtonGroup links={frontmatter.affiliateLinks} productName={`${frontmatter.brand} ${frontmatter.model}`} />

            {/* MDX content */}
            <article className="prose prose-gray max-w-none prose-headings:font-black prose-a:text-brand-600 mt-10">
              <MDXRemote source={content} />
            </article>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </>
  )
}
