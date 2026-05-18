import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User, Unsubscribe } from 'firebase/auth'
import { authService } from '../services/firebase/authService'
import { userService } from '../services/firebase/userService'
import { getFirebaseAuthErrorMessage } from '../utils/firebaseErrorMessages'
import { buildUserProfileFromFirebaseUser, isAdminRole, isSuperAdminRole } from '../utils/userHelpers'
import type { LoginFormValues, RegisterFormValues, AuthActionResult } from '../types/auth'
import type { UserProfile } from '../types/user'

interface AuthState {
  userProfile:     UserProfile | null
  isAuthenticated: boolean
  isLoading:       boolean
  error:           string | null
}

export interface AuthContextValue extends AuthState {
  login:          (values: LoginFormValues)    => Promise<AuthActionResult>
  register:       (values: RegisterFormValues) => Promise<AuthActionResult>
  logout:         () => Promise<void>
  forgotPassword: (email: string)              => Promise<AuthActionResult>
  clearError:     () => void
  isAdmin:        boolean
  isSuperAdmin:   boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading,   setIsLoading]   = useState(true)
  const [error,       setError]       = useState<string | null>(null)

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined
    unsubscribe = authService.listenToAuthChanges(async (firebaseUser: User | null) => {
      if (!firebaseUser) {
        setUserProfile(null)
        setIsLoading(false)
        return
      }
      try {
        const result = await userService.getUserProfile(firebaseUser.uid)
        if (result.success && result.data) {
          setUserProfile(result.data)
        } else {
          setUserProfile(buildUserProfileFromFirebaseUser(firebaseUser))
        }
      } catch {
        setUserProfile(buildUserProfileFromFirebaseUser(firebaseUser))
      } finally {
        setIsLoading(false)
      }
    })
    return () => unsubscribe?.()
  }, [])

  const login = useCallback(async (values: LoginFormValues): Promise<AuthActionResult> => {
    setIsLoading(true)
    setError(null)
    const result = await authService.signInWithEmail(values.email, values.password, values.rememberMe)
    if (!result.success) {
      const msg = getFirebaseAuthErrorMessage(result.error)
      setError(msg)
      setIsLoading(false)
      return { success: false, error: msg }
    }
    if (result.data) {
      void userService.updateUserLastLogin(result.data.uid)
    }
    return { success: true, error: null }
  }, [])

  const register = useCallback(async (values: RegisterFormValues): Promise<AuthActionResult> => {
    setIsLoading(true)
    setError(null)
    const result = await authService.registerWithEmail(values.email, values.password, values.fullName)
    if (!result.success || !result.data) {
      const msg = getFirebaseAuthErrorMessage(result.error)
      setError(msg)
      setIsLoading(false)
      return { success: false, error: msg }
    }
    const firebaseUser = result.data
    const initials = values.fullName
      .trim().split(/\s+/).slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('')
    await userService.createUserProfile(firebaseUser.uid, {
      uid:               firebaseUser.uid,
      fullName:          values.fullName,
      email:             values.email,
      role:              'customer',
      status:            'active',
      avatarInitials:    initials || 'U',
      preferredCurrency: 'USD',
      savedAddresses:    [],
    })
    return { success: true, error: null }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    setError(null)
    await authService.signOutUser()
    setUserProfile(null)
  }, [])

  const forgotPassword = useCallback(async (email: string): Promise<AuthActionResult> => {
    setError(null)
    const result = await authService.sendPasswordReset(email)
    if (!result.success) {
      const msg = getFirebaseAuthErrorMessage(result.error)
      setError(msg)
      return { success: false, error: msg }
    }
    return { success: true, error: null }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const role = userProfile?.role

  return (
    <AuthContext.Provider value={{
      userProfile,
      isAuthenticated: !!userProfile,
      isLoading,
      error,
      login,
      register,
      logout,
      forgotPassword,
      clearError,
      isAdmin:      isAdminRole(role),
      isSuperAdmin: isSuperAdminRole(role),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
