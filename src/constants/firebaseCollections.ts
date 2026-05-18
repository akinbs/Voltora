export const FIREBASE_COLLECTIONS = {
  USERS:         'users',
  PRODUCTS:      'products',
  CATEGORIES:    'categories',
  ORDERS:        'orders',
  CARTS:         'carts',
  WISHLISTS:     'wishlists',
  REVIEWS:       'reviews',
  ADMIN_METRICS: 'adminMetrics',
  SETTINGS:      'settings',
} as const

export type FirebaseCollectionKey  = keyof typeof FIREBASE_COLLECTIONS
export type FirebaseCollectionName = (typeof FIREBASE_COLLECTIONS)[FirebaseCollectionKey]

export const getUserCartPath      = (userId: string) => `${FIREBASE_COLLECTIONS.CARTS}/${userId}`
export const getUserWishlistPath  = (userId: string) => `${FIREBASE_COLLECTIONS.WISHLISTS}/${userId}`
