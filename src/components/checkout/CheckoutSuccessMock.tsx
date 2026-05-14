import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Package, ArrowRight } from 'lucide-react'

const ORDER_ID = 'VLT-2026-0001'

export function CheckoutSuccessMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-16 px-6"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'rgba(207,255,226,0.15)', border: '2px solid rgba(207,255,226,0.4)' }}
      >
        <CheckCircle2 size={40} className="text-mint" aria-hidden="true" />
      </motion.div>

      <h1 className="text-2xl font-bold text-voltora-black mb-2">Order Placed!</h1>
      <p className="text-sm text-muted/60 max-w-sm leading-relaxed mb-5">
        Your mock order has been placed successfully. This is a UI demo — no real order was created.
      </p>

      {/* Order ID */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl mb-8"
        style={{ background: 'rgba(207,255,226,0.08)', border: '1px solid rgba(207,255,226,0.25)' }}
      >
        <Package size={14} className="text-mint" aria-hidden="true" />
        <span className="text-xs text-muted/60">Order ID:</span>
        <span className="text-sm font-bold text-voltora-black font-mono">{ORDER_ID}</span>
      </div>

      {/* Info cards */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-8">
        {[
          { label: 'Status',    value: 'Confirmed' },
          { label: 'Shipping',  value: 'Standard'  },
          { label: 'Estimated', value: '3–5 days'  },
          { label: 'Payment',   value: 'Secured'   },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded-xl bg-surface border border-border text-left">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-muted/50 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-voltora-black">{value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link
          to="/products"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          style={{ background: '#000', color: '#CFFFE2' }}
        >
          Continue Shopping
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-border text-voltora-black hover:bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  )
}
