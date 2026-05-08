import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getComparativa, getAllComparativas } from '@/lib/mdx'
import { comparativaJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'
import BreadCrumbs from '@/components/BreadCrumbs'
import StarRating from '@/components/StarRating'
import { AffiliateButtonGroup } from '@/components/AffiliateButton'
import NewsletterForm from '@/components/NewsletterForm'
import FaqAccordion from '@/components/FaqAccordion'
import {
  Trophy, Calendar, Clock, Check, X,
  Users, BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { CompareProduct } from '@/types'

interface Props { params: { slug: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export async function generateStaticParams() {
  return getAllComparativas().map((c) => ({ slug: c!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comp = getComparativa(params.slug)
  if (!comp) return {}
  const url = `${SITE_URL}/comparativas/${params.slug}`
  return {
    title: comp.frontmatter.title,
    description: comp.frontmatter.description,
    alternates: {
      canonical: url,
      languages: { 'es': url, 'x-default': url },
    },
    openGraph: {
      url,
      title: comp.frontmatter.title,
      description: comp.frontmatter.description,
      type: 'article',
      images: [comp.frontmatter.productA.image],
    },
    robots: { index: true, follow: true },
  }
}

export default function ComparativaPage({ params }: Props) {
  const comp = getComparativa(params.slug)
  if (!comp) notFound()

  const { frontmatter, content, readingTime } = comp
  const { productA, productB, winner } = frontmatter

  const winnerLabel = winner === 'A' ? productA.name : winner === 'B' ? productB.name : null

  const ldComp  = comparativaJsonLd(frontmatter, params.slug)
  const ldBread = breadcrumbJsonLd([
    { name: 'Inicio', url: SITE_URL },
    { name: 'Comparativas', url: `${SITE_URL}/comparativas/iphone-vs-samsung` },
    { name: frontmatter.title, url: `${SITE_URL}/comparativas/${params.slug}` },
  ])
  const ldFaq   = frontmatter.faqs?.length ? faqJsonLd(frontmatter.faqs) : null

  const allSpecKeys = Array.from(
    new Set([...Object.keys(productA.specs), ...Object.keys(productB.specs)])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldComp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBread) }} />
      {ldFaq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs crumbs={[
          { label: 'Comparativas', href: '/comparativas/iphone-vs-samsung' },
          { label: frontmatter.title },
        ]} />

        {/* ── Page header ────────────────────────────────────────── */}
        <div className="mt-8 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            <Trophy size={12} aria-hidden="true" /> Comparativa detallada
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 text-balance">
            {frontmatter.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{frontmatter.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-1"><Calendar size={13} aria-hidden="true" /> {formatDate(frontmatter.date)}</span>
            <span className="flex items-center gap-1"><Clock size={13} aria-hidden="true" /> {readingTime}</span>
          </div>
        </div>

        {/* ── AFFILIATE BUTTONS — TOP ───────────────────────────── */}
        <AffiliateDuel productA={productA} productB={productB} winner={winner} />

        {/* ── PRODUCT SUMMARY CARDS ────────────────────────────── */}
        <section className="grid grid-cols-2 gap-4 mb-10" aria-label="Resumen de productos">
          {[{ p: productA, side: 'A' as const }, { p: productB, side: 'B' as const }].map(({ p, side }) => {
            const isWinner = winner === side
            return (
              <div
                key={side}
                className={cn(
                  'rounded-2xl border-2 p-5 transition-all',
                  isWinner
                    ? 'border-green-400 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                )}
              >
                {isWinner && (
                  <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-black px-2.5 py-1 rounded-full w-fit mb-3">
                    <Trophy size={11} aria-hidden="true" /> Ganador
                  </div>
                )}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 mb-3">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-3" priority />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-0.5">{p.brand}</p>
                <h2 className="font-black text-gray-900 dark:text-white text-sm leading-snug mb-2">{p.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={p.rating} size="sm" />
                  <span className="text-sm font-black text-gray-700 dark:text-gray-300">{p.rating.toFixed(1)}</span>
                </div>
                <p className="font-black text-brand-700 dark:text-brand-400 text-lg">{p.price.toLocaleString('es-ES')} €</p>
              </div>
            )
          })}
        </section>

        {/* ── SPECS COMPARISON TABLE ────────────────────────────── */}
        <section className="mb-10" aria-label="Tabla de especificaciones comparativa">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Especificaciones comparadas</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 font-bold text-gray-500 dark:text-gray-400 w-1/3">Característica</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-900 dark:text-white w-1/3">{productA.name}</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-900 dark:text-white w-1/3">{productB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {/* Price row */}
                <SpecRow
                  label="Precio"
                  valA={`${productA.price.toLocaleString('es-ES')} €`}
                  valB={`${productB.price.toLocaleString('es-ES')} €`}
                  winnerSide={productA.price < productB.price ? 'A' : productB.price < productA.price ? 'B' : null}
                />
                {/* Rating row */}
                <SpecRow
                  label="Nota TechReview"
                  valA={productA.rating.toFixed(1)}
                  valB={productB.rating.toFixed(1)}
                  winnerSide={productA.rating > productB.rating ? 'A' : productB.rating > productA.rating ? 'B' : null}
                />
                {/* Dynamic spec rows */}
                {allSpecKeys.map((key) => {
                  const vA = productA.specs[key] ?? '—'
                  const vB = productB.specs[key] ?? '—'
                  return (
                    <SpecRow key={key} label={key} valA={vA} valB={vB} winnerSide={null} />
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── PROS / CONS COLUMNS ───────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10" aria-label="Ventajas e inconvenientes">
          {[
            { p: productA, side: 'A' as const },
            { p: productB, side: 'B' as const },
          ].map(({ p, side }) => (
            <div key={side} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <p className="font-black text-gray-900 dark:text-white text-sm mb-3">{p.name}</p>
              <div className="space-y-1.5 mb-4">
                {p.pros.map((pro, i) => (
                  <p key={i} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-400">
                    <Check size={12} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" /> {pro}
                  </p>
                ))}
              </div>
              <div className="space-y-1.5">
                {p.cons.map((con, i) => (
                  <p key={i} className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                    <X size={12} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" /> {con}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ── "PARA QUIÉN" CARDS ────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10" aria-label="Perfil de usuario recomendado">
          {[
            { p: productA, side: 'A' as const, isWinner: winner === 'A' },
            { p: productB, side: 'B' as const, isWinner: winner === 'B' },
          ].map(({ p, side, isWinner }) => (
            <div
              key={side}
              className={cn(
                'rounded-2xl p-5 border',
                isWinner
                  ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className={isWinner ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400'} aria-hidden="true" />
                <p className={cn('font-black text-sm', isWinner ? 'text-brand-800 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300')}>
                  Elige {p.name} si…
                </p>
              </div>
              <ul className="space-y-1.5">
                {p.pros.slice(0, 4).map((pro, i) => (
                  <li key={i} className={cn('text-xs flex items-start gap-2', isWinner ? 'text-brand-700 dark:text-brand-300' : 'text-gray-600 dark:text-gray-400')}>
                    <Check size={11} className="mt-0.5 shrink-0" aria-hidden="true" /> {pro}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── FINAL VERDICT ────────────────────────────────────── */}
        <section
          className={cn(
            'rounded-2xl border p-6 mb-10',
            winnerLabel !== null
              ? 'bg-green-50 dark:bg-green-900/15 border-green-200 dark:border-green-800'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          )}
          aria-label="Veredicto final"
        >
          <h2 className="font-black text-gray-900 dark:text-white text-lg mb-2 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" aria-hidden="true" />
            Veredicto final
            {winnerLabel && (
              <span className="ml-2 text-sm bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-3 py-0.5 rounded-full font-bold">
                Ganador: {winnerLabel}
              </span>
            )}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{frontmatter.verdict}</p>
        </section>

        {/* ── FULL ARTICLE (MDX) ────────────────────────────────── */}
        <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-black prose-a:text-brand-600 dark:prose-a:text-brand-400 mb-12">
          <MDXRemote source={content} />
        </article>

        {/* ── AFFILIATE BUTTONS — BOTTOM ───────────────────────── */}
        <AffiliateDuel productA={productA} productB={productB} winner={winner} />

        {/* ── FAQ SECTION ───────────────────────────────────────── */}
        {frontmatter.faqs && frontmatter.faqs.length > 0 && (
          <section className="my-12" aria-label="Preguntas frecuentes">
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

        {/* ── NEWSLETTER ────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-3xl p-7 sm:p-10 text-center mt-12">
          <h2 className="text-xl font-black text-white mb-1">Más comparativas en tu email</h2>
          <p className="text-brand-200 text-sm mb-5">Recibe nuestros análisis directamente. Sin spam.</p>
          <NewsletterForm className="max-w-md mx-auto" />
        </div>
      </div>
    </>
  )
}

// ── Affiliate duel component ──────────────────────────────────
function AffiliateDuel({
  productA, productB, winner,
}: {
  productA: CompareProduct
  productB: CompareProduct
  winner: 'A' | 'B' | 'tie'
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
      {[{ p: productA, side: 'A' as const }, { p: productB, side: 'B' as const }].map(({ p, side }) => {
        const isWinner = winner === side
        return (
          <div key={side} className={cn('flex flex-col gap-2', isWinner && 'relative')}>
            {isWinner && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                Recomendado
              </span>
            )}
            <p className="font-bold text-gray-900 dark:text-white text-xs text-center truncate">{p.name}</p>
            <p className="font-black text-brand-700 dark:text-brand-400 text-lg text-center">{p.price.toLocaleString('es-ES')} €</p>
            <AffiliateButtonGroup links={p.affiliateLinks} productName={p.name} />
          </div>
        )
      })}
    </div>
  )
}

// ── Spec row component ────────────────────────────────────────
function SpecRow({
  label, valA, valB, winnerSide,
}: {
  label: string
  valA: string
  valB: string
  winnerSide: 'A' | 'B' | null
}) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">{label}</td>
      <td className={cn(
        'px-4 py-3 text-center font-semibold',
        winnerSide === 'A'
          ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
          : 'text-gray-700 dark:text-gray-300'
      )}>
        {winnerSide === 'A' && <Check size={12} className="inline mr-1 text-green-500" aria-hidden="true" />}
        {valA}
      </td>
      <td className={cn(
        'px-4 py-3 text-center font-semibold',
        winnerSide === 'B'
          ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
          : 'text-gray-700 dark:text-gray-300'
      )}>
        {winnerSide === 'B' && <Check size={12} className="inline mr-1 text-green-500" aria-hidden="true" />}
        {valB}
      </td>
    </tr>
  )
}

