import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children:   ReactNode
  delay?:     number
  direction?: Direction
  className?: string
  once?:      boolean
}

const OFFSET = 16

function getInitial(direction: Direction) {
  switch (direction) {
    case 'up':    return { opacity: 0, y:  OFFSET }
    case 'down':  return { opacity: 0, y: -OFFSET }
    case 'left':  return { opacity: 0, x:  OFFSET }
    case 'right': return { opacity: 0, x: -OFFSET }
    default:      return { opacity: 0 }
  }
}

export function Reveal({
  children,
  delay     = 0,
  direction = 'up',
  className,
  once      = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={getInitial(direction)}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-48px' }}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
