import { createContext, useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toast } from './Toast'
import type { ToastData, ToastType } from './Toast'

interface AddToastOptions {
  type:         ToastType
  title:        string
  description?: string
  duration?:    number
}

interface ToastContextValue {
  addToast: (opts: AddToastOptions) => void
}

export const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
})

interface ToastProviderProps {
  children: ReactNode
}

const DEFAULT_DURATION = 3500

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const addToast = useCallback((opts: AddToastOptions) => {
    const id       = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const duration = opts.duration ?? DEFAULT_DURATION

    setToasts(prev => {
      const next = [...prev, { ...opts, id }]
      return next.slice(-4)
    })

    const timer = setTimeout(() => dismiss(id), duration)
    timers.current.set(id, timer)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none"
        style={{ maxWidth: 320 }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
