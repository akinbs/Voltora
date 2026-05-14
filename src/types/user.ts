export interface SavedAddress {
  id:         string
  title:      string
  fullName:   string
  address:    string
  city:       string
  country:    string
  postalCode: string
  isDefault:  boolean
}

export interface MockUser {
  id:                string
  fullName:          string
  email:             string
  role:              'customer' | 'admin'
  avatarInitials:    string
  createdAt:         string
  phone?:            string
  company?:          string
  location?:         string
  preferredCurrency: 'USD' | 'TRY'
  savedAddresses:    SavedAddress[]
}
