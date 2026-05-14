import type { LucideIcon } from 'lucide-react'

export type Size     = 'sm' | 'md' | 'lg'
export type Align    = 'left' | 'center' | 'right'
export type Position = 'top' | 'bottom' | 'left' | 'right'

export interface DropdownItem {
  id:       string
  label:    string
  icon?:    LucideIcon
  onClick?: () => void
  href?:    string
  danger?:  boolean
  disabled?: boolean
}

export interface ActionConfig {
  label:    string
  onClick?: () => void
  href?:    string
}
