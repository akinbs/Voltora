export type ProductSortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'name-asc'
  | 'stock-desc'

export type ProductViewMode = 'grid' | 'list'

export interface ProductFilters {
  searchQuery:           string
  selectedCategories:    string[]
  selectedStockStatuses: string[]
  selectedBrands:        string[]
  selectedTags:          string[]
  minPrice:              string
  maxPrice:              string
  minRating:             number | null
}

export const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: 'featured',   label: 'Featured'           },
  { value: 'newest',     label: 'Newest'             },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated'          },
  { value: 'name-asc',   label: 'Name: A to Z'       },
  { value: 'stock-desc', label: 'Stock: High to Low' },
]

export const FILTER_CATEGORIES = [
  'Dev Boards', 'Sensors', 'Robotics', 'Power', 'Components', 'Cables', 'Tools', 'Modules',
] as const

export const FILTER_BRANDS = [
  'Voltora Lab', 'Arduino', 'Espressif', 'MakerPro', 'SensorTech', 'RoboCore',
] as const

export const FILTER_TAGS = [
  { label: 'New Arrival',  key: '__isNew'         },
  { label: 'Best Seller',  key: '__isBestSeller'   },
  { label: 'On Sale',      key: '__onSale'         },
  { label: 'WiFi',         key: 'WiFi'             },
  { label: '6-DOF',        key: '6-DOF'            },
  { label: 'Adjustable',   key: 'Adjustable'       },
] as const

export const FILTER_RATINGS: { value: number; label: string }[] = [
  { value: 4.5, label: '4.5 & up' },
  { value: 4.0, label: '4.0 & up' },
  { value: 3.5, label: '3.5 & up' },
]
