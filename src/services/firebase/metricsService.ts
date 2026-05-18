import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import type { FirebaseServiceResponse } from '../../types/firebase'
import type {
  DashboardMetric,
  RevenueChartPoint,
  ChartDataPoint,
  StockHealthPoint,
  TopProductMetric,
  CategoryDistributionPoint,
} from '../../types/admin'

const COL = FIREBASE_COLLECTIONS.ADMIN_METRICS

export const metricsService = {
  // ── Admin dashboard reads ─────────────────────────────────
  async getDashboardMetrics(): Promise<FirebaseServiceResponse<DashboardMetric>> {
    try {
      const snap = await getDoc(doc(db, COL, 'overview'))
      if (!snap.exists()) return { data: null, error: 'Metrics not found', success: false }
      return { data: { id: snap.id, ...snap.data() } as DashboardMetric, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get dashboard metrics', success: false }
    }
  },

  async getRevenueChartData(): Promise<FirebaseServiceResponse<RevenueChartPoint[]>> {
    try {
      const snap = await getDoc(doc(db, COL, 'revenueChart'))
      if (!snap.exists()) return { data: [], error: null, success: true }
      return { data: (snap.data().data as RevenueChartPoint[]) ?? [], error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get revenue chart', success: false }
    }
  },

  async getOrdersChartData(): Promise<FirebaseServiceResponse<ChartDataPoint[]>> {
    try {
      const snap = await getDoc(doc(db, COL, 'ordersChart'))
      if (!snap.exists()) return { data: [], error: null, success: true }
      return { data: (snap.data().data as ChartDataPoint[]) ?? [], error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get orders chart', success: false }
    }
  },

  async getStockHealthData(): Promise<FirebaseServiceResponse<StockHealthPoint[]>> {
    try {
      const snap = await getDoc(doc(db, COL, 'stockHealth'))
      if (!snap.exists()) return { data: [], error: null, success: true }
      return { data: (snap.data().data as StockHealthPoint[]) ?? [], error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get stock health data', success: false }
    }
  },

  async getTopProductsData(): Promise<FirebaseServiceResponse<TopProductMetric[]>> {
    try {
      const snap = await getDoc(doc(db, COL, 'topProducts'))
      if (!snap.exists()) return { data: [], error: null, success: true }
      return { data: (snap.data().data as TopProductMetric[]) ?? [], error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get top products', success: false }
    }
  },

  async getCategoryDistributionData(): Promise<FirebaseServiceResponse<CategoryDistributionPoint[]>> {
    try {
      const snap = await getDoc(doc(db, COL, 'categoryDistribution'))
      if (!snap.exists()) return { data: [], error: null, success: true }
      return { data: (snap.data().data as CategoryDistributionPoint[]) ?? [], error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get category distribution', success: false }
    }
  },

  // ── Product event tracking ────────────────────────────────
  async incrementProductView(productId: string): Promise<FirebaseServiceResponse<null>> {
    try {
      const ref = doc(db, FIREBASE_COLLECTIONS.PRODUCTS, productId)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        await updateDoc(ref, { viewCount: increment(1) })
      } else {
        await setDoc(ref, { viewCount: 1, updatedAt: serverTimestamp() }, { merge: true })
      }
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to record view', success: false }
    }
  },

  async incrementAddToCart(productId: string): Promise<FirebaseServiceResponse<null>> {
    try {
      await updateDoc(doc(db, FIREBASE_COLLECTIONS.PRODUCTS, productId), { salesCount: increment(1) })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to record add-to-cart', success: false }
    }
  },
}
