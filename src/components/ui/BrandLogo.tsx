import { Zap } from 'lucide-react'

interface BrandLogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

const sizeMap = {
  sm: { text: 'text-lg',    icon: 16, gap: 'gap-1.5' },
  md: { text: 'text-xl',    icon: 18, gap: 'gap-2'   },
  lg: { text: 'text-2xl',   icon: 22, gap: 'gap-2.5' },
}

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  showIcon = true,
  className = '',
}: BrandLogoProps) {
  const { text, icon, gap } = sizeMap[size]

  const voltColor  = variant === 'dark' ? 'text-white'     : 'text-voltora-black'
  const oraColor   = 'text-mint'
  const iconColor  = variant === 'dark' ? 'text-mint'      : 'text-voltora-black'
  const iconBg     = variant === 'dark' ? 'bg-mint/10'     : 'bg-voltora-dark-surface/10'

  return (
    <div
      className={`flex items-center ${gap} select-none ${className}`}
      aria-label="Voltora home"
    >
      {showIcon && (
        <span
          className={`
            flex items-center justify-center rounded
            ${iconBg} ${iconColor}
            p-1
          `}
          aria-hidden="true"
        >
          <Zap size={icon} strokeWidth={2.5} />
        </span>
      )}
      <span className={`font-bold tracking-tight ${text} leading-none`}>
        <span className={voltColor}>VOLT</span>
        <span className={oraColor}>ORA</span>
      </span>
    </div>
  )
}
