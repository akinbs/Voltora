import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

type FeedbackType = 'success' | 'error' | 'warning' | 'info'

interface MicroFeedbackProps {
  type:       FeedbackType
  message:    string
  icon?:      LucideIcon
  className?: string
}

const CONFIG: Record<FeedbackType, { defaultIcon: LucideIcon; color: string; bg: string; border: string }> = {
  success: { defaultIcon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50',  border: 'border-green-200'  },
  error:   { defaultIcon: XCircle,      color: 'text-red-500',   bg: 'bg-red-50',    border: 'border-red-200'    },
  warning: { defaultIcon: AlertTriangle,color: 'text-amber-600', bg: 'bg-amber-50',  border: 'border-amber-200'  },
  info:    { defaultIcon: Info,         color: 'text-mint',      bg: 'bg-mint/5',    border: 'border-mint/20'    },
}

export function MicroFeedback({ type, message, icon, className }: MicroFeedbackProps) {
  const { defaultIcon: DefaultIcon, color, bg, border } = CONFIG[type]
  const Icon = icon ?? DefaultIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium',
        bg, border, color,
        className,
      )}
      role="alert"
    >
      <Icon size={13} aria-hidden="true" className="shrink-0" />
      <span>{message}</span>
    </motion.div>
  )
}
