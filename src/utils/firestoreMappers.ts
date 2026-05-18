import type { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'
import type { FirestoreProduct, Product } from '../types/product'

export function mapFirestoreDoc<T extends { id: string }>(snap: DocumentSnapshot): T {
  return { id: snap.id, ...snap.data() } as T
}

export function mapFirestoreDocs<T extends { id: string }>(snapshot: QuerySnapshot): T[] {
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as T))
}

export function removeUndefinedFields<T extends Record<string, unknown>>(
  data: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  ) as Partial<T>
}

export function prepareCreateData<T extends Record<string, unknown>>(
  data: T
): T & { createdAt: ReturnType<typeof serverTimestamp>; updatedAt: ReturnType<typeof serverTimestamp> } {
  const clean = removeUndefinedFields(data) as T
  return {
    ...clean,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}

export function prepareUpdateData<T extends Record<string, unknown>>(
  data: Partial<T>
): Partial<T> & { updatedAt: ReturnType<typeof serverTimestamp> } {
  const clean = removeUndefinedFields(data as T) as Partial<T>
  return { ...clean, updatedAt: serverTimestamp() }
}

export function mapFirestoreProductToProduct(fp: FirestoreProduct): Product {
  return {
    id:                 fp.id,
    name:               fp.name,
    slug:               fp.slug,
    category:           fp.categoryName,
    categoryId:         fp.categoryId,
    description:        fp.description,
    price:              fp.price,
    oldPrice:           fp.oldPrice,
    currency:           fp.currency,
    rating:             fp.rating,
    reviewCount:        fp.reviewCount,
    stock:              fp.stock,
    stockStatus:        fp.stockStatus,
    badges:             fp.badges,
    specs:              fp.specs,
    visualType:         fp.visualType,
    featured:           fp.featured,
    isNew:              fp.isNew,
    isBestSeller:       fp.isBestSeller,
    discountPercentage: fp.discountPercentage,
    sku:                fp.sku,
    brand:              fp.brand,
    longDescription:    fp.longDescription,
    features:           fp.features,
    applications:       fp.applications,
    packageIncludes:    fp.packageIncludes,
    datasheet:          fp.datasheet,
    technicalDetails:   fp.technicalDetails,
    storageImages:      fp.images.length > 0 ? fp.images : undefined,
  }
}
