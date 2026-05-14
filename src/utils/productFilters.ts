import type { Product } from '../types/product'
import type { ProductFilters, ProductSortOption } from '../types/filters'

export function getProductSearchText(product: Product): string {
  return [
    product.name,
    product.category,
    product.description,
    product.brand ?? '',
    product.sku,
    ...product.badges.map(b => b.label),
    ...product.specs.map(s => `${s.label} ${s.value}`),
  ].join(' ').toLowerCase()
}

function matchesTag(product: Product, tag: string): boolean {
  if (tag === '__isNew')        return product.isNew === true
  if (tag === '__isBestSeller') return product.isBestSeller === true
  if (tag === '__onSale')       return (product.discountPercentage ?? 0) > 0 || product.oldPrice !== undefined
  return product.badges.some(b => b.label === tag)
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(product => {
    if (filters.searchQuery.trim()) {
      const text = getProductSearchText(product)
      if (!text.includes(filters.searchQuery.trim().toLowerCase())) return false
    }
    if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(product.category)) return false
    if (filters.selectedStockStatuses.length > 0 && !filters.selectedStockStatuses.includes(product.stockStatus)) return false
    if (filters.selectedBrands.length > 0 && (!product.brand || !filters.selectedBrands.includes(product.brand))) return false
    if (filters.selectedTags.length > 0 && !filters.selectedTags.some(tag => matchesTag(product, tag))) return false

    const min = filters.minPrice !== '' ? parseFloat(filters.minPrice) : null
    const max = filters.maxPrice !== '' ? parseFloat(filters.maxPrice) : null
    if (min !== null && !isNaN(min) && product.price < min) return false
    if (max !== null && !isNaN(max) && product.price > max) return false

    if (filters.minRating !== null && product.rating < filters.minRating) return false
    return true
  })
}

export function sortProducts(products: Product[], sortBy: ProductSortOption): Product[] {
  const arr = [...products]
  switch (sortBy) {
    case 'featured':   return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    case 'newest':     return arr.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price)
    case 'price-desc': return arr.sort((a, b) => b.price - a.price)
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating)
    case 'name-asc':   return arr.sort((a, b) => a.name.localeCompare(b.name))
    case 'stock-desc': return arr.sort((a, b) => b.stock - a.stock)
    default:           return arr
  }
}
