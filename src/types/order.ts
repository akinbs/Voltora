export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'

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
