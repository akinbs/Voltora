import type { FirestoreImage, FirestoreSeo } from './firestore'

// ── Shared primitives (used by both mock and Firestore layers) ─
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

export interface ProductTechnicalDetail {
  group: string
  items: { label: string; value: string }[]
}

// ── Mock UI image (label + visualType for generated SVG placeholders) ──
export interface ProductImage {
  id:         string
  label:      string
  visualType: ProductVisualType
}

// ── Firestore storage image ────────────────────────────────────
export type { FirestoreImage as ProductStorageImage }

// ── Datasheet ─────────────────────────────────────────────────
export interface ProductDatasheet {
  fileName: string
  fileSize: string
  version:  string
  url?:     string
  path?:    string
}

// ── Mock Product (used by all existing UI components) ─────────
export interface Product {
  id:                  string
  name:                string
  slug:                string
  category:            string
  categoryId?:         string
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
  datasheet?:          ProductDatasheet
  images?:             ProductImage[]
  storageImages?:      FirestoreImage[]
  technicalDetails?:   ProductTechnicalDetail[]
  warranty?:           string
  shippingNote?:       string
}

// ── Firestore Product (full backend model) ────────────────────
export interface FirestoreProduct {
  id:                  string
  name:                string
  slug:                string
  categoryId:          string
  categoryName:        string
  brand:               string
  sku:                 string
  barcode?:            string
  description:         string
  longDescription:     string
  price:               number
  oldPrice?:           number
  currency:            'USD' | 'TRY'
  taxRate:             number
  stock:               number
  stockStatus:         StockStatus
  minStockLevel:       number
  badges:              ProductBadge[]
  specs:               ProductSpec[]
  technicalDetails:    ProductTechnicalDetail[]
  features:            string[]
  applications:        string[]
  packageIncludes:     string[]
  images:              FirestoreImage[]
  datasheet?:          ProductDatasheet
  visualType:          ProductVisualType
  rating:              number
  reviewCount:         number
  salesCount:          number
  viewCount:           number
  featured:            boolean
  isNew:               boolean
  isBestSeller:        boolean
  isActive:            boolean
  discountPercentage?: number
  seo?:                FirestoreSeo
  createdAt:           unknown
  updatedAt:           unknown
  createdBy?:          string
  updatedBy?:          string
}

export type CreateProductInput = Omit<FirestoreProduct, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>
export type UpdateProductInput = Partial<CreateProductInput>
