import { useState, useEffect, useCallback } from 'react'
import { productService } from '../services/firebase/productService'
import { mapFirestoreProductToProduct } from '../utils/firestoreMappers'
import { mockProducts } from '../data/mockProducts'
import type { Product } from '../types/product'

type DataSource = 'firestore' | 'mock'

interface UseProductDetailResult {
  product:         Product | null
  relatedProducts: Product[]
  isLoading:       boolean
  error:           string | null
  source:          DataSource
  refetch:         () => void
}

interface UseProductDetailOptions {
  useFallback?: boolean
}

export function useProductDetail(
  slug: string | undefined,
  { useFallback = true }: UseProductDetailOptions = {},
): UseProductDetailResult {
  const [product,         setProduct]         = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading,       setIsLoading]       = useState(true)
  const [error,           setError]           = useState<string | null>(null)
  const [source,          setSource]          = useState<DataSource>('mock')
  const [tick,            setTick]            = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    if (!slug) {
      setError('No product slug provided.')
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)
    setProduct(null)
    setRelatedProducts([])

    const load = async () => {
      const result = await productService.getProductBySlug(slug)

      if (cancelled) return

      if (result.success && result.data) {
        const mapped = mapFirestoreProductToProduct(result.data)
        setProduct(mapped)
        setSource('firestore')

        // Related: same categoryId, exclude current, up to 4
        const relResult = await productService.getProductsByCategory(result.data.categoryId, 10)
        if (!cancelled) {
          const related = relResult.success
            ? relResult.items
                .filter(p => p.id !== result.data!.id)
                .slice(0, 4)
                .map(mapFirestoreProductToProduct)
            : []
          setRelatedProducts(related)
        }
      } else {
        if (!result.success) {
          console.error('[useProductDetail] Firestore error:', result.error)
          setError(result.error)
        }
        if (useFallback) {
          const fallback = mockProducts.find(p => p.slug === slug) ?? null
          setProduct(fallback)
          setSource('mock')
          if (fallback) {
            const related = mockProducts
              .filter(p => p.id !== fallback.id && p.category === fallback.category)
              .slice(0, 4)
            setRelatedProducts(related.length > 0 ? related : mockProducts.filter(p => p.id !== fallback.id).slice(0, 4))
          }
        } else {
          setProduct(null)
        }
      }

      if (!cancelled) setIsLoading(false)
    }

    void load()
    return () => { cancelled = true }
  }, [slug, useFallback, tick])

  return { product, relatedProducts, isLoading, error, source, refetch }
}
