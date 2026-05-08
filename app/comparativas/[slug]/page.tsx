import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getComparativa, getAllComparativas } from '@/lib/mdx'
import { comparativaJsonLd } from '@/lib/structured-data'
import CompareTable from '@/components/CompareTable'
import BreadCrumbs from '@/components/BreadCrumbs'
import { Calendar, Clock, Trophy } from 'lucide-react'
import { formatDate } from '@/lib/utils'

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
    title:       comp.frontmatter.title,
    description: comp.frontmatter.description,
    alternates:  { canonical: url },
    openGraph:   { title: comp.frontmatter.title, description: comp.frontmatter.description, url },
  }
}

export default function ComparativaPage({ params }: Props) {
  const comp = getComparativa(params.slug)
  if (!comp) notFound()

  const { frontmatter, content, readingTime } = comp
  const jsonLd = comparativaJsonLd(frontmatter, params.slug)

  const winnerName = frontmatter.winner === 'A'
    ? frontmatter.productA.name
    : frontmatter.winner === 'B'
    ? frontmatter.productB.name
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs crumbs={[
          { label: 'Comparativas', href: '/comparativas/iphone-vs-samsung' },
          { label: frontmatter.title },
        ]} />

        <div className="mt-8">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Comparativa
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 text-balance">{frontmatter.title}</h1>
          <p className="text-gray-500 mb-4 leading-relaxed">{frontmatter.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 flex-wrap">
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(frontmatter.date)}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {readingTime}</span>
          </div>

          {/* Winner banner */}
          {winnerName ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-3.5 mb-8 w-fit">
              <Trophy size={18} className="text-green-600" />
              <span className="font-bold text-green-800">Ganador: {winnerName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 mb-8 w-fit">
              <span className="font-bold text-gray-700">Empate técnico — depende de tu perfil</span>
            </div>
          )}

          <CompareTable
            productA={frontmatter.productA}
            productB={frontmatter.productB}
            winner={frontmatter.winner}
          />

          {/* Verdict */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <h2 className="font-black text-gray-900 text-lg mb-2 flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" /> Veredicto final
            </h2>
            <p className="text-gray-700 leading-relaxed">{frontmatter.verdict}</p>
          </div>

          <article className="prose prose-gray max-w-none">
            <MDXRemote source={content} />
          </article>
        </div>
      </div>
    </>
  )
}
