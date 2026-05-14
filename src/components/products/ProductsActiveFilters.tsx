import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProductFilters } from '../../types/filters'
import { FILTER_TAGS } from '../../types/filters'

interface ProductsActiveFiltersProps {
  filters:    ProductFilters
  onRemove:   (type: keyof ProductFilters, value?: string) => void
  onClearAll: () => void
}

const tagLabel = (key: string): string =>
  FILTER_TAGS.find(t => t.key === key)?.label ?? key

const stockLabel: Record<string, string> = {
  'in-stock':     'In Stock',
  'low-stock':    'Low Stock',
  'out-of-stock': 'Out of Stock',
}

const chipVariants = {
  initial: { opacity: 0, scale: 0.80, y: -4 },
  animate: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as number[] } },
  exit:    { opacity: 0, scale: 0.80, y: -2, transition: { duration: 0.14 } },
}

export function ProductsActiveFilters({ filters, onRemove, onClearAll }: ProductsActiveFiltersProps) {
  const chips: { label: string; onRemove: () => void }[] = []

  if (filters.searchQuery.trim()) {
    chips.push({ label: `"${filters.searchQuery.trim()}"`, onRemove: () => onRemove('searchQuery') })
  }
  filters.selectedCategories.forEach(v =>
    chips.push({ label: v, onRemove: () => onRemove('selectedCategories', v) })
  )
  filters.selectedStockStatuses.forEach(v =>
    chips.push({ label: stockLabel[v] ?? v, onRemove: () => onRemove('selectedStockStatuses', v) })
  )
  filters.selectedBrands.forEach(v =>
    chips.push({ label: v, onRemove: () => onRemove('selectedBrands', v) })
  )
  filters.selectedTags.forEach(v =>
    chips.push({ label: tagLabel(v), onRemove: () => onRemove('selectedTags', v) })
  )
  if (filters.minPrice !== '') {
    chips.push({ label: `Min $${filters.minPrice}`, onRemove: () => onRemove('minPrice') })
  }
  if (filters.maxPrice !== '') {
    chips.push({ label: `Max $${filters.maxPrice}`, onRemove: () => onRemove('maxPrice') })
  }
  if (filters.minRating !== null) {
    chips.push({ label: `${filters.minRating}★+`, onRemove: () => onRemove('minRating') })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap py-3 border-b border-border">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/50 shrink-0">
        Active:
      </span>
      <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
        <AnimatePresence mode="popLayout">
          {chips.map(chip => (
            <motion.span
              key={chip.label}
              layout
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-surface border border-border text-voltora-black"
            >
              {chip.label}
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Remove filter: ${chip.label}`}
                className="ml-0.5 rounded-full p-0.5 text-muted/60 hover:text-voltora-black hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint"
              >
                <X size={9} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="shrink-0 text-[11px] font-semibold text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
      >
        Clear all
      </button>
    </div>
  )
}
