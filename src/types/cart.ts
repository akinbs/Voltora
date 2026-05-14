import type { Product } from './product'

export interface CartItem {
  product:  Product
  quantity: number
}

export interface CartTotals {
  subtotal:         number
  discountAmount:   number
  shipping:         number
  tax:              number
  total:            number
  itemCount:        number
  promoApplied:     boolean
  promoCode:        string
  promoDiscount:    number
}
