import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import type { DropdownItem } from '../../types/ui'

interface DropdownProps {
  trigger:    (props: { onClick: () => void; isOpen: boolean }) => ReactNode
  items:      DropdownItem[]
  align?:     'left' | 'right'
  className?: string
}

const menuVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: -6 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as number[] },
  },
  exit: {
    opacity: 0, scale: 0.96, y: -4,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
}

export function Dropdown({ trigger, items, align = 'left', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      {trigger({ onClick: () => setIsOpen(p => !p), isOpen })}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="Dropdown menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'absolute top-full mt-2 z-50 min-w-[180px]',
              'bg-voltora-dark-surface border border-white/8',
              'rounded-xl shadow-2xl shadow-black/40 overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((item, idx) => {
              const Icon = item.icon
              const base = cn(
                'flex items-center gap-3 w-full px-4 py-2.5 text-sm',
                'transition-all duration-150 text-left',
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                  : 'text-white/75 hover:text-white hover:bg-mint/[0.07]',
                item.disabled && 'opacity-40 pointer-events-none',
              )

              const content = (
                <>
                  {Icon && <Icon size={15} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />}
                  {item.label}
                </>
              )

              if (idx > 0 && item.danger && !items[idx - 1]?.danger) {
                return (
                  <div key={item.id}>
                    <div className="mx-3 my-1 border-t border-white/6" />
                    {item.href
                      ? <Link to={item.href} role="menuitem" className={base} onClick={() => setIsOpen(false)}>{content}</Link>
                      : <button type="button" role="menuitem" className={base} onClick={() => { item.onClick?.(); setIsOpen(false) }} disabled={item.disabled}>{content}</button>
                    }
                  </div>
                )
              }

              return item.href
                ? <Link key={item.id} to={item.href} role="menuitem" className={base} onClick={() => setIsOpen(false)}>{content}</Link>
                : <button key={item.id} type="button" role="menuitem" className={base} onClick={() => { item.onClick?.(); setIsOpen(false) }} disabled={item.disabled}>{content}</button>
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
