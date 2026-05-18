import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  documentId,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import { mapFirestoreDoc, mapFirestoreDocs } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse, FirebaseListResponse, FirestorePagination } from '../../types/firebase'
import type { FirestoreProduct } from '../../types/product'

const COL = FIREBASE_COLLECTIONS.PRODUCTS

// NOTE: Queries combining multiple where() clauses with orderBy() require
// Firestore composite indexes. Create them at Firebase Console > Firestore > Indexes.
// For development, orderBy is omitted from multi-where queries to avoid index requirements.
// Client-side sorting (sortProducts util) handles ordering after fetch.

export const productService = {
  async getProducts(pagination: FirestorePagination): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      const constraints: QueryConstraint[] = [
        orderBy(pagination.orderBy ?? 'createdAt', pagination.direction ?? 'desc'),
        limit(pagination.limit),
      ]
      if (pagination.startAfter) {
        const cursorSnap = await getDoc(doc(db, COL, pagination.startAfter))
        if (cursorSnap.exists()) constraints.push(startAfter(cursorSnap))
      }
      const snap = await getDocs(query(collection(db, COL), ...constraints))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: items.length === pagination.limit, lastDocId: snap.docs.at(-1)?.id ?? null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get products', success: false }
    }
  },

  async getActiveProducts(pageLimit = 50): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      // Single where clause allows simple orderBy without composite index
      const snap = await getDocs(query(collection(db, COL), where('isActive', '==', true), limit(pageLimit)))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: items.length === pageLimit, lastDocId: snap.docs.at(-1)?.id ?? null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get active products', success: false }
    }
  },

  async getFeaturedProducts(limitCount = 8): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      // NOTE: Adding orderBy here requires a composite index on (featured, isActive, salesCount).
      // Omitted to avoid index requirement; client-side sorting handles ordering.
      const snap = await getDocs(query(collection(db, COL), where('featured', '==', true), where('isActive', '==', true), limit(limitCount)))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get featured products', success: false }
    }
  },

  async getNewProducts(limitCount = 8): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('isNew', '==', true), where('isActive', '==', true), limit(limitCount)))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get new products', success: false }
    }
  },

  async getBestSellerProducts(limitCount = 8): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('isBestSeller', '==', true), where('isActive', '==', true), limit(limitCount)))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get best seller products', success: false }
    }
  },

  async getProductById(productId: string): Promise<FirebaseServiceResponse<FirestoreProduct>> {
    try {
      const snap = await getDoc(doc(db, COL, productId))
      if (!snap.exists()) return { data: null, error: 'Product not found', success: false }
      return { data: mapFirestoreDoc<FirestoreProduct>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get product', success: false }
    }
  },

  async getProductBySlug(slug: string): Promise<FirebaseServiceResponse<FirestoreProduct>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('slug', '==', slug), limit(1)))
      if (snap.empty) return { data: null, error: 'Product not found', success: false }
      return { data: mapFirestoreDoc<FirestoreProduct>(snap.docs[0]), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get product by slug', success: false }
    }
  },

  async getProductsByCategory(categoryId: string, pageLimit = 20): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      // NOTE: Adding orderBy here requires a composite index on (categoryId, isActive, salesCount).
      const snap = await getDocs(query(collection(db, COL), where('categoryId', '==', categoryId), where('isActive', '==', true), limit(pageLimit)))
      const items = mapFirestoreDocs<FirestoreProduct>(snap)
      return { items, total: items.length, hasMore: items.length === pageLimit, lastDocId: snap.docs.at(-1)?.id ?? null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get products by category', success: false }
    }
  },

  // NOTE: Firestore in() operator supports max 30 items per query.
  // For more than 30 IDs, batch into multiple queries.
  async getProductsByIds(productIds: string[]): Promise<FirebaseListResponse<FirestoreProduct>> {
    if (productIds.length === 0) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: null, success: true }
    }
    try {
      // Batch into groups of 30 (Firestore in() limit)
      const batches: Promise<FirestoreProduct[]>[] = []
      for (let i = 0; i < productIds.length; i += 30) {
        const chunk = productIds.slice(i, i + 30)
        batches.push(
          getDocs(query(collection(db, COL), where(documentId(), 'in', chunk)))
            .then(snap => mapFirestoreDocs<FirestoreProduct>(snap))
        )
      }
      const results = await Promise.all(batches)
      const items = results.flat()
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get products by IDs', success: false }
    }
  },

  // NOTE: Firestore does not support full-text search natively.
  // For production use Algolia, Meilisearch, or Firebase Extension (Typesense).
  // This fetches all active products and filters client-side.
  async searchProducts(queryText: string): Promise<FirebaseListResponse<FirestoreProduct>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('isActive', '==', true), limit(200)))
      const lower = queryText.toLowerCase()
      const items = mapFirestoreDocs<FirestoreProduct>(snap).filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.categoryName.toLowerCase().includes(lower) ||
        p.categoryId.toLowerCase().includes(lower) ||
        p.features.some(f => f.toLowerCase().includes(lower)) ||
        p.applications.some(a => a.toLowerCase().includes(lower))
      )
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Search failed', success: false }
    }
  },
}
