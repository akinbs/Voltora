import { Drawer } from '../ui/Drawer'
import { ProductsFilterPanel } from './ProductsFilterPanel'
import type { ProductFilters } from '../../types/filters'

interface ProductsMobileFiltersProps {
  open:                 boolean
  onClose:              () => void
  filters:              ProductFilters
  activeFilterCount:    number
  onToggleCategory:     (v: string) => void
  onToggleStock:        (v: string) => void
  onToggleBrand:        (v: string) => void
  onToggleTag:          (v: string) => void
  onMinPrice:           (v: string) => void
  onMaxPrice:           (v: string) => void
  onRating:             (v: number | null) => void
  onClearAll:           () => void
  availableCategories?: string[]
  availableBrands?:     string[]
}

export function ProductsMobileFilters({
  open,
  onClose,
  filters,
  activeFilterCount,
  onToggleCategory,
  onToggleStock,
  onToggleBrand,
  onToggleTag,
  onMinPrice,
  onMaxPrice,
  onRating,
  onClearAll,
  availableCategories,
  availableBrands,
}: ProductsMobileFiltersProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="left"
      title="Filters"
      description={activeFilterCount > 0 ? `${activeFilterCount} active` : undefined}
    >
      {/* Drawer content is light — override inline since Drawer bg is dark */}
      <div className="-mx-6 -my-6 bg-white min-h-full">
        <div className="p-6">
          <ProductsFilterPanel
            filters={filters}
            activeFilterCount={activeFilterCount}
            onToggleCategory={onToggleCategory}
            onToggleStock={onToggleStock}
            onToggleBrand={onToggleBrand}
            onToggleTag={onToggleTag}
            onMinPrice={onMinPrice}
            onMaxPrice={onMaxPrice}
            onRating={onRating}
            onClearAll={onClearAll}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
          />
        </div>
        <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-voltora-black text-mint hover:bg-voltora-dark-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            Apply Filters
            {activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>
        </div>
      </div>
    </Drawer>
  )
}
