import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import { mapFirestoreDoc, mapFirestoreDocs } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse, FirebaseListResponse } from '../../types/firebase'
import type { Category } from '../../types/category'

const COL = FIREBASE_COLLECTIONS.CATEGORIES

export const categoryService = {
  async getCategories(): Promise<FirebaseListResponse<Category>> {
    try {
      const snap = await getDocs(query(collection(db, COL), orderBy('sortOrder', 'asc')))
      const items = mapFirestoreDocs<Category>(snap)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get categories', success: false }
    }
  },

  async getActiveCategories(): Promise<FirebaseListResponse<Category>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('isActive', '==', true), orderBy('sortOrder', 'asc')))
      const items = mapFirestoreDocs<Category>(snap)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get active categories', success: false }
    }
  },

  async getFeaturedCategories(limitCount = 8): Promise<FirebaseListResponse<Category>> {
    try {
      // NOTE: where(isActive) + where(featured) + orderBy(sortOrder) requires a composite index.
      // If you see an index error, create it at Firebase Console > Firestore > Indexes.
      const snap = await getDocs(query(collection(db, COL), where('isActive', '==', true), where('featured', '==', true), limit(limitCount)))
      const items = mapFirestoreDocs<Category>(snap).sort((a, b) => a.sortOrder - b.sortOrder)
      return { items, total: items.length, hasMore: false, lastDocId: null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get featured categories', success: false }
    }
  },

  async getCategoryById(categoryId: string): Promise<FirebaseServiceResponse<Category>> {
    try {
      const snap = await getDoc(doc(db, COL, categoryId))
      if (!snap.exists()) return { data: null, error: 'Category not found', success: false }
      return { data: mapFirestoreDoc<Category>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get category', success: false }
    }
  },

  async getCategoryBySlug(slug: string): Promise<FirebaseServiceResponse<Category>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('slug', '==', slug), limit(1)))
      if (snap.empty) return { data: null, error: 'Category not found', success: false }
      return { data: mapFirestoreDoc<Category>(snap.docs[0]), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get category by slug', success: false }
    }
  },

  // Reads the productCount field stored on each category document.
  // NOTE: For production, maintain this count via Cloud Functions triggered on
  // product create/delete, or use Firestore aggregation queries (count()).
  async getCategoryProductCounts(): Promise<Record<string, number>> {
    try {
      const snap = await getDocs(query(collection(db, COL), orderBy('sortOrder', 'asc')))
      const counts: Record<string, number> = {}
      snap.docs.forEach(d => {
        counts[d.id] = (d.data().productCount as number) ?? 0
      })
      return counts
    } catch {
      return {}
    }
  },
}
