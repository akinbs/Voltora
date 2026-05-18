import type { ProductVisualType, StockStatus } from './product'

export interface WishlistItem {
  id:            string
  productId:     string
  productName:   string
  productSlug:   string
  productSku:    string
  productImage?: string
  visualType:    ProductVisualType
  price:         number
  currency:      'USD' | 'TRY'
  stockStatus:   StockStatus
  addedAt:       unknown
}

export interface UserWishlist {
  id:        string
  userId:    string
  items:     WishlistItem[]
  createdAt: unknown
  updatedAt: unknown
}
