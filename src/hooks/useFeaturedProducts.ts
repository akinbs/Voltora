import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/firebase/productService'
import { mapFirestoreProductToProduct } from '../utils/firestoreMappers'
import { mockProducts } from '../data/mockProducts'
import type { Product } from '../types/product'

type DataSource = 'firestore' | 'mock'

interface UseFeaturedProductsResult {
  products:  Product[]
  isLoading: boolean
  error:     string | null
  source:    DataSource
  refetch:   () => void
}

interface UseFeaturedProductsOptions {
  limitCount?:  number
  useFallback?: boolean
}

export function useFeaturedProducts({
  limitCount  = 6,
  useFallback = true,
}: UseFeaturedProductsOptions = {}): UseFeaturedProductsResult {
  const [products,  setProducts]  = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,     setError]     = useState<string | null>(null)
  const [source,    setSource]    = useState<DataSource>('mock')
  const [tick,      setTick]      = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    const load = async () => {
      const result = await productService.getFeaturedProducts(limitCount)

      if (cancelled) return

      if (result.success && result.items.length > 0) {
        setProducts(result.items.map(mapFirestoreProductToProduct))
        setSource('firestore')
        setError(null)
      } else {
        if (!result.success) {
          console.error('[useFeaturedProducts] Firestore error:', result.error)
          setError(result.error)
        }
        if (useFallback) {
          const fallback = mockProducts.filter(p => p.featured).slice(0, limitCount)
          setProducts(fallback.length > 0 ? fallback : mockProducts.slice(0, limitCount))
          setSource('mock')
        } else {
          setProducts([])
        }
      }
      setIsLoading(false)
    }

    void load()
    return () => { cancelled = true }
  }, [limitCount, useFallback, tick])

  return { products, isLoading, error, source, refetch }
}
