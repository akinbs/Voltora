import type { MockOrder } from '../types/order'

export const mockOrders: MockOrder[] = [
  {
    id:           'ord-001',
    orderNumber:  'VLT-2026-0001',
    createdAt:    '2026-05-10',
    status:       'processing',
    total:        38.20,
    currency:     'USD',
    itemCount:    3,
  },
  {
    id:           'ord-002',
    orderNumber:  'VLT-2026-0002',
    createdAt:    '2026-04-28',
    status:       'shipped',
    total:        22.50,
    currency:     'USD',
    itemCount:    2,
    trackingCode: 'TR-9821345600TR',
  },
  {
    id:           'ord-003',
    orderNumber:  'VLT-2026-0003',
    createdAt:    '2026-04-14',
    status:       'delivered',
    total:        57.80,
    currency:     'USD',
    itemCount:    5,
    trackingCode: 'TR-9811230045TR',
  },
  {
    id:           'ord-004',
    orderNumber:  'VLT-2026-0004',
    createdAt:    '2026-03-29',
    status:       'cancelled',
    total:        14.90,
    currency:     'USD',
    itemCount:    1,
  },
]
