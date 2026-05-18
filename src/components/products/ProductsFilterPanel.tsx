import { useState } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import {
  FILTER_CATEGORIES, FILTER_BRANDS, FILTER_TAGS, FILTER_RATINGS,
} from '../../types/filters'
import type { ProductFilters } from '../../types/filters'

interface ProductsFilterPanelProps {
  filters:              ProductFilters
  onToggleCategory:     (v: string) => void
  onToggleStock:        (v: string) => void
  onToggleBrand:        (v: string) => void
  onToggleTag:          (v: string) => void
  onMinPrice:           (v: string) => void
  onMaxPrice:           (v: string) => void
  onRating:             (v: number | null) => void
  onClearAll:           () => void
  activeFilterCount:    number
  availableCategories?: string[]
  availableBrands?:     string[]
}

const STOCK_OPTIONS = [
  { value: 'in-stock',     label: 'In Stock',     dot: '#1a5e3f' },
  { value: 'low-stock',    label: 'Low Stock',    dot: '#b48200' },
  { value: 'out-of-stock', label: 'Out of Stock', dot: '#6b7280' },
]

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-left group focus-visible:outline-none"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold text-voltora-black uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          size={13}
          className={`text-muted/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  )
}

function FilterCheckbox({
  checked,
  onChange,
  label,
  dot,
}: {
  checked:  boolean
  onChange: () => void
  label:    string
  dot?:     string
}) {
  return (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
      <span
        className={`
          flex-none w-4 h-4 rounded flex items-center justify-center
          border transition-all duration-150
          ${checked
            ? 'bg-voltora-black border-voltora-black'
            : 'bg-white border-border group-hover:border-mint/50'}
        `}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
            <path d="M1 3.5L3.5 6L8 1" stroke="#CFFFE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: dot }} aria-hidden="true" />
      )}
      <span className={`text-xs leading-none transition-colors ${checked ? 'text-voltora-black font-medium' : 'text-muted group-hover:text-voltora-black'}`}>
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        aria-label={label}
      />
    </label>
  )
}

export function ProductsFilterPanel({
  filters,
  onToggleCategory,
  onToggleStock,
  onToggleBrand,
  onToggleTag,
  onMinPrice,
  onMaxPrice,
  onRating,
  onClearAll,
  activeFilterCount,
  availableCategories,
  availableBrands,
}: ProductsFilterPanelProps) {
  const categories = availableCategories && availableCategories.length > 0
    ? availableCategories
    : [...FILTER_CATEGORIES]
  const brands = availableBrands && availableBrands.length > 0
    ? availableBrands
    : [...FILTER_BRANDS]
  return (
    <aside aria-label="Product filters" className="w-full">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-muted/60" aria-hidden="true" />
          <span className="text-xs font-bold text-voltora-black uppercase tracking-wider">Filters</span>
          {activeFilterCount > 0 && (
            <span
              className="text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: '#000', color: '#CFFFE2' }}
            >
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded"
          >
            <X size={10} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-0.5">
          {categories.map(cat => (
            <FilterCheckbox
              key={cat}
              label={cat}
              checked={filters.selectedCategories.includes(cat)}
              onChange={() => onToggleCategory(cat)}
            />
          ))}
        </div>
      </Section>

      {/* Stock */}
      <Section title="Availability">
        <div className="space-y-0.5">
          {STOCK_OPTIONS.map(opt => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              dot={opt.dot}
              checked={filters.selectedStockStatuses.includes(opt.value)}
              onChange={() => onToggleStock(opt.value)}
            />
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price (USD)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={e => onMinPrice(e.target.value)}
            aria-label="Minimum price"
            className="
              w-full text-xs px-2.5 py-2 rounded-lg border border-border bg-white
              placeholder:text-muted/50 text-voltora-black
              hover:border-mint/40 focus:border-mint/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-mint/40
              transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            "
          />
          <span className="text-muted/40 text-xs shrink-0">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={e => onMaxPrice(e.target.value)}
            aria-label="Maximum price"
            className="
              w-full text-xs px-2.5 py-2 rounded-lg border border-border bg-white
              placeholder:text-muted/50 text-voltora-black
              hover:border-mint/40 focus:border-mint/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-mint/40
              transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            "
          />
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand" defaultOpen={false}>
        <div className="space-y-0.5">
          {brands.map(brand => (
            <FilterCheckbox
              key={brand}
              label={brand}
              checked={filters.selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </div>
      </Section>

      {/* Tags */}
      <Section title="Tags" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_TAGS.map(tag => {
            const active = filters.selectedTags.includes(tag.key)
            return (
              <button
                key={tag.key}
                type="button"
                onClick={() => onToggleTag(tag.key)}
                aria-pressed={active}
                className={`
                  text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                  ${active
                    ? 'bg-voltora-black text-mint border-voltora-black'
                    : 'bg-white text-muted border-border hover:border-mint/40 hover:text-voltora-black'}
                `}
              >
                {tag.label}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Rating */}
      <Section title="Rating" defaultOpen={false}>
        <div className="space-y-1">
          {FILTER_RATINGS.map(opt => {
            const active = filters.minRating === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onRating(active ? null : opt.value)}
                aria-pressed={active}
                className={`
                  w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs border transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                  ${active
                    ? 'bg-voltora-black text-mint border-voltora-black'
                    : 'bg-white text-muted border-border hover:border-mint/40 hover:text-voltora-black'}
                `}
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={i < Math.floor(opt.value) ? '#fbbf24' : 'rgba(0,0,0,0.12)'}
                        stroke="none"
                      />
                    </svg>
                  ))}
                </span>
                <span className="font-medium">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </Section>
    </aside>
  )
}
