import { ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS } from '../../types/filters'
import type { ProductSortOption } from '../../types/filters'

interface ProductsSortSelectProps {
  value:    ProductSortOption
  onChange: (v: ProductSortOption) => void
}

export function ProductsSortSelect({ value, onChange }: ProductsSortSelectProps) {
  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown
        size={13}
        className="absolute left-2.5 text-muted/60 pointer-events-none"
        aria-hidden="true"
      />
      <select
        value={value}
        onChange={e => onChange(e.target.value as ProductSortOption)}
        aria-label="Sort products"
        className="
          appearance-none pl-7 pr-7 py-2 text-xs font-medium
          bg-white border border-border rounded-lg text-voltora-black
          hover:border-mint/40 focus:border-mint/50 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-mint/40
          transition-colors duration-150 cursor-pointer
        "
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <svg
        className="absolute right-2 pointer-events-none text-muted/50"
        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
