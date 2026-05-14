import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform, animate, motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface AnimatedCounterProps {
  value:     number
  suffix?:   string
  prefix?:   string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix   = '',
  prefix   = '',
  duration = 1.8,
  className,
}: AnimatedCounterProps) {
  const reduced = usePrefersReducedMotion()
  const ref     = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })

  const count   = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v).toLocaleString('en-US'))

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [inView, value, duration, count, reduced])

  if (reduced) {
    return (
      <span className={className}>
        {prefix}{value.toLocaleString('en-US')}{suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
