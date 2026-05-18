import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/firebase/productService'
import { mapFirestoreProductToProduct } from '../utils/firestoreMappers'
import { mockProducts } from '../data/mockProducts'
import type { Product } from '../types/product'

type DataSource = 'firestore' | 'mock'

interface UseProductsResult {
  products:  Product[]
  isLoading: boolean
  error:     string | null
  source:    DataSource
  refetch:   () => void
}

interface UseProductsOptions {
  useFallback?: boolean
  onlyActive?:  boolean
}

export function useProducts({
  useFallback = true,
  onlyActive  = true,
}: UseProductsOptions = {}): UseProductsResult {
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
      const result = onlyActive
        ? await productService.getActiveProducts(100)
        : await productService.getProducts({ limit: 100, orderBy: 'createdAt', direction: 'desc' })

      if (cancelled) return

      if (result.success && result.items.length > 0) {
        setProducts(result.items.map(mapFirestoreProductToProduct))
        setSource('firestore')
        setError(null)
      } else {
        if (!result.success) {
          console.error('[useProducts] Firestore error:', result.error)
          setError(result.error)
        }
        if (useFallback) {
          setProducts(mockProducts)
          setSource('mock')
        } else {
          setProducts([])
        }
      }
      setIsLoading(false)
    }

    void load()
    return () => { cancelled = true }
  }, [onlyActive, useFallback, tick])

  return { products, isLoading, error, source, refetch }
}
