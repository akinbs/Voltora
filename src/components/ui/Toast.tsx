import { X, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id:           string
  type:         ToastType
  title:        string
  description?: string
  duration?:    number
}

interface ToastProps {
  toast:    ToastData
  onDismiss:(id: string) => void
}

const CONFIG: Record<ToastType, { icon: React.ElementType; bg: string; border: string; iconColor: string }> = {
  success: {
    icon:      CheckCircle2,
    bg:        'bg-white',
    border:    'border-green-200',
    iconColor: 'text-green-500',
  },
  error: {
    icon:      XCircle,
    bg:        'bg-white',
    border:    'border-red-200',
    iconColor: 'text-red-500',
  },
  warning: {
    icon:      AlertTriangle,
    bg:        'bg-white',
    border:    'border-amber-200',
    iconColor: 'text-amber-500',
  },
  info: {
    icon:      Info,
    bg:        'bg-white',
    border:    'border-border',
    iconColor: 'text-mint',
  },
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const { icon: Icon, bg, border, iconColor } = CONFIG[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 64, scale: 0.96 }}
      animate={{ opacity: 1, x: 0,  scale: 1 }}
      exit={{ opacity: 0, x: 64, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      role="alert"
      aria-live="polite"
      className={`
        flex items-start gap-3 w-full max-w-xs
        ${bg} border ${border}
        rounded-2xl shadow-lg shadow-black/8 p-3.5
        pointer-events-auto
      `}
    >
      <Icon size={16} className={`${iconColor} shrink-0 mt-0.5`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-voltora-black leading-snug">{toast.title}</p>
        {toast.description && (
          <p className="text-[11px] text-muted/65 leading-snug mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 p-0.5 rounded-md text-muted/40 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </motion.div>
  )
}
