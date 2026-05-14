interface ProductRatingProps {
  rating:       number
  reviewCount?: number
  compact?:     boolean
}

export function ProductRating({ rating, reviewCount, compact = false }: ProductRatingProps) {
  const filled = Math.round(rating)
  const starSize = compact ? 9 : 11

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rated ${rating.toFixed(1)} out of 5${reviewCount !== undefined ? `, ${reviewCount} reviews` : ''}`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width={starSize} height={starSize} viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={i < filled ? '#fbbf24' : 'rgba(0,0,0,0.12)'}
              stroke="none"
            />
          </svg>
        ))}
      </div>
      <span className={`font-medium text-muted ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
        {rating.toFixed(1)}
      </span>
      {!compact && reviewCount !== undefined && (
        <span className="text-[10px] text-muted/50">({reviewCount})</span>
      )}
    </div>
  )
}
