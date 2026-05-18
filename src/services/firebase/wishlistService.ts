import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { getUserWishlistPath } from '../../constants/firebaseCollections'
import { mapFirestoreDoc } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse } from '../../types/firebase'
import type { UserWishlist, WishlistItem } from '../../types/wishlist'

export const wishlistService = {
  async getUserWishlist(userId: string): Promise<FirebaseServiceResponse<UserWishlist>> {
    try {
      const snap = await getDoc(doc(db, getUserWishlistPath(userId)))
      if (!snap.exists()) return { data: null, error: 'Wishlist not found', success: false }
      return { data: mapFirestoreDoc<UserWishlist>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get wishlist', success: false }
    }
  },

  async addItem(userId: string, item: WishlistItem): Promise<FirebaseServiceResponse<null>> {
    try {
      const ref = doc(db, getUserWishlistPath(userId))
      const snap = await getDoc(ref)
      if (!snap.exists()) {
        const newList: Omit<UserWishlist, 'id'> = {
          userId, items: [item], createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        }
        await setDoc(ref, newList)
      } else {
        const list = snap.data() as UserWishlist
        if (!list.items.some(i => i.productId === item.productId)) {
          await updateDoc(ref, { items: [...list.items, item], updatedAt: serverTimestamp() })
        }
      }
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to add to wishlist', success: false }
    }
  },

  async removeItem(userId: string, productId: string): Promise<FirebaseServiceResponse<null>> {
    try {
      const ref = doc(db, getUserWishlistPath(userId))
      const snap = await getDoc(ref)
      if (!snap.exists()) return { data: null, error: 'Wishlist not found', success: false }
      const list = snap.data() as UserWishlist
      await updateDoc(ref, { items: list.items.filter(i => i.productId !== productId), updatedAt: serverTimestamp() })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to remove from wishlist', success: false }
    }
  },
}
