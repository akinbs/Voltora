export type StockStatus       = 'in-stock' | 'low-stock' | 'out-of-stock'
export type ProductVisualType = 'board' | 'sensor' | 'module' | 'motor' | 'tool' | 'power' | 'cable' | 'component'

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductBadge {
  label:   string
  variant: 'mint' | 'dark' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline'
}

export interface ProductImage {
  id:         string
  label:      string
  visualType: ProductVisualType
}

export interface ProductTechnicalDetail {
  group: string
  items: { label: string; value: string }[]
}

export interface Product {
  id:                  string
  name:                string
  slug:                string
  category:            string
  description:         string
  price:               number
  oldPrice?:           number
  currency:            'USD' | 'TRY'
  rating:              number
  reviewCount:         number
  stock:               number
  stockStatus:         StockStatus
  badges:              ProductBadge[]
  specs:               ProductSpec[]
  visualType:          ProductVisualType
  featured?:           boolean
  isNew?:              boolean
  isBestSeller?:       boolean
  discountPercentage?: number
  sku:                 string
  brand?:              string
  createdAt?:          string
  longDescription?:    string
  features?:           string[]
  applications?:       string[]
  packageIncludes?:    string[]
  datasheet?: {
    fileName: string
    fileSize: string
    version:  string
  }
  images?:             ProductImage[]
  technicalDetails?:   ProductTechnicalDetail[]
  warranty?:           string
  shippingNote?:       string
}
