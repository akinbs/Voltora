import { useState, useMemo, useCallback, useEffect } from 'react'
import { filterProducts, sortProducts } from '../utils/productFilters'
import type { Product } from '../types/product'
import type { ProductFilters, ProductSortOption, ProductViewMode } from '../types/filters'

const DEFAULT_FILTERS: ProductFilters = {
  searchQuery:           '',
  selectedCategories:    [],
  selectedStockStatuses: [],
  selectedBrands:        [],
  selectedTags:          [],
  minPrice:              '',
  maxPrice:              '',
  minRating:             null,
}

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
}

export function useProductFilters(
  products:        Product[],
  initialCategory?: string,
) {
  const [filters, setFilters]               = useState<ProductFilters>(() => ({
    ...DEFAULT_FILTERS,
    selectedCategories: initialCategory ? [initialCategory] : [],
  }))
  const [sortBy, setSortBy]                 = useState<ProductSortOption>('featured')
  const [viewMode, setViewMode]             = useState<ProductViewMode>('grid')
  const [isMobileFilterOpen, setMobileOpen] = useState(false)

  // Sync initialCategory when it first arrives (async URL params)
  useEffect(() => {
    if (initialCategory) {
      setFilters(f => ({
        ...f,
        selectedCategories: f.selectedCategories.length === 0 ? [initialCategory] : f.selectedCategories,
      }))
    }
  }, [initialCategory])

  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), sortBy),
    [products, filters, sortBy],
  )

  const activeFilterCount = useMemo(() => {
    let n = 0
    if (filters.searchQuery.trim())            n++
    n += filters.selectedCategories.length
    n += filters.selectedStockStatuses.length
    n += filters.selectedBrands.length
    n += filters.selectedTags.length
    if (filters.minPrice !== '')               n++
    if (filters.maxPrice !== '')               n++
    if (filters.minRating !== null)            n++
    return n
  }, [filters])

  const setSearchQuery    = useCallback((v: string) =>    setFilters(f => ({ ...f, searchQuery: v })), [])
  const toggleCategory    = useCallback((v: string) =>    setFilters(f => ({ ...f, selectedCategories:    toggle(f.selectedCategories,    v) })), [])
  const toggleStockStatus = useCallback((v: string) =>    setFilters(f => ({ ...f, selectedStockStatuses: toggle(f.selectedStockStatuses, v) })), [])
  const toggleBrand       = useCallback((v: string) =>    setFilters(f => ({ ...f, selectedBrands:        toggle(f.selectedBrands,        v) })), [])
  const toggleTag         = useCallback((v: string) =>    setFilters(f => ({ ...f, selectedTags:          toggle(f.selectedTags,          v) })), [])
  const setMinPrice       = useCallback((v: string) =>    setFilters(f => ({ ...f, minPrice: v })), [])
  const setMaxPrice       = useCallback((v: string) =>    setFilters(f => ({ ...f, maxPrice: v })), [])
  const setMinRating      = useCallback((v: number | null) => setFilters(f => ({ ...f, minRating: v })), [])
  const clearAllFilters   = useCallback(() => { setFilters(DEFAULT_FILTERS); setSortBy('featured') }, [])

  const removeFilter = useCallback((type: keyof ProductFilters, value?: string) => {
    setFilters(f => {
      switch (type) {
        case 'searchQuery':           return { ...f, searchQuery: '' }
        case 'selectedCategories':    return { ...f, selectedCategories:    f.selectedCategories.filter(v => v !== value) }
        case 'selectedStockStatuses': return { ...f, selectedStockStatuses: f.selectedStockStatuses.filter(v => v !== value) }
        case 'selectedBrands':        return { ...f, selectedBrands:        f.selectedBrands.filter(v => v !== value) }
        case 'selectedTags':          return { ...f, selectedTags:          f.selectedTags.filter(v => v !== value) }
        case 'minPrice':              return { ...f, minPrice: '' }
        case 'maxPrice':              return { ...f, maxPrice: '' }
        case 'minRating':             return { ...f, minRating: null }
        default:                      return f
      }
    })
  }, [])

  return {
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
    openMobileFilters:  () => setMobileOpen(true),
    closeMobileFilters: () => setMobileOpen(false),
  }
}
