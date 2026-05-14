import { useState, useCallback } from 'react'
import type { Product } from '../types/product'
import { mockWishlistProducts } from '../data/mockWishlist'

export function useMockWishlist() {
  const [items, setItems] = useState<Product[]>(mockWishlistProducts)

  const removeFromWishlist = useCallback((productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId))
  }, [])

  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  const isWishlisted = useCallback((productId: string) => {
    return items.some(p => p.id === productId)
  }, [items])

  return {
    items,
    removeFromWishlist,
    clearWishlist,
    isWishlisted,
    isEmpty: items.length === 0,
    count:   items.length,
  }
}
