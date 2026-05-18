import type { User } from 'firebase/auth'
import type { UserProfile, UserRole } from '../types/user'

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getDefaultUserRole(): UserRole {
  return 'customer'
}

export function isAdminRole(role: UserRole | undefined): boolean {
  return role === 'admin' || role === 'super_admin'
}

export function isSuperAdminRole(role: UserRole | undefined): boolean {
  return role === 'super_admin'
}

export function buildUserProfileFromFirebaseUser(firebaseUser: User): UserProfile {
  const displayName = firebaseUser.displayName ?? ''
  return {
    id:                firebaseUser.uid,
    uid:               firebaseUser.uid,
    fullName:          displayName,
    email:             firebaseUser.email ?? '',
    role:              'customer',
    status:            'active',
    avatarInitials:    getInitials(displayName) || 'U',
    preferredCurrency: 'USD',
    savedAddresses:    [],
    createdAt:         null,
    updatedAt:         null,
  }
}
