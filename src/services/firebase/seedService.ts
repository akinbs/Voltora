import {
  doc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
  seedReviews,
  seedSettings,
  seedDashboardMetrics,
  seedRevenueChartData,
  seedOrdersChartData,
  seedStockHealthData,
  seedTopProductsData,
  seedCategoryDistributionData,
} from '../../data/seed'
import type { FirebaseServiceResponse } from '../../types/firebase'

type SeedResult = { count: number }

function toTimestamp(value: unknown): Timestamp {
  if (value instanceof Date) return Timestamp.fromDate(value)
  if (value instanceof Timestamp) return value
  return Timestamp.now()
}

function normalizeDates<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      if (v instanceof Date) return [k, toTimestamp(v)]
      return [k, v]
    })
  ) as T
}

// ── Guard: only runs in DEV unless explicitly allowed ─────────
function assertSeedAllowed(allowProductionSeed = false): void {
  if (!import.meta.env.DEV && !allowProductionSeed) {
    throw new Error('Seed functions are disabled in production. Pass allowProductionSeed: true to override.')
  }
}

// ── Seed categories ───────────────────────────────────────────
export async function seedCategoriesService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const batch = writeBatch(db)
    for (const cat of seedCategories) {
      const { id, ...data } = cat
      batch.set(doc(db, FIREBASE_COLLECTIONS.CATEGORIES, id), normalizeDates(data as Record<string, unknown>))
    }
    await batch.commit()
    return { data: { count: seedCategories.length }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed categories', success: false }
  }
}

// ── Seed products ─────────────────────────────────────────────
export async function seedProductsService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    // writeBatch limit is 500 writes — products count is well within range
    const batch = writeBatch(db)
    for (const product of seedProducts) {
      const { id, ...data } = product
      batch.set(doc(db, FIREBASE_COLLECTIONS.PRODUCTS, id), normalizeDates(data as Record<string, unknown>))
    }
    await batch.commit()
    return { data: { count: seedProducts.length }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed products', success: false }
  }
}

// ── Seed users (Firestore profiles only — NO Auth user creation) ─
export async function seedUsersService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const batch = writeBatch(db)
    for (const user of seedUsers) {
      const { id, ...data } = user
      batch.set(doc(db, FIREBASE_COLLECTIONS.USERS, id), normalizeDates(data as Record<string, unknown>))
    }
    await batch.commit()
    return { data: { count: seedUsers.length }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed users', success: false }
  }
}

// ── Seed orders ───────────────────────────────────────────────
export async function seedOrdersService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const batch = writeBatch(db)
    for (const order of seedOrders) {
      const { id, ...data } = order
      batch.set(doc(db, FIREBASE_COLLECTIONS.ORDERS, id), normalizeDates(data as Record<string, unknown>))
    }
    await batch.commit()
    return { data: { count: seedOrders.length }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed orders', success: false }
  }
}

// ── Seed reviews ──────────────────────────────────────────────
export async function seedReviewsService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const batch = writeBatch(db)
    for (const review of seedReviews) {
      const { id, ...data } = review
      batch.set(doc(db, FIREBASE_COLLECTIONS.REVIEWS, id), normalizeDates(data as Record<string, unknown>))
    }
    await batch.commit()
    return { data: { count: seedReviews.length }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed reviews', success: false }
  }
}

// ── Seed store settings ───────────────────────────────────────
export async function seedSettingsService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const { setDoc: setDocument } = await import('firebase/firestore')
    const { id, ...data } = seedSettings
    await setDocument(doc(db, FIREBASE_COLLECTIONS.SETTINGS, id), normalizeDates(data as Record<string, unknown>))
    return { data: { count: 1 }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed settings', success: false }
  }
}

// ── Seed admin metrics ────────────────────────────────────────
export async function seedAdminMetricsService(): Promise<FirebaseServiceResponse<SeedResult>> {
  try {
    assertSeedAllowed()
    const { setDoc: setDocument } = await import('firebase/firestore')
    const col = FIREBASE_COLLECTIONS.ADMIN_METRICS

    await Promise.all([
      setDocument(doc(db, col, 'overview'),             normalizeDates({ ...seedDashboardMetrics, id: undefined } as Record<string, unknown>)),
      setDocument(doc(db, col, 'revenueChart'),          { data: seedRevenueChartData }),
      setDocument(doc(db, col, 'ordersChart'),           { data: seedOrdersChartData }),
      setDocument(doc(db, col, 'stockHealth'),           { data: seedStockHealthData }),
      setDocument(doc(db, col, 'topProducts'),           { data: seedTopProductsData }),
      setDocument(doc(db, col, 'categoryDistribution'),  { data: seedCategoryDistributionData }),
    ])
    return { data: { count: 6 }, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to seed admin metrics', success: false }
  }
}

// ── Seed all (sequential to respect Firestore ordering) ───────
export async function seedAll(options?: { allowProductionSeed?: boolean }): Promise<FirebaseServiceResponse<Record<string, number>>> {
  assertSeedAllowed(options?.allowProductionSeed)
  const results: Record<string, number> = {}
  const steps: Array<[string, () => Promise<FirebaseServiceResponse<SeedResult>>]> = [
    ['categories',    seedCategoriesService],
    ['products',      seedProductsService],
    ['users',         seedUsersService],
    ['orders',        seedOrdersService],
    ['reviews',       seedReviewsService],
    ['settings',      seedSettingsService],
    ['adminMetrics',  seedAdminMetricsService],
  ]
  for (const [name, fn] of steps) {
    const res = await fn()
    if (!res.success) return { data: null, error: `Failed at step [${name}]: ${res.error}`, success: false }
    results[name] = res.data?.count ?? 0
  }
  return { data: results, error: null, success: true }
}

// ── Clear seed data (DEV only — only deletes known seed IDs) ──
// WARNING: This deletes all documents written by seedAll.
// Do NOT call in production. Only useful during development resets.
export async function clearSeedData(): Promise<FirebaseServiceResponse<null>> {
  try {
    assertSeedAllowed()
    const batch = writeBatch(db)

    for (const c of seedCategories)   batch.delete(doc(db, FIREBASE_COLLECTIONS.CATEGORIES, c.id))
    for (const p of seedProducts)     batch.delete(doc(db, FIREBASE_COLLECTIONS.PRODUCTS,   p.id))
    for (const u of seedUsers)        batch.delete(doc(db, FIREBASE_COLLECTIONS.USERS,       u.id))
    for (const o of seedOrders)       batch.delete(doc(db, FIREBASE_COLLECTIONS.ORDERS,      o.id))
    for (const r of seedReviews)      batch.delete(doc(db, FIREBASE_COLLECTIONS.REVIEWS,     r.id))
    batch.delete(doc(db, FIREBASE_COLLECTIONS.SETTINGS, 'store'))
    for (const metricDoc of ['overview', 'revenueChart', 'ordersChart', 'stockHealth', 'topProducts', 'categoryDistribution']) {
      batch.delete(doc(db, FIREBASE_COLLECTIONS.ADMIN_METRICS, metricDoc))
    }

    await batch.commit()
    return { data: null, error: null, success: true }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to clear seed data', success: false }
  }
}
