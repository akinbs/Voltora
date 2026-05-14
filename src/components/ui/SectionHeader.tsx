import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ActionConfig, Align } from '../../types/ui'

interface SectionHeaderProps {
  eyebrow?:     string
  title:        string
  description?: string
  action?:      ActionConfig
  align?:       Align
  className?:   string
  titleAs?:     'h1' | 'h2' | 'h3'
  children?:    ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align  = 'left',
  className,
  titleAs: Tag = 'h2',
  children,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <span className="
          inline-flex items-center gap-1.5
          text-xs font-semibold tracking-widest uppercase
          text-mint
        ">
          {eyebrow}
        </span>
      )}

      <div className={cn('flex flex-col gap-2', isCenter ? 'items-center' : 'items-start')}>
        <Tag className="text-2xl sm:text-3xl font-bold text-voltora-black tracking-tight leading-tight">
          {title}
        </Tag>

        {description && (
          <p className={cn(
            'text-sm sm:text-base text-muted leading-relaxed',
            isCenter ? 'max-w-md' : 'max-w-lg',
          )}>
            {description}
          </p>
        )}
      </div>

      {(action || children) && (
        <div className={cn('flex items-center gap-3 mt-1', isCenter && 'justify-center')}>
          {children}
          {action && (
            action.href ? (
              <Link
                to={action.href}
                className="
                  inline-flex items-center gap-1.5 text-sm font-medium
                  text-voltora-black hover:text-mint
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded
                "
              >
                {action.label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className="
                  inline-flex items-center gap-1.5 text-sm font-medium
                  text-voltora-black hover:text-mint
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded
                "
              >
                {action.label}
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
