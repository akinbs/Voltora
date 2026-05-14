import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  dark?:    boolean
}

const roundedMap = {
  sm:   'rounded',
  md:   'rounded-lg',
  lg:   'rounded-xl',
  full: 'rounded-full',
}

export function Skeleton({ rounded = 'md', dark = false, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        dark ? 'skeleton-shimmer-dark' : 'skeleton-shimmer',
        roundedMap[rounded],
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-white border border-border rounded-2xl overflow-hidden',
        className,
      )}
      aria-busy="true"
      aria-label="Loading product"
    >
      {/* Image area */}
      <Skeleton rounded="sm" className="h-52 w-full rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category stub */}
        <Skeleton rounded="full" className="h-2.5 w-1/4" />
        {/* Title */}
        <div className="space-y-1.5">
          <Skeleton rounded="full" className="h-3.5 w-5/6" />
          <Skeleton rounded="full" className="h-3 w-3/5" />
        </div>
        {/* Rating */}
        <Skeleton rounded="full" className="h-2.5 w-2/5" />
        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Skeleton rounded="full" className="h-4 w-1/4" />
          <Skeleton rounded="lg" className="h-7 w-16" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDarkCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-voltora-dark-surface border border-white/8 rounded-2xl overflow-hidden',
        className,
      )}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="p-5 space-y-4">
        <Skeleton dark rounded="lg" className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton dark rounded="full" className="h-4 w-3/4" />
          <Skeleton dark rounded="full" className="h-3 w-full" />
          <Skeleton dark rounded="full" className="h-3 w-4/5" />
        </div>
        <Skeleton dark rounded="full" className="h-3 w-1/3" />
      </div>
    </div>
  )
}
