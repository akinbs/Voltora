import { useState, useEffect, useCallback } from 'react'
import { categoryService } from '../services/firebase/categoryService'
import { homeCategories } from '../data/home'
import type { Category } from '../types/category'

type DataSource = 'firestore' | 'mock'

interface UseCategoriesResult {
  categories: Category[]
  isLoading:  boolean
  error:      string | null
  source:     DataSource
  refetch:    () => void
}

interface UseCategoriesOptions {
  featuredOnly?: boolean
  activeOnly?:   boolean
  useFallback?:  boolean
}

// Fallback: convert homeCategories to the Category shape
const FALLBACK_CATEGORIES: Category[] = homeCategories.map((hc, idx) => ({
  id:           hc.id,
  name:         hc.label,
  slug:         hc.slug,
  description:  hc.description,
  iconName:     '',
  productCount: hc.productCount,
  isActive:     true,
  featured:     idx < 4,
  sortOrder:    idx + 1,
  createdAt:    null,
  updatedAt:    null,
}))

export function useCategories({
  featuredOnly = false,
  activeOnly   = true,
  useFallback  = true,
}: UseCategoriesOptions = {}): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [error,      setError]      = useState<string | null>(null)
  const [source,     setSource]     = useState<DataSource>('mock')
  const [tick,       setTick]       = useState(0)

  const refetch = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    const load = async () => {
      const result = featuredOnly
        ? await categoryService.getFeaturedCategories(12)
        : activeOnly
          ? await categoryService.getActiveCategories()
          : await categoryService.getCategories()

      if (cancelled) return

      if (result.success && result.items.length > 0) {
        setCategories(result.items)
        setSource('firestore')
        setError(null)
      } else {
        if (!result.success) {
          console.error('[useCategories] Firestore error:', result.error)
          setError(result.error)
        }
        if (useFallback) {
          const fallback = featuredOnly
            ? FALLBACK_CATEGORIES.filter(c => c.featured)
            : FALLBACK_CATEGORIES
          setCategories(fallback)
          setSource('mock')
        } else {
          setCategories([])
        }
      }
      setIsLoading(false)
    }

    void load()
    return () => { cancelled = true }
  }, [featuredOnly, activeOnly, useFallback, tick])

  return { categories, isLoading, error, source, refetch }
}
