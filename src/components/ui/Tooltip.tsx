import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import type { Position } from '../../types/ui'

interface TooltipProps {
  children:  ReactNode
  content:   ReactNode
  position?: Position
  className?: string
}

const positionClasses: Record<Position, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 pb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 pt-2',
  left:   'right-full top-1/2 -translate-y-1/2 pr-2',
  right:  'left-full top-1/2 -translate-y-1/2 pl-2',
}

const tooltipVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] as number[] },
  },
  exit: {
    opacity: 0, scale: 0.9,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
}

export function Tooltip({
  children,
  content,
  position = 'top',
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <div
            className={cn('absolute z-50 pointer-events-none', positionClasses[position])}
            role="tooltip"
            aria-hidden="true"
          >
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                px-2.5 py-1.5 rounded-lg text-xs font-medium
                bg-voltora-dark-surface text-white
                whitespace-nowrap shadow-lg
                border border-white/8
              "
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
