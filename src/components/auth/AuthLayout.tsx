import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AuthSidePanel } from './AuthSidePanel'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-8 sm:py-12 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl shadow-black/8 rounded-3xl overflow-hidden border border-border bg-white">
          <AuthSidePanel />
          <div>{children}</div>
        </div>
      </motion.div>
    </div>
  )
}
