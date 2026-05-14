import type { StockStatus } from '../../types/product'

interface ProductStockBadgeProps {
  stockStatus: StockStatus
  stock:       number
  compact?:    boolean
}

const STOCK_STYLES: Record<StockStatus, { text: string; bg: string; color: string; border: string }> = {
  'in-stock':     { text: 'In Stock',     bg: 'rgba(207,255,226,0.12)', color: '#1a5e3f',           border: 'rgba(207,255,226,0.30)' },
  'low-stock':    { text: 'Low Stock',    bg: 'rgba(251,191,36,0.12)',  color: 'rgba(180,130,0,1)',  border: 'rgba(251,191,36,0.30)'  },
  'out-of-stock': { text: 'Out of Stock', bg: 'rgba(107,114,128,0.10)', color: '#6b7280',            border: 'rgba(107,114,128,0.25)' },
}

export function ProductStockBadge({ stockStatus, stock, compact = false }: ProductStockBadgeProps) {
  const s = STOCK_STYLES[stockStatus]
  const showCount = stockStatus === 'low-stock' && stock > 0

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${compact ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'}`}
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {showCount && !compact ? `Only ${stock} left` : s.text}
    </span>
  )
}
