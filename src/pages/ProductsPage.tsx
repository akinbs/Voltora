import { useProductFilters } from '../hooks/useProductFilters'
import { mockProducts } from '../data/mockProducts'
import { ProductGrid } from '../components/product/ProductGrid'
import { ProductsHeader } from '../components/products/ProductsHeader'
import { ProductsToolbar } from '../components/products/ProductsToolbar'
import { ProductsFilterPanel } from '../components/products/ProductsFilterPanel'
import { ProductsMobileFilters } from '../components/products/ProductsMobileFilters'
import { ProductsActiveFilters } from '../components/products/ProductsActiveFilters'
import { ProductsResultSummary } from '../components/products/ProductsResultSummary'

export default function ProductsPage() {
  const {
    filters,
    filteredProducts,
    activeFilterCount,
    sortBy,
    viewMode,
    isMobileFilterOpen,
    setSearchQuery,
    toggleCategory,
    toggleStockStatus,
    toggleBrand,
    toggleTag,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSortBy,
    setViewMode,
    clearAllFilters,
    removeFilter,
    openMobileFilters,
    closeMobileFilters,
  } = useProductFilters()

  const filterPanelProps = {
    filters,
    activeFilterCount,
    onToggleCategory:  toggleCategory,
    onToggleStock:     toggleStockStatus,
    onToggleBrand:     toggleBrand,
    onToggleTag:       toggleTag,
    onMinPrice:        setMinPrice,
    onMaxPrice:        setMaxPrice,
    onRating:          setMinRating,
    onClearAll:        clearAllFilters,
  }

  return (
    <div className="min-h-full bg-surface">
      <ProductsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <ProductsToolbar
          filters={filters}
          sortBy={sortBy}
          viewMode={viewMode}
          activeFilterCount={activeFilterCount}
          totalCount={mockProducts.length}
          filteredCount={filteredProducts.length}
          onSearch={setSearchQuery}
          onSort={setSortBy}
          onViewMode={setViewMode}
          onOpenMobileFilter={openMobileFilters}
        />

        {/* Active filters */}
        <ProductsActiveFilters
          filters={filters}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />

        {/* Main content */}
        <div className="flex gap-7 py-6">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 bg-white rounded-2xl border border-border p-4 max-h-[calc(100dvh-6rem)] overflow-y-auto scrollbar-none">
              <ProductsFilterPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Result summary visible below xl */}
            <div className="xl:hidden mb-4">
              <ProductsResultSummary
                total={mockProducts.length}
                filtered={filteredProducts.length}
                searchQuery={filters.searchQuery}
                activeFilterCount={activeFilterCount}
              />
            </div>

            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              columns={3}
              showQuickActions
              showSpecs
            />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <ProductsMobileFilters
        open={isMobileFilterOpen}
        onClose={closeMobileFilters}
        {...filterPanelProps}
      />
    </div>
  )
}
