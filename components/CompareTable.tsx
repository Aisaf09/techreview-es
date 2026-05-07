import Image from 'next/image'
import StarRating from './StarRating'
import { AffiliateButtonGroup } from './AffiliateButton'
import { Trophy } from 'lucide-react'
import type { CompareProduct } from '@/types'

interface CompareTableProps {
  productA: CompareProduct
  productB: CompareProduct
  winner: 'A' | 'B' | 'tie'
}

export default function CompareTable({ productA, productB, winner }: CompareTableProps) {
  const allKeys = Array.from(
    new Set([...Object.keys(productA.specs), ...Object.keys(productB.specs)])
  )

  return (
    <div className="my-8">
      {/* Header cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { product: productA, side: 'A' as const },
          { product: productB, side: 'B' as const },
        ].map(({ product, side }) => (
          <div
            key={side}
            className={`relative p-5 rounded-2xl border-2 text-center ${
              winner === side ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white'
            }`}
          >
            {winner === side && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                <Trophy size={12} /> Ganador
              </span>
            )}
            <div className="relative w-full aspect-square max-w-[140px] mx-auto mb-3">
              <Image src={product.image} alt={product.name} fill className="object-contain" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
            <StarRating rating={product.rating} size="sm" />
            <p className="mt-2 font-bold text-brand-700">
              {product.price.toLocaleString('es-ES')} €
            </p>
          </div>
        ))}
      </div>

      {/* Specs table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-gray-500 font-semibold w-1/3">Característica</th>
              <th className="px-4 py-3 text-center text-gray-800 font-bold">{productA.name}</th>
              <th className="px-4 py-3 text-center text-gray-800 font-bold">{productB.name}</th>
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key, i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-600 border-r border-gray-100">{key}</td>
                <td className="px-4 py-3 text-center text-gray-900">{productA.specs[key] ?? '—'}</td>
                <td className="px-4 py-3 text-center text-gray-900">{productB.specs[key] ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affiliate buttons */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-sm">{productA.name}</h4>
          <AffiliateButtonGroup links={productA.affiliateLinks} productName={productA.name} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-sm">{productB.name}</h4>
          <AffiliateButtonGroup links={productB.affiliateLinks} productName={productB.name} />
        </div>
      </div>
    </div>
  )
}
