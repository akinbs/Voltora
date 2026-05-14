import type { ReactNode } from 'react'

interface AuthCardProps {
  title:        string
  description?: string
  children:     ReactNode
  footer?:      ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex flex-col justify-center min-h-[560px] h-full px-8 py-10 sm:px-10">
      {/* Mobile brand */}
      <div className="lg:hidden mb-6">
        <span className="font-bold text-xl tracking-tight select-none">
          <span className="text-voltora-black">VOLT</span>
          <span className="text-mint">ORA</span>
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-voltora-black tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted/70 mt-1 leading-relaxed">{description}</p>
        )}
      </div>

      <div className="flex-1">{children}</div>

      {footer && (
        <div className="mt-6 pt-5 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  )
}
