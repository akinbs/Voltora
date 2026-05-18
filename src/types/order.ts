import type { ProductVisualType } from './product'

// ── Shared status (extended union — mock UI uses a subset) ────
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

// ── Mock order (keeps existing UI working) ───────────────────
export interface MockOrder {
  id:            string
  orderNumber:   string
  createdAt:     string
  status:        OrderStatus
  total:         number
  currency:      'USD' | 'TRY'
  itemCount:     number
  trackingCode?: string
}

// ── Firestore full order model ────────────────────────────────
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'mock'
export type PaymentMethod = 'card' | 'bank-transfer' | 'cash-on-delivery' | 'mock'

export interface OrderItem {
  id:          string
  productId:   string
  productName: string
  productSlug: string
  sku:         string
  quantity:    number
  unitPrice:   number
  totalPrice:  number
  currency:    'USD' | 'TRY'
  visualType:  ProductVisualType
}

export interface ShippingAddress {
  fullName:   string
  phone?:     string
  address:    string
  city:       string
  country:    string
  postalCode: string
}

export interface OrderTotals {
  subtotal:  number
  discount:  number
  shipping:  number
  tax:       number
  total:     number
  currency:  'USD' | 'TRY'
}

export interface Order {
  id:              string
  orderNumber:     string
  userId:          string
  customerEmail:   string
  customerName:    string
  items:           OrderItem[]
  totals:          OrderTotals
  status:          OrderStatus
  paymentStatus:   PaymentStatus
  paymentMethod:   PaymentMethod
  shippingAddress: ShippingAddress
  trackingCode?:   string
  notes?:          string
  createdAt:       unknown
  updatedAt:       unknown
}

export type CreateOrderInput      = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateOrderStatusInput = Pick<Order, 'id' | 'status' | 'paymentStatus' | 'trackingCode'>
