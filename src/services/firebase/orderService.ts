import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import { mapFirestoreDoc, mapFirestoreDocs } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse, FirebaseListResponse } from '../../types/firebase'
import type { Order, OrderStatus, CreateOrderInput, UpdateOrderStatusInput } from '../../types/order'

const COL = FIREBASE_COLLECTIONS.ORDERS

export const orderService = {
  async getOrder(id: string): Promise<FirebaseServiceResponse<Order>> {
    try {
      const snap = await getDoc(doc(db, COL, id))
      if (!snap.exists()) return { data: null, error: 'Order not found', success: false }
      return { data: mapFirestoreDoc<Order>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get order', success: false }
    }
  },

  async getUserOrders(userId: string, pageLimit = 10): Promise<FirebaseListResponse<Order>> {
    try {
      const snap = await getDocs(query(collection(db, COL), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(pageLimit)))
      const items = mapFirestoreDocs<Order>(snap)
      return { items, total: items.length, hasMore: items.length === pageLimit, lastDocId: snap.docs.at(-1)?.id ?? null, error: null, success: true }
    } catch (err) {
      return { items: [], total: 0, hasMore: false, lastDocId: null, error: err instanceof Error ? err.message : 'Failed to list orders', success: false }
    }
  },

  async createOrder(data: CreateOrderInput): Promise<FirebaseServiceResponse<string>> {
    try {
      const ref = await addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      return { data: ref.id, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create order', success: false }
    }
  },

  async updateOrderStatus(input: UpdateOrderStatusInput): Promise<FirebaseServiceResponse<null>> {
    try {
      const { id, ...fields } = input
      await updateDoc(doc(db, COL, id), { ...fields, updatedAt: serverTimestamp() })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update order status', success: false }
    }
  },
}

export type { Order, OrderStatus, CreateOrderInput, UpdateOrderStatusInput }
