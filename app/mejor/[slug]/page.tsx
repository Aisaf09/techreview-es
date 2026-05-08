import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMejor, getAllMejor, getRelatedReviews } from '@/lib/mdx'
import { mejorJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'
import BreadCrumbs from '@/components/BreadCrumbs'
import StarRating from '@/components/StarRating'
import { AffiliateButtonGroup } from '@/components/AffiliateButton'
import ReviewCard from '@/components/ReviewCard'
import NewsletterForm from '@/components/NewsletterForm'
import FaqAccordion from '@/components/FaqAccordion'
import {
  Trophy, Calendar, Check, X,
  ShoppingCart, ArrowRight, Star, BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS } from '@/types'

interface Props { params: { slug: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export async function generateStaticParams() {
  return getAllMejor().map((m) => ({ slug: m!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getMejor(params.slug)
  if (!data) return {}
  const url = `${SITE_URL}/mejor/${params.slug}`
  return {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
    alternates: {
      canonical: url,
      languages: {
        'es':        url,
        'x-default': url,
      },
    },
    openGraph: {
      url,
      title: data.frontmatter.title,
      description: data.frontmatter.description,
      type: 'article',
    },
    robots: { index: true, follow: true },
  }
}

const RANK_STYLES = [
  { trophy: 'text-yellow-500', badge: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800', label: 'Mejor opción', bar: 'bg-yellow-400' },
  { trophy: 'text-gray-400',   badge: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',           label: '2ª opción',    bar: 'bg-gray-300 dark:bg-gray-600' },
  { trophy: 'text-amber-600',  badge: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',    label: '3ª opción',    bar: 'bg-amber-400' },
]

export default function MejorPage({ params }: Props) {
  const data = getMejor(params.slug)
  if (!data) notFound()

  const { frontmatter, content } = data
  const related = getRelatedReviews(params.slug, frontmatter.category, 3)

  const ldList    = mejorJsonLd(frontmatter, params.slug)
  const ldBread   = breadcrumbJsonLd([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Guías de compra', url: `${SITE_URL}/mejor` },
    { name: frontmatter.title, url: `${SITE_URL}/mejor/${params.slug}` },
  ])
  const ldFaq     = frontmatter.faqs?.length ? faqJsonLd(frontmatter.faqs) : null

  const top       = frontmatter.products[0]
  const minPrice  = Math.min(...frontmatter.products.map((p) => p.price))

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBread) }} />
      {ldFaq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs crumbs={[
          { label: 'Guías de compra', href: '/mejor/portatiles-menos-500-euros' },
          { label: frontmatter.title },
        ]} />

        {/* ── Page header ───────────────────────────────────────── */}
        <div className="mt-8 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              <Trophy size={12} aria-hidden="true" /> Guía de compra actualizada
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={12} aria-hidden="true" /> {new Date(frontmatter.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 text-balance">
            {frontmatter.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">{frontmatter.description}</p>
        </div>

        {/* ── TOP PICK HERO ─────────────────────────────────────── */}
        <section
          id="producto-1"
          aria-label={`Mejor opción: ${top.name}`}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 text-white mb-10 shadow-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Trophy size={11} aria-hidden="true" /> #1 Mejor opción
                </span>
                <span className="text-brand-200 text-sm">{top.brand}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">{top.name}</h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-black text-yellow-300">{top.rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={top.rating} size="sm" showNumber={false} />
                  <p className="text-brand-200 text-xs mt-0.5">Nota TechReview ES</p>
                </div>
              </div>
              <p className="text-brand-100 text-sm leading-relaxed mb-5 max-w-md">{top.description}</p>
              <ul className="space-y-1.5 mb-6">
                {top.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white">
                    <Check size={14} className="text-green-400 shrink-0" aria-hidden="true" /> {pro}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-white">{top.price.toLocaleString('es-ES')} {frontmatter.currency}</span>
                <AffiliateButtonGroup links={top.affiliateLinks} productName={top.name} />
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm shrink-0 hidden sm:block">
              <Image src={top.image} alt={top.name} fill className="object-contain p-4" priority />
            </div>
          </div>
        </section>

        {/* ── QUICK COMPARISON TABLE ────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
            Comparativa rápida
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 font-bold text-gray-600 dark:text-gray-300 w-8">#</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-600 dark:text-gray-300">Producto</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-600 dark:text-gray-300">Nota</th>
                  <th className="text-right px-4 py-3 font-bold text-gray-600 dark:text-gray-300">Precio</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-600 dark:text-gray-300">Comprar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {frontmatter.products.map((p, i) => {
                  const style = RANK_STYLES[i] ?? RANK_STYLES[2]
                  return (
                    <tr key={i} className={cn('hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors', i === 0 && 'bg-amber-50/50 dark:bg-amber-900/10')}>
                      <td className="px-4 py-3">
                        <Trophy size={16} className={style.trophy} aria-hidden="true" />
                      </td>
                      <td className="px-4 py-3">
                        <a href={`#producto-${p.rank}`} className="font-semibold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                          {p.name}
                        </a>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{p.brand}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 font-black text-amber-600 dark:text-amber-400">
                          <Star size={12} className="fill-amber-400" aria-hidden="true" /> {p.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-black text-brand-700 dark:text-brand-400">
                        {p.price.toLocaleString('es-ES')} {frontmatter.currency}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={p.affiliateLinks[0]?.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          aria-label={`Ver precio de ${p.name}`}
                          className="inline-flex items-center gap-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <ShoppingCart size={11} aria-hidden="true" /> Ver precio
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            * Precios orientativos. Pueden variar según disponibilidad y tienda.
          </p>
        </section>

        {/* ── MINI-REVIEWS PER PRODUCT ──────────────────────────── */}
        <section className="space-y-10 mb-14">
          {frontmatter.products.map((product, i) => {
            const style = RANK_STYLES[i] ?? RANK_STYLES[2]
            return (
              <article
                key={i}
                id={`producto-${product.rank}`}
                className={cn('rounded-3xl border overflow-hidden', style.badge)}
                aria-label={`${style.label}: ${product.name}`}
              >
                {/* Product header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-inherit">
                  <Trophy size={20} className={style.trophy} aria-hidden="true" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{style.label}</span>
                  <span className="font-black text-gray-900 dark:text-white text-lg ml-1">{product.name}</span>
                  <span className="ml-auto font-black text-brand-700 dark:text-brand-400 text-xl">
                    {product.price.toLocaleString('es-ES')} {frontmatter.currency}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6">
                  {/* Image + rating */}
                  <div className="shrink-0">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 mb-3">
                      <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-black text-gray-900 dark:text-white">{product.rating.toFixed(1)}</span>
                      <p className="text-xs text-gray-400 mb-1">sobre 5</p>
                      <StarRating rating={product.rating} size="sm" />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{product.description}</p>
                    <div className="mb-5">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Lo mejor</p>
                      <ul className="space-y-1.5">
                        {product.pros.map((pro, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
                            <Check size={13} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" /> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <AffiliateButtonGroup links={product.affiliateLinks} productName={product.name} />
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {/* ── BUYING GUIDE (MDX) ────────────────────────────────── */}
        {frontmatter.buyingGuideTitle && (
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            {frontmatter.buyingGuideTitle}
          </h2>
        )}
        <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand-600 dark:prose-a:text-brand-400 mb-14">
          <MDXRemote source={content} />
        </article>

        {/* ── FAQ SECTION ───────────────────────────────────────── */}
        {frontmatter.faqs && frontmatter.faqs.length > 0 && (
          <section className="mb-14" aria-label="Preguntas frecuentes">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
              Preguntas frecuentes
            </h2>
            <div className="space-y-3">
              {frontmatter.faqs.map((faq, i) => (
                <FaqAccordion key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </section>
        )}

        {/* ── RELATED REVIEWS ───────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                Análisis relacionados — {CATEGORY_LABELS[frontmatter.category]}
              </h2>
              <Link
                href={`/categoria/${frontmatter.category}`}
                className="text-sm text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
              >
                Ver todos <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => r && (
                <ReviewCard key={r.slug} frontmatter={r.frontmatter} slug={r.slug} readingTime={r.readingTime} />
              ))}
            </div>
          </section>
        )}

        {/* ── NEWSLETTER ────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-3xl p-7 sm:p-10 text-center">
          <h2 className="text-xl font-black text-white mb-1">Guías de compra en tu email</h2>
          <p className="text-brand-200 text-sm mb-5">Actualizamos esta guía cada mes. Suscríbete para no perderte ningún cambio.</p>
          <NewsletterForm className="max-w-md mx-auto" />
        </div>
      </div>
    </>
  )
}

