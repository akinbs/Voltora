import { serverTimestamp, Timestamp } from 'firebase/firestore'
import type { FieldValue } from 'firebase/firestore'

export type FirestoreTimestampValue = Date | Timestamp | FieldValue | string | null

export function getServerTimestamp(): FieldValue {
  return serverTimestamp()
}

export function getClientTimestamp(): Date {
  return new Date()
}

export function normalizeFirestoreDate(value: unknown): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  if (value instanceof Timestamp) return value.toDate()
  if (typeof value === 'string') {
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  }
  if (typeof value === 'object' && 'seconds' in (value as object)) {
    const ts = value as { seconds: number; nanoseconds: number }
    return new Date(ts.seconds * 1000)
  }
  return null
}

export function createTimestamps(): { createdAt: FieldValue; updatedAt: FieldValue } {
  return { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
}

export function updateTimestamp(): { updatedAt: FieldValue } {
  return { updatedAt: serverTimestamp() }
}
