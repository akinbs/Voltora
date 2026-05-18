import type { StoreSettings } from '../../types/settings'

export const seedSettings: StoreSettings = {
  id:                    'store',
  storeName:             'Voltora',
  storeEmail:            'hello@voltora.dev',
  supportEmail:          'support@voltora.dev',
  defaultCurrency:       'USD',
  taxRate:               0.08,
  freeShippingThreshold: 75.00,
  standardShippingPrice: 8.99,
  maintenanceMode:       false,
  allowGuestCheckout:    true,
  updatedAt:             new Date('2026-05-18'),
}
