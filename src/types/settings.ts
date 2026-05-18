import type { FirestoreCurrency } from './firestore'

export interface StoreSettings {
  id:                     string
  storeName:              string
  storeEmail:             string
  supportEmail:           string
  defaultCurrency:        FirestoreCurrency
  taxRate:                number
  freeShippingThreshold:  number
  standardShippingPrice:  number
  maintenanceMode:        boolean
  allowGuestCheckout:     boolean
  updatedAt:              unknown
}
