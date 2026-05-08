import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const sizeMap = { xs: 12, sm: 16, md: 20, lg: 28 }
const textSizeMap = { xs: 'text-xs', sm: 'text-sm', md: 'text-base', lg: 'text-lg' }

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  showNumber = true,
  className,
}: StarRatingProps) {
  const px = sizeMap[size]

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        const pct  = Math.round(fill * 100)
        return (
          <svg
            key={i}
            width={px}
            height={px}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-${i}-${Math.round(rating * 10)}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${pct}%`} stopColor="#f59e0b" />
                <stop offset={`${pct}%`} stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#star-${i}-${Math.round(rating * 10)})`}
              strokeWidth="0"
            />
          </svg>
        )
      })}
      {showNumber && (
        <span className={cn('ml-1 font-bold text-gray-700', textSizeMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
