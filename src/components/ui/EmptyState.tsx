import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { ActionConfig } from '../../types/ui'

interface EmptyStateProps {
  icon:         LucideIcon
  title:        string
  description?: string
  action?:      ActionConfig
  className?:   string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6 gap-4',
        className,
      )}
    >
      <div className="
        w-16 h-16 rounded-2xl
        bg-surface border border-border
        flex items-center justify-center
        shadow-sm
      ">
        <Icon size={28} className="text-muted" strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className="space-y-1.5 max-w-xs">
        <p className="text-base font-semibold text-voltora-black">{title}</p>
        {description && (
          <p className="text-sm text-muted leading-relaxed">{description}</p>
        )}
      </div>

      {action && (
        action.href ? (
          <Link
            to={action.href}
            className="
              mt-1 inline-flex items-center px-4 py-2
              text-sm font-semibold rounded-xl
              bg-voltora-black text-white
              hover:bg-voltora-dark-hover transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
            "
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="
              mt-1 inline-flex items-center px-4 py-2
              text-sm font-semibold rounded-xl
              bg-voltora-black text-white
              hover:bg-voltora-dark-hover transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
            "
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
