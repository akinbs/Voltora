import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { FIREBASE_COLLECTIONS } from '../../constants/firebaseCollections'
import { mapFirestoreDoc } from '../../utils/firestoreMappers'
import type { FirebaseServiceResponse } from '../../types/firebase'
import type { UserProfile, UserRole, CreateUserProfileInput, UpdateUserProfileInput } from '../../types/user'

const COL = FIREBASE_COLLECTIONS.USERS

export const userService = {
  async getUserProfile(uid: string): Promise<FirebaseServiceResponse<UserProfile>> {
    try {
      const snap = await getDoc(doc(db, COL, uid))
      if (!snap.exists()) return { data: null, error: 'User profile not found', success: false }
      return { data: mapFirestoreDoc<UserProfile>(snap), error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to get user profile', success: false }
    }
  },

  async createUserProfile(uid: string, data: CreateUserProfileInput): Promise<FirebaseServiceResponse<null>> {
    try {
      await setDoc(doc(db, COL, uid), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create user profile', success: false }
    }
  },

  async updateUserProfile(uid: string, data: UpdateUserProfileInput): Promise<FirebaseServiceResponse<null>> {
    try {
      await updateDoc(doc(db, COL, uid), {
        ...data,
        updatedAt: serverTimestamp(),
      })
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update user profile', success: false }
    }
  },

  async getUserRole(uid: string): Promise<UserRole> {
    try {
      const snap = await getDoc(doc(db, COL, uid))
      if (!snap.exists()) return 'customer'
      return (snap.data().role as UserRole) ?? 'customer'
    } catch {
      return 'customer'
    }
  },

  async ensureUserProfile(uid: string, data: CreateUserProfileInput): Promise<FirebaseServiceResponse<UserProfile>> {
    const existing = await userService.getUserProfile(uid)
    if (existing.success && existing.data) return existing
    const createResult = await userService.createUserProfile(uid, data)
    if (!createResult.success) return { data: null, error: createResult.error, success: false }
    return userService.getUserProfile(uid)
  },

  async updateUserLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, COL, uid), { lastLoginAt: serverTimestamp() })
    } catch {
      // non-critical, ignore
    }
  },
}
