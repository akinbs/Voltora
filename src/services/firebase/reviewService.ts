import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import { mapFirestoreDocs } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse, FirebaseListResponse } from '../../types/firebase'
import type { Review, CreateReviewInput, UpdateReviewInput } from '../../types/review'

const COL = FIREBASE_COLLECTIONS.REVIEWS

export const reviewService = {
  async getProductReviews(productId: string, pageLimit = 20): Promise<FirebaseListResponse<Review>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('productId', '==', productId), where('isApproved', '==', true), orderBy('createdAt', 'desc'), limit(pageLimit)))
      const items = mapFirestoreDocs<Review>(snap)
      return { items, total: items.length, hasMore: items.length === pageLimit, lastDocId: snap.docs.at(-1)?.id ?? null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to get reviews', success: false }
    }
  },

  async addReview(data: CreateReviewInput): Promise<FirebaseServiceResponse<string>> {
    try {
      const ref = await addDoc(collection(db, COL), { ...data, isApproved: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      return { data: ref.id, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to add review', success: false }
    }
  },

  async updateReview(id: string, data: UpdateReviewInput): Promise<FirebaseServiceResponse<null>> {
    try {
      await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update review', success: false }
    }
  },

  async deleteReview(id: string): Promise<FirebaseServiceResponse<null>> {
    try {
      await deleteDoc(doc(db, COL, id))
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to delete review', success: false }
    }
  },
}

export type { Review, CreateReviewInput, UpdateReviewInput }
