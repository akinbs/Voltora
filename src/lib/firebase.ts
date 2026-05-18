import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth,      type Auth }              from 'firebase/auth'
import { getFirestore, type Firestore }         from 'firebase/firestore'
import { getStorage,   type FirebaseStorage }   from 'firebase/storage'
import { getAnalytics, type Analytics }         from 'firebase/analytics'
import { firebaseConfig } from './firebaseConfig'

// ── Singleton initialisation ──────────────────────────────────
function initFirebase(): FirebaseApp {
  if (getApps().length > 0) return getApp()
  return initializeApp(firebaseConfig)
}

const app: FirebaseApp = initFirebase()

export const auth:    Auth            = getAuth(app)
export const db:      Firestore       = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

// Analytics only runs in browser (not during SSR / Node builds)
export const analytics: Analytics | null =
  typeof window !== 'undefined' && firebaseConfig.measurementId
    ? getAnalytics(app)
    : null

export default app
