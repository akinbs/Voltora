import { cn } from '../../lib/cn'

type LoaderVariant = 'spinner' | 'dots' | 'circuit'
type LoaderSize    = 'sm' | 'md' | 'lg'

interface LoaderProps {
  variant?:  LoaderVariant
  size?:     LoaderSize
  label?:    string
  className?: string
}

const SIZE: Record<LoaderSize, { outer: string; dot: string; svg: number }> = {
  sm: { outer: 'gap-1',   dot: 'w-1 h-1',       svg: 16 },
  md: { outer: 'gap-1.5', dot: 'w-1.5 h-1.5',   svg: 22 },
  lg: { outer: 'gap-2',   dot: 'w-2 h-2',        svg: 28 },
}

export function Loader({ variant = 'spinner', size = 'md', label, className }: LoaderProps) {
  const s = SIZE[size]

  return (
    <span
      role="status"
      aria-label={label ?? 'Loading'}
      className={cn('inline-flex flex-col items-center gap-2', className)}
    >
      {variant === 'spinner' && (
        <svg
          width={s.svg}
          height={s.svg}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="animate-spin"
          style={{ color: '#CFFFE2' }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
          <path
            d="M12 2 A10 10 0 0 1 22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {variant === 'dots' && (
        <span className={cn('flex items-center', s.outer)}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={cn('rounded-full bg-mint circuit-dot', s.dot)}
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </span>
      )}

      {variant === 'circuit' && (
        <span className={cn('flex items-center gap-1', s.outer)}>
          <svg width={s.svg} height={s.svg} viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M2 11 H7 M15 11 H20" stroke="#CFFFE2" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11 2 V7 M11 15 V20" stroke="#CFFFE2" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="11" cy="11" r="3.5" stroke="#CFFFE2" strokeWidth="1.5" className="circuit-dot" />
            <circle cx="7"  cy="11" r="1"   fill="#CFFFE2"   className="circuit-dot" style={{ animationDelay: '0.2s' }} />
            <circle cx="15" cy="11" r="1"   fill="#CFFFE2"   className="circuit-dot" style={{ animationDelay: '0.4s' }} />
          </svg>
        </span>
      )}

      {label && (
        <span className="text-xs text-muted/60 font-medium">{label}</span>
      )}
    </span>
  )
}
