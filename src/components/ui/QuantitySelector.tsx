import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/cn'

interface QuantitySelectorProps {
  value:     number
  onChange:  (value: number) => void
  min?:      number
  max?:      number
  disabled?: boolean
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min      = 1,
  max,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && (max === undefined || value < max)

  const handleDecrease = () => { if (canDecrease) onChange(value - 1) }
  const handleIncrease = () => { if (canIncrease) onChange(value + 1) }

  const btnBase = cn(
    'flex items-center justify-center w-9 h-9 shrink-0',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:z-10',
  )

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl overflow-hidden',
        'bg-white border border-border',
        disabled && 'opacity-50',
        className,
      )}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={handleDecrease}
        disabled={!canDecrease}
        className={cn(
          btnBase,
          'border-r border-border',
          canDecrease
            ? 'text-voltora-black hover:bg-surface hover:text-mint'
            : 'text-muted/40 cursor-not-allowed',
        )}
      >
        <Minus size={14} strokeWidth={2.5} aria-hidden="true" />
      </button>

      <output
        aria-live="polite"
        className="
          min-w-[40px] px-3 text-center text-sm font-semibold
          text-voltora-black tabular-nums select-none
        "
      >
        {value}
      </output>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleIncrease}
        disabled={!canIncrease}
        className={cn(
          btnBase,
          'border-l border-border',
          canIncrease
            ? 'text-voltora-black hover:bg-surface hover:text-mint'
            : 'text-muted/40 cursor-not-allowed',
        )}
      >
        <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </div>
  )
}
