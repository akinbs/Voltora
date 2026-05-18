import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface HoverGlowProps {
  children:   ReactNode
  className?: string
}

export function HoverGlow({ children, className }: HoverGlowProps) {
  return (
    <div className={cn('relative group', className)}>
      {/* Glow layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(207,255,226,0.10) 0%, transparent 70%)',
          boxShadow:  '0 0 0 1px rgba(207,255,226,0.12)',
        }}
      />
      {children}
    </div>
  )
}
