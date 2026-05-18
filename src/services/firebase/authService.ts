import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from '../../lib/firebase'
import type { FirebaseServiceResponse } from '../../types/firebase'

export const authService = {
  getCurrentFirebaseUser(): User | null {
    return auth.currentUser
  },

  listenToAuthChanges(callback: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(auth, callback)
  },

  async signInWithEmail(
    email: string,
    password: string,
    rememberMe = true,
  ): Promise<FirebaseServiceResponse<User>> {
    try {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
      await setPersistence(auth, persistence)
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return { data: user, error: null, success: true }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? null
      return { data: null, error: code ?? (err instanceof Error ? err.message : 'Login failed'), success: false }
    }
  },

  async registerWithEmail(
    email: string,
    password: string,
    displayName: string,
  ): Promise<FirebaseServiceResponse<User>> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName })
      return { data: user, error: null, success: true }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? null
      return { data: null, error: code ?? (err instanceof Error ? err.message : 'Registration failed'), success: false }
    }
  },

  async sendPasswordReset(email: string): Promise<FirebaseServiceResponse<null>> {
    try {
      await sendPasswordResetEmail(auth, email)
      return { data: null, error: null, success: true }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? null
      return { data: null, error: code ?? (err instanceof Error ? err.message : 'Password reset failed'), success: false }
    }
  },

  async signOutUser(): Promise<FirebaseServiceResponse<null>> {
    try {
      await signOut(auth)
      return { data: null, error: null, success: true }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Logout failed', success: false }
    }
  },
}
