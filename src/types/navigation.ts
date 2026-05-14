import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  id: string
  label: string
  href: string
  icon: LucideIcon
}

export interface NavSection {
  title: string
  links: NavLink[]
}

export interface NavAction {
  id: string
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

export interface ProfileMenuItem {
  id: string
  label: string
  href: string
  icon: LucideIcon
  variant?: 'default' | 'danger'
}
