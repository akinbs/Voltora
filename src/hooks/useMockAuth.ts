import { useState, useCallback } from 'react'
import type { MockUser } from '../types/user'
import type { LoginFormValues, RegisterFormValues } from '../types/auth'
import { mockUser } from '../data/mockUser'

interface AuthState {
  user:            MockUser | null
  isAuthenticated: boolean
  isLoading:       boolean
  error:           string | null
}

export function useMockAuth() {
  const [state, setState] = useState<AuthState>({
    user:            mockUser,   // start authenticated for demo
    isAuthenticated: true,
    isLoading:       false,
    error:           null,
  })

  const login = useCallback(async (values: LoginFormValues): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    await new Promise(r => setTimeout(r, 800))
    if (!values.email || !values.password) {
      setState(prev => ({ ...prev, isLoading: false, error: 'Invalid credentials.' }))
      return false
    }
    setState({
      user:            mockUser,
      isAuthenticated: true,
      isLoading:       false,
      error:           null,
    })
    return true
  }, [])

  const register = useCallback(async (values: RegisterFormValues): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    await new Promise(r => setTimeout(r, 1000))
    if (values.password !== values.confirmPassword) {
      setState(prev => ({ ...prev, isLoading: false, error: 'Passwords do not match.' }))
      return false
    }
    const newUser: MockUser = {
      ...mockUser,
      fullName:       values.fullName,
      email:          values.email,
      avatarInitials: values.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    }
    setState({
      user:            newUser,
      isAuthenticated: true,
      isLoading:       false,
      error:           null,
    })
    return true
  }, [])

  const logout = useCallback(() => {
    setState({
      user:            null,
      isAuthenticated: false,
      isLoading:       false,
      error:           null,
    })
  }, [])

  const forgotPassword = useCallback(async (email: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    await new Promise(r => setTimeout(r, 700))
    setState(prev => ({ ...prev, isLoading: false }))
    return !!email
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    user:            state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading:       state.isLoading,
    error:           state.error,
    login,
    register,
    logout,
    forgotPassword,
    clearError,
  }
}
