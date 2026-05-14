import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?:      string
  helperText?: string
  error?:      string
  leftIcon?:   LucideIcon
  rightIcon?:  LucideIcon
  fullWidth?:  boolean
  inputSize?:  'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { input: 'h-9 text-sm px-3',   icon: 14 },
  md: { input: 'h-11 text-sm px-4',  icon: 16 },
  lg: { input: 'h-12 text-base px-4', icon: 18 },
}

export function Input({
  label,
  helperText,
  error,
  leftIcon:  LeftIcon,
  rightIcon: RightIcon,
  fullWidth  = true,
  inputSize  = 'md',
  id,
  disabled,
  className,
  ...props
}: InputProps) {
  const uid = useId()
  const inputId = id ?? `input_${uid.replace(/:/g, '_')}`
  const errorId = `${inputId}_error`
  const helpId  = `${inputId}_help`

  const { input: inputClasses, icon: iconSz } = sizeMap[inputSize]
  const hasLeft  = !!LeftIcon
  const hasRight = !!RightIcon

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-voltora-black leading-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon
            size={iconSz}
            strokeWidth={1.75}
            aria-hidden="true"
            className={cn(
              'absolute left-3.5 text-muted pointer-events-none',
              disabled && 'opacity-50',
            )}
          />
        )}

        <input
          id={inputId}
          disabled={disabled}
          aria-describedby={
            error ? errorId : helperText ? helpId : undefined
          }
          aria-invalid={!!error}
          className={cn(
            'w-full rounded-xl border bg-surface text-voltora-black',
            'placeholder:text-muted/60',
            'transition-all duration-200 outline-none',
            'hover:border-muted/50',
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-border focus:border-mint focus:ring-2 focus:ring-mint/20',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface',
            inputClasses,
            hasLeft  && 'pl-10',
            hasRight && 'pr-10',
            className,
          )}
          {...props}
        />

        {RightIcon && (
          <RightIcon
            size={iconSz}
            strokeWidth={1.75}
            aria-hidden="true"
            className={cn(
              'absolute right-3.5 text-muted pointer-events-none',
              disabled && 'opacity-50',
            )}
          />
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500 leading-snug">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helpId} className="text-xs text-muted leading-snug">
          {helperText}
        </p>
      )}
    </div>
  )
}
