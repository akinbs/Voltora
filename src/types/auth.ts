export interface LoginFormValues {
  email:      string
  password:   string
  rememberMe: boolean
}

export interface RegisterFormValues {
  fullName:        string
  email:           string
  password:        string
  confirmPassword: string
  acceptTerms:     boolean
}

export interface ForgotPasswordFormValues {
  email: string
}

export type AuthMode = 'login' | 'register' | 'forgot-password'

export interface AuthActionResult {
  success: boolean
  error:   string | null
}

export interface AuthUser {
  uid:           string
  email:         string | null
  displayName:   string | null
  emailVerified: boolean
}
