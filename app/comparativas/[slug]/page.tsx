import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getComparativa, getAllComparativas } from '@/lib/mdx'
import { comparativaJsonLd } from '@/lib/structured-data'
import CompareTable from '@/components/CompareTable'
import BreadCrumbs from '@/components/BreadCrumbs'
import { Calendar, Clock } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllComparativas().map((c) => ({ slug: c!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comp = getComparativa(params.slug)
  if (!comp) return {}
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'
  return {
    title: comp.frontmatter.title,
    description: comp.frontmatter.description,
    openGraph: {
      title: comp.frontmatter.title,
      description: comp.frontmatter.description,
      url: `${SITE_URL}/comparativas/${params.slug}`,
    },
  }
}

export default function ComparativaPage({ params }: Props) {
  const comp = getComparativa(params.slug)
  if (!comp) notFound()

  const { frontmatter, content, readingTime } = comp
  const jsonLd = comparativaJsonLd(frontmatter, params.slug)

  const verdictColors = {
    A: 'bg-green-100 text-green-800 border-green-200',
    B: 'bg-blue-100 text-blue-800 border-blue-200',
    tie: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  const verdictLabels = {
    A: `Ganador: ${frontmatter.productA.name}`,
    B: `Ganador: ${frontmatter.productB.name}`,
    tie: 'Empate técnico',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadCrumbs
          crumbs={[
            { label: 'Comparativas', href: '/comparativas' },
            { label: frontmatter.title },
          ]}
        />
        <div className="mt-8">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Comparativa
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">{frontmatter.title}</h1>
          <p className="text-gray-500 mb-4">{frontmatter.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(frontmatter.date).toLocaleDateString('es-ES')}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {readingTime}</span>
          </div>

          {/* Verdict badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm mb-8 ${verdictColors[frontmatter.winner]}`}>
            {verdictLabels[frontmatter.winner]}
          </div>

          <CompareTable
            productA={frontmatter.productA}
            productB={frontmatter.productB}
            winner={frontmatter.winner}
          />

          {/* Verdict text */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <h2 className="font-black text-gray-900 text-lg mb-2">Veredicto final</h2>
            <p className="text-gray-700 leading-relaxed">{frontmatter.verdict}</p>
          </div>

          <article className="prose prose-gray max-w-none prose-headings:font-black prose-a:text-brand-600">
            <MDXRemote source={content} />
          </article>
        </div>
      </div>
    </>
  )
}
