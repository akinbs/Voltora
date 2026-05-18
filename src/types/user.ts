// ── Shared ─────────────────────────────────────────────────────
export interface SavedAddress {
  id:          string
  title:       string
  fullName:    string
  phone?:      string
  address:     string
  city:        string
  country:     string
  postalCode:  string
  isDefault:   boolean
}

// ── Mock user (keeps existing UI working) ─────────────────────
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

// ── Firestore User Profile ────────────────────────────────────
export type UserRole   = 'customer' | 'admin' | 'super_admin'
export type UserStatus = 'active' | 'blocked' | 'pending'

export interface UserProfile {
  id:                string
  uid:               string
  fullName:          string
  email:             string
  phone?:            string
  role:              UserRole
  status:            UserStatus
  avatarUrl?:        string
  avatarInitials:    string
  company?:          string
  location?:         string
  preferredCurrency: 'USD' | 'TRY'
  savedAddresses:    SavedAddress[]
  lastLoginAt?:      unknown
  createdAt:         unknown
  updatedAt:         unknown
}

export type CreateUserProfileInput = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>
export type UpdateUserProfileInput = Partial<Omit<UserProfile, 'id' | 'uid' | 'email' | 'createdAt'>>
