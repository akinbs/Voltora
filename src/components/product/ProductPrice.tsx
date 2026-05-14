type PriceSize = 'sm' | 'md' | 'lg'

interface ProductPriceProps {
  price:               number
  oldPrice?:           number
  currency:            'USD' | 'TRY'
  discountPercentage?: number
  size?:               PriceSize
}

const LOCALE: Record<'USD' | 'TRY', string> = {
  USD: 'en-US',
  TRY: 'tr-TR',
}

function fmt(amount: number, currency: 'USD' | 'TRY'): string {
  return new Intl.NumberFormat(LOCALE[currency], {
    style:                 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const currentSizeMap: Record<PriceSize, string> = {
  sm: 'text-sm  font-bold',
  md: 'text-base font-bold',
  lg: 'text-2xl  font-bold',
}

export function ProductPrice({
  price,
  oldPrice,
  currency,
  discountPercentage,
  size = 'md',
}: ProductPriceProps) {
  const effectiveDiscount = discountPercentage ??
    (oldPrice ? Math.round((1 - price / oldPrice) * 100) : undefined)

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`text-voltora-black ${currentSizeMap[size]}`}>
        {fmt(price, currency)}
      </span>

      {oldPrice !== undefined && (
        <span className="text-xs text-muted/60 line-through">{fmt(oldPrice, currency)}</span>
      )}

      {effectiveDiscount !== undefined && effectiveDiscount > 0 && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.20)' }}
        >
          -{effectiveDiscount}%
        </span>
      )}
    </div>
  )
}
