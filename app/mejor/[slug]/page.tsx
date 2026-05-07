import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMejor, getAllMejor } from '@/lib/mdx'
import BreadCrumbs from '@/components/BreadCrumbs'
import StarRating from '@/components/StarRating'
import { AffiliateButtonGroup } from '@/components/AffiliateButton'
import { Trophy, Calendar } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllMejor().map((m) => ({ slug: m!.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getMejor(params.slug)
  if (!data) return {}
  return { title: data.frontmatter.title, description: data.frontmatter.description }
}

export default function MejorPage({ params }: Props) {
  const data = getMejor(params.slug)
  if (!data) notFound()

  const { frontmatter, content } = data
  const rankColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600']

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadCrumbs
        crumbs={[
          { label: 'Mejores productos', href: '/mejor' },
          { label: frontmatter.title },
        ]}
      />
      <div className="mt-8">
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Guía de compra
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">{frontmatter.title}</h1>
        <p className="text-gray-500 mb-4">{frontmatter.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Calendar size={14} /> {new Date(frontmatter.date).toLocaleDateString('es-ES')}
          <span className="mx-2">·</span>
          Presupuesto máximo:{' '}
          <strong className="text-gray-700">
            {frontmatter.maxPrice.toLocaleString('es-ES')} {frontmatter.currency}
          </strong>
        </div>

        {/* Ranked products */}
        <div className="space-y-8 mb-12">
          {frontmatter.products.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
                <Trophy size={22} className={rankColors[i] || 'text-gray-400'} />
                <span className="font-black text-gray-900 text-lg">#{product.rank}</span>
                <span className="font-bold text-gray-800">{product.name}</span>
                <span className="ml-auto font-bold text-brand-700">
                  {product.price.toLocaleString('es-ES')} {frontmatter.currency}
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                </div>
                <div>
                  <StarRating rating={product.rating} size="sm" />
                  <p className="text-gray-600 mt-2 mb-4 text-sm leading-relaxed">{product.description}</p>
                  <ul className="space-y-1 mb-4">
                    {product.pros.map((pro, j) => (
                      <li key={j} className="text-sm text-green-700 flex items-center gap-2">
                        <span className="text-green-500">✓</span> {pro}
                      </li>
                    ))}
                  </ul>
                  <AffiliateButtonGroup links={product.affiliateLinks} productName={product.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buying guide content */}
        <article className="prose prose-gray max-w-none prose-headings:font-black prose-a:text-brand-600">
          <MDXRemote source={content} />
        </article>
      </div>
    </div>
  )
}
