import type { Product, ProductSpec, ProductVisualType, StockStatus } from './product'

// ── Mock cart (keeps existing UI working) ─────────────────────
export interface CartItem {
  product:  Product
  quantity: number
}

export interface CartTotals {
  subtotal:       number
  discountAmount: number
  shipping:       number
  tax:            number
  total:          number
  itemCount:      number
  promoApplied:   boolean
  promoCode:      string
  promoDiscount:  number
}

// ── Firestore cart ─────────────────────────────────────────────
export interface FirestoreCartItem {
  id:              string
  productId:       string
  productName:     string
  productSlug:     string
  productSku:      string
  productImage?:   string
  visualType:      ProductVisualType
  price:           number
  oldPrice?:       number
  currency:        'USD' | 'TRY'
  quantity:        number
  stock:           number
  stockStatus:     StockStatus
  selectedSpecs?:  ProductSpec[]
  addedAt:         unknown
}

export interface UserCart {
  id:        string
  userId:    string
  items:     FirestoreCartItem[]
  subtotal:  number
  discount:  number
  shipping:  number
  tax:       number
  total:     number
  currency:  'USD' | 'TRY'
  updatedAt: unknown
  createdAt: unknown
}
