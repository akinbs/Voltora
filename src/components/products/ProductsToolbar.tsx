import { SlidersHorizontal, Search } from 'lucide-react'
import { ProductsSortSelect } from './ProductsSortSelect'
import { ProductsViewToggle } from './ProductsViewToggle'
import { ProductsResultSummary } from './ProductsResultSummary'
import type { ProductSortOption, ProductViewMode, ProductFilters } from '../../types/filters'

interface ProductsToolbarProps {
  filters:            ProductFilters
  sortBy:             ProductSortOption
  viewMode:           ProductViewMode
  activeFilterCount:  number
  totalCount:         number
  filteredCount:      number
  onSearch:           (v: string) => void
  onSort:             (v: ProductSortOption) => void
  onViewMode:         (v: ProductViewMode) => void
  onOpenMobileFilter: () => void
}

export function ProductsToolbar({
  filters,
  sortBy,
  viewMode,
  activeFilterCount,
  totalCount,
  filteredCount,
  onSearch,
  onSort,
  onViewMode,
  onOpenMobileFilter,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4 border-b border-border">
      {/* Search */}
      <label className="
        flex items-center gap-2 flex-1 min-w-0
        px-3 py-2.5 rounded-xl border border-border bg-white
        hover:border-mint/40 focus-within:border-mint/50
        transition-colors duration-150
      ">
        <Search size={14} className="text-muted/60 shrink-0" aria-hidden="true" />
        <input
          type="search"
          value={filters.searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search boards, sensors, modules…"
          aria-label="Search products"
          className="flex-1 min-w-0 bg-transparent text-sm text-voltora-black placeholder:text-muted/50 outline-none"
        />
      </label>

      {/* Right controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile filter button */}
        <button
          type="button"
          onClick={onOpenMobileFilter}
          aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
          className="
            lg:hidden relative flex items-center gap-2 px-3 py-2.5 rounded-xl
            border border-border bg-white text-sm text-muted
            hover:border-mint/40 hover:text-voltora-black
            transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
          "
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span className="text-xs font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
              style={{ background: '#000', color: '#CFFFE2' }}
              aria-hidden="true"
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        <ProductsSortSelect value={sortBy} onChange={onSort} />
        <ProductsViewToggle value={viewMode} onChange={onViewMode} />
      </div>

      {/* Result summary — right-aligned on wide screens, hidden on small */}
      <div className="hidden xl:block shrink-0">
        <ProductsResultSummary
          total={totalCount}
          filtered={filteredCount}
          searchQuery={filters.searchQuery}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </div>
  )
}
