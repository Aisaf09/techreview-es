import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

const sizeMap = { sm: 14, md: 20, lg: 28 }

export default function StarRating({ rating, max = 5, size = 'md', showNumber = true }: StarRatingProps) {
  const px = sizeMap[size]
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const partial = !filled && i < rating
        return (
          <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
            <Star
              size={px}
              className="text-gray-200"
              fill="currentColor"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : '100%' }}
              >
                <Star size={px} className="text-amber-400" fill="currentColor" />
              </span>
            )}
          </span>
        )
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
