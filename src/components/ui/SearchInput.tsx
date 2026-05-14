import type { InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value:       string
  onChange:    (value: string) => void
  onClear?:    () => void
  placeholder?: string
  className?:  string
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search components, sensors, modules…',
  className,
  disabled,
  ...props
}: SearchInputProps) {
  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      onChange('')
    }
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search
        size={15}
        strokeWidth={1.75}
        aria-hidden="true"
        className={cn(
          'absolute left-3.5 text-muted pointer-events-none shrink-0',
          disabled && 'opacity-50',
        )}
      />

      <input
        type="search"
        role="searchbox"
        aria-label="Search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full h-10 pl-10 pr-10 rounded-xl text-sm',
          'bg-white border border-border text-voltora-black',
          'placeholder:text-muted/60',
          'transition-all duration-200 outline-none',
          'hover:border-muted/50',
          'focus:border-mint focus:ring-2 focus:ring-mint/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[&::-webkit-search-cancel-button]:hidden',
        )}
        {...props}
      />

      {value && !disabled && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className="
            absolute right-3 flex items-center justify-center
            w-5 h-5 rounded-full
            text-muted hover:text-voltora-black hover:bg-border/60
            transition-colors duration-150
          "
        >
          <X size={12} strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
