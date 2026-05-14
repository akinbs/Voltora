import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'

type DrawerPosition = 'left' | 'right' | 'bottom'

interface DrawerProps {
  open:         boolean
  onClose:      () => void
  position?:    DrawerPosition
  title?:       string
  description?: string
  children?:    ReactNode
}

type PanelState = { x?: string | number; y?: string | number }

const panelVariants: Record<DrawerPosition, { hidden: PanelState; visible: PanelState }> = {
  left:   { hidden: { x: '-100%' }, visible: { x: 0 } },
  right:  { hidden: { x: '100%' },  visible: { x: 0 } },
  bottom: { hidden: { y: '100%' },  visible: { y: 0 } },
}

const panelClasses: Record<DrawerPosition, string> = {
  left:   'top-0 left-0 h-full w-80 max-w-[90vw]',
  right:  'top-0 right-0 h-full w-80 max-w-[90vw]',
  bottom: 'bottom-0 left-0 right-0 max-h-[85dvh] rounded-t-2xl',
}

const transition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as number[] }
const exitTransition = { duration: 0.22, ease: 'easeIn' }

export function Drawer({
  open,
  onClose,
  position = 'right',
  title,
  description,
  children,
}: DrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const { hidden, visible } = panelVariants[position]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Drawer'}
            initial={hidden}
            animate={{ ...visible, transition }}
            exit={{ ...hidden, transition: exitTransition }}
            className={cn(
              'fixed z-50 flex flex-col',
              'bg-voltora-dark-surface border border-white/8',
              'overflow-hidden',
              panelClasses[position],
            )}
          >
            {(title || description) && (
              <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/6 shrink-0">
                <div>
                  {title && (
                    <h2 className="text-base font-semibold text-white leading-tight">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-white/50 mt-1 leading-relaxed">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Close drawer"
                  onClick={onClose}
                  className="
                    shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                    text-white/50 hover:text-white hover:bg-white/8
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                  "
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            )}

            {!title && !description && (
              <div className="flex justify-end px-4 pt-4 shrink-0">
                <button
                  type="button"
                  aria-label="Close drawer"
                  onClick={onClose}
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    text-white/50 hover:text-white hover:bg-white/8
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                  "
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
