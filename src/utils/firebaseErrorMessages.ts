const AUTH_ERROR_MAP: Record<string, string> = {
  'auth/invalid-email':              'Please enter a valid email address.',
  'auth/user-disabled':              'This account has been disabled. Contact support.',
  'auth/user-not-found':             'No account found with this email address.',
  'auth/wrong-password':             'Incorrect password. Please try again.',
  'auth/invalid-credential':         'Invalid email or password.',
  'auth/email-already-in-use':       'An account with this email already exists.',
  'auth/weak-password':              'Password must be at least 6 characters.',
  'auth/operation-not-allowed':      'This sign-in method is not enabled.',
  'auth/too-many-requests':          'Too many failed attempts. Please try again later.',
  'auth/network-request-failed':     'Network error. Check your connection and try again.',
  'auth/popup-closed-by-user':       'Sign-in popup was closed before completing.',
  'auth/requires-recent-login':      'Please sign in again to continue.',
  'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method.',
  'auth/credential-already-in-use':  'These credentials are already linked to another account.',
  'auth/expired-action-code':        'This link has expired. Please request a new one.',
  'auth/invalid-action-code':        'This link is invalid. Please request a new one.',
  'auth/missing-email':              'Please enter your email address.',
  'auth/quota-exceeded':             'Service temporarily unavailable. Try again later.',
}

export function getFirebaseAuthErrorMessage(error: unknown): string {
  if (!error) return 'An unexpected error occurred.'
  const code = typeof error === 'string' ? error
    : (error as { code?: string })?.code ?? ''
  return AUTH_ERROR_MAP[code] ?? 'An unexpected error occurred. Please try again.'
}
