import type { HTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export type BadgeVariant = 'mint' | 'dark' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline'
export type BadgeSize    = 'sm' | 'md'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:  BadgeVariant
  size?:     BadgeSize
  leftIcon?: LucideIcon
  children:  ReactNode
}

const variantMap: Record<BadgeVariant, string> = {
  mint:    'bg-mint/15 text-[#1a5e3f] border border-mint/25',
  dark:    'bg-voltora-dark-surface text-white border border-white/10',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger:  'bg-red-50 text-red-600 border border-red-200',
  neutral: 'bg-surface text-muted border border-border',
  outline: 'bg-transparent text-voltora-black border border-border',
}

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-1.5 py-0.5 gap-1',
  md: 'text-xs px-2 py-1 gap-1.5',
}

export function Badge({
  variant  = 'neutral',
  size     = 'md',
  leftIcon: Icon,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold tracking-wide rounded-full leading-none',
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 9 : 11} strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  )
}
