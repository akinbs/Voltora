import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { getUserCartPath } from '../../constants/firebaseCollections'
import { mapFirestoreDoc } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse } from '../../types/firebase'
import type { UserCart, FirestoreCartItem } from '../../types/cart'

export const cartService = {
  async getUserCart(userId: string): Promise<FirebaseServiceResponse<UserCart>> {
    try {
      const snap = await getDoc(doc(db, getUserCartPath(userId)))
      if (!snap.exists()) return { data: null, error: 'Cart not found', success: false }
      return { data: mapFirestoreDoc<UserCart>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get cart', success: false }
    }
  },

  async addItem(userId: string, item: FirestoreCartItem): Promise<FirebaseServiceResponse<null>> {
    try {
      const ref = doc(db, getUserCartPath(userId))
      const snap = await getDoc(ref)
      if (!snap.exists()) {
        const newCart: Omit<UserCart, 'id'> = {
          userId, items: [item],
          subtotal: item.price * item.quantity, discount: 0, shipping: 0,
          tax: 0, total: item.price * item.quantity, currency: item.currency,
          createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        }
        await setDoc(ref, newCart)
      } else {
        const cart = snap.data() as UserCart
        const existing = cart.items.findIndex(i => i.productId === item.productId)
        let items: FirestoreCartItem[]
        if (existing >= 0) {
          items = cart.items.map((i, idx) => idx === existing ? { ...i, quantity: i.quantity + item.quantity } : i)
        } else {
          items = [...cart.items, item]
        }
        await updateDoc(ref, { items, updatedAt: serverTimestamp() })
      }
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to add item to cart', success: false }
    }
  },

  async removeItem(userId: string, productId: string): Promise<FirebaseServiceResponse<null>> {
    try {
      const ref = doc(db, getUserCartPath(userId))
      const snap = await getDoc(ref)
      if (!snap.exists()) return { data: null, error: 'Cart not found', success: false }
      const cart = snap.data() as UserCart
      await updateDoc(ref, { items: cart.items.filter(i => i.productId !== productId), updatedAt: serverTimestamp() })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to remove item from cart', success: false }
    }
  },

  async clearCart(userId: string): Promise<FirebaseServiceResponse<null>> {
    try {
      await updateDoc(doc(db, getUserCartPath(userId)), { items: [], subtotal: 0, total: 0, updatedAt: serverTimestamp() })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to clear cart', success: false }
    }
  },
}
