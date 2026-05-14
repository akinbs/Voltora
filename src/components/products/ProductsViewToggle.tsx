import { LayoutGrid, List } from 'lucide-react'
import type { ProductViewMode } from '../../types/filters'

interface ProductsViewToggleProps {
  value:    ProductViewMode
  onChange: (v: ProductViewMode) => void
}

export function ProductsViewToggle({ value, onChange }: ProductsViewToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-lg border border-border bg-white overflow-hidden"
      role="group"
      aria-label="View mode"
    >
      {(['grid', 'list'] as const).map(mode => {
        const Icon    = mode === 'grid' ? LayoutGrid : List
        const label   = mode === 'grid' ? 'Grid view' : 'List view'
        const active  = value === mode
        return (
          <button
            key={mode}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => onChange(mode)}
            className={`
              w-8 h-8 flex items-center justify-center transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
              ${active
                ? 'bg-voltora-black text-mint'
                : 'text-muted/60 hover:text-voltora-black hover:bg-surface'}
            `}
          >
            <Icon size={14} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
