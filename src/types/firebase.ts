import type { Timestamp } from 'firebase/firestore'

// ── Timestamp ─────────────────────────────────────────────────
export interface FirebaseTimestampLike {
  seconds:     number
  nanoseconds: number
  toDate: () => Date
}

// ── Base document shape every Firestore doc extends ───────────
export interface FirebaseDocumentBase {
  id:        string
  createdAt: Timestamp | FirebaseTimestampLike
  updatedAt: Timestamp | FirebaseTimestampLike
}

// ── Generic service response ──────────────────────────────────
export interface FirebaseServiceResponse<T> {
  data:    T | null
  error:   string | null
  success: boolean
}

// ── Paginated list response ───────────────────────────────────
export interface FirebaseListResponse<T> {
  items:       T[]
  total:       number
  hasMore:     boolean
  lastDocId:   string | null
  error:       string | null
  success:     boolean
}

// ── Storage upload result ─────────────────────────────────────
export interface FirebaseUploadResult {
  downloadURL: string
  storagePath: string
  fileName:    string
  contentType: string
  size:        number
}

// ── User roles ────────────────────────────────────────────────
export type FirebaseRole = 'customer' | 'admin' | 'moderator'

// ── Firestore query helpers ───────────────────────────────────
export type FirestoreOrderDirection = 'asc' | 'desc'

export interface FirestorePagination {
  limit:      number
  startAfter?: string
  orderBy?:   string
  direction?: FirestoreOrderDirection
}
