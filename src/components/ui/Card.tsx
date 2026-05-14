import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type CardVariant = 'default' | 'glass' | 'dark' | 'interactive' | 'bordered'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:     CardVariant
  padding?:     CardPadding
  interactive?: boolean
  children?:    ReactNode
}

const variantMap: Record<CardVariant, string> = {
  default:     'bg-white border border-border shadow-sm',
  glass:       'bg-white/60 backdrop-blur-sm border border-white/25 shadow-sm',
  dark:        [
    'bg-voltora-dark-surface border border-white/8 text-white',
    'hover:border-mint/18 transition-colors duration-250',
  ].join(' '),
  interactive: [
    'bg-white border border-border shadow-sm cursor-pointer',
    'hover:-translate-y-1 hover:border-mint/30 hover:shadow-lg hover:shadow-mint/5',
    'focus-within:border-mint/25',
    'transition-all duration-250',
  ].join(' '),
  bordered:    'bg-white border-2 border-border',
}

const paddingMap: Record<CardPadding, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
}

export function Card({ variant = 'default', padding = 'md', interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-200',
        variantMap[variant],
        paddingMap[padding],
        interactive && variant !== 'interactive' && [
          'cursor-pointer hover:-translate-y-1 hover:shadow-md hover:shadow-mint/4',
          'focus-within:border-mint/25',
        ].join(' '),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function CardHeader({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn('flex flex-col gap-1 mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: CardSectionProps) {
  return (
    <h3 className={cn('text-base font-semibold leading-tight', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: CardSectionProps) {
  return (
    <p className={cn('text-sm text-muted leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-inherit', className)} {...props}>
      {children}
    </div>
  )
}
