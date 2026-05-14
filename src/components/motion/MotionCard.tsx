import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface MotionCardProps {
  children:     ReactNode
  className?:   string
  interactive?: boolean
  glow?:        boolean
}

export function MotionCard({ children, className, interactive = true, glow = false }: MotionCardProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      whileHover={interactive && !reduced ? { y: -4, scale: 1.01 } : {}}
      whileTap={interactive && !reduced   ? { scale: 0.99 }         : {}}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'transition-shadow duration-300',
        glow && 'hover:shadow-[0_0_0_1px_rgba(207,255,226,0.20),0_8px_24px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
