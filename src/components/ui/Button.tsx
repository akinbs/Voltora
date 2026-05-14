import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost' | 'outline' | 'danger'
export type ButtonSize    = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  leftIcon?:  LucideIcon
  rightIcon?: LucideIcon
  fullWidth?: boolean
  children?:  ReactNode
}

const variantMap: Record<ButtonVariant, string> = {
  primary: [
    'bg-mint text-voltora-black font-semibold',
    'hover:bg-mint-soft hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
    'shadow-sm hover:shadow-[0_4px_16px_rgba(162,213,198,0.45)]',
  ].join(' '),

  secondary: [
    'bg-white text-voltora-black font-medium',
    'border border-border',
    'hover:border-mint/40 hover:bg-mint-light hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98] shadow-sm',
  ].join(' '),

  dark: [
    'bg-voltora-black text-white font-medium',
    'border border-transparent',
    'hover:bg-voltora-dark-hover hover:border-mint/20 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'bg-transparent text-voltora-black font-medium',
    'hover:bg-black/5 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  outline: [
    'bg-transparent text-voltora-black font-medium',
    'border border-border',
    'hover:border-voltora-black hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  danger: [
    'bg-red-500 text-white font-medium',
    'hover:bg-red-600 hover:-translate-y-0.5',
    'active:translate-y-0 active:scale-[0.98] shadow-sm',
  ].join(' '),
}

const sizeMap: Record<ButtonSize, string> = {
  sm:   'h-8  px-3 text-xs  rounded-lg  gap-1.5',
  md:   'h-10 px-4 text-sm  rounded-xl  gap-2',
  lg:   'h-12 px-6 text-base rounded-xl gap-2.5',
  icon: 'h-10 w-10 rounded-xl',
}

const iconSize: Record<ButtonSize, number> = {
  sm: 14, md: 15, lg: 18, icon: 18,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = 'primary',
      size      = 'md',
      loading   = false,
      leftIcon:  Left,
      rightIcon: Right,
      fullWidth,
      children,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const sz = iconSize[size]

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100',
          variantMap[variant],
          sizeMap[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading
          ? <Loader2 size={sz} className="animate-spin" aria-hidden="true" />
          : Left && <Left size={sz} strokeWidth={1.75} aria-hidden="true" />
        }
        {size !== 'icon' && children}
        {!loading && Right && <Right size={sz} strokeWidth={1.75} aria-hidden="true" />}
      </button>
    )
  },
)

Button.displayName = 'Button'
