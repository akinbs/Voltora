import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export interface FirebaseHealthResult {
  connected: boolean
  latencyMs: number | null
  error:     string | null
}

export async function checkFirebaseHealth(): Promise<FirebaseHealthResult> {
  const start = Date.now()
  try {
    // Lightweight read of a non-existent doc — just tests connectivity
    await getDoc(doc(db, '__health__', 'ping'))
    return { connected: true, latencyMs: Date.now() - start, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { connected: false, latencyMs: null, error: message }
  }
}

export function getFirebaseProjectId(): string {
  return import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'not-configured'
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  )
}
