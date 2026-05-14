import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface IconButtonProps {
  icon:       LucideIcon
  label:      string
  onClick?:   () => void
  badge?:     number
  variant?:   'ghost' | 'mint'
  size?:      'sm' | 'md'
  className?: string
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  badge,
  variant = 'ghost',
  size = 'md',
  className = '',
}: IconButtonProps) {
  const base = `
    relative inline-flex items-center justify-center rounded-lg
    transition-all duration-200 focus-visible:outline focus-visible:outline-2
    focus-visible:outline-mint focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.93]
  `
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
  }
  const variants = {
    ghost: 'text-white/70 hover:text-white hover:bg-white/8 active:bg-white/12',
    mint:  'text-mint hover:text-mint/80 hover:bg-mint/10 active:bg-mint/15',
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <Icon size={size === 'sm' ? 16 : 20} strokeWidth={1.75} aria-hidden="true" />

      <AnimatePresence>
        {badge !== undefined && badge > 0 && (
          <motion.span
            key={badge}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
              flex items-center justify-center
              text-[10px] font-bold leading-none
              bg-mint text-voltora-black rounded-full
            "
            aria-label={`${badge} items`}
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
