export type CheckoutStepId = 'contact' | 'shipping' | 'payment' | 'review'

export interface CheckoutStep {
  id:       CheckoutStepId
  label:    string
  stepNum:  number
}

export interface CheckoutFormState {
  // Contact
  email:     string
  fullName:  string
  phone:     string
  // Shipping
  address:   string
  city:      string
  postalCode:string
  country:   string
  // Payment
  paymentMethod: 'card' | 'transfer' | 'crypto'
  cardNumber:    string
  cardName:      string
  cardExpiry:    string
  cardCvc:       string
}
