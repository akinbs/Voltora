import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'

interface ModalProps {
  open:         boolean
  onClose:      () => void
  title?:       string
  description?: string
  children?:    ReactNode
  footer?:      ReactNode
  size?:        'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as number[] },
  },
  exit: {
    opacity: 0, scale: 0.95, y: 10,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label={title ?? 'Dialog'}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'relative w-full pointer-events-auto',
                'bg-white border border-border rounded-2xl shadow-2xl',
                sizeMap[size],
              )}
            >
              {/* Header */}
              {(title || description) && (
                <div className="px-6 pt-6 pb-4 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {title && (
                        <h2 className="text-lg font-semibold text-voltora-black leading-tight">
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p className="text-sm text-muted mt-1 leading-relaxed">
                          {description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label="Close dialog"
                      onClick={onClose}
                      className="
                        shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                        text-muted hover:text-voltora-black hover:bg-border/60
                        transition-colors duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                      "
                    >
                      <X size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* Close button (no header) */}
              {!title && !description && (
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={onClose}
                  className="
                    absolute top-4 right-4
                    w-8 h-8 rounded-lg flex items-center justify-center
                    text-muted hover:text-voltora-black hover:bg-border/60
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                  "
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              )}

              {/* Body */}
              {children && (
                <div className="px-6 py-5">
                  {children}
                </div>
              )}

              {/* Footer */}
              {footer && (
                <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3 border-t border-border mt-0">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
