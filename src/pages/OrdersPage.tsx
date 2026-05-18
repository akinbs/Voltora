import { motion } from 'framer-motion'
import { ShoppingBag, Package, Truck, CheckCircle2, XCircle, ExternalLink } from 'lucide-react'
import type { OrderStatus } from '../types/order'
import { mockOrders } from '../data/mockOrders'

const STATUS_CONFIG: Record<OrderStatus, { label: string; bgColor: string; textColor: string; borderColor: string; icon: React.ElementType }> = {
  processing: { label: 'Processing', bgColor: 'bg-amber-50',  textColor: 'text-amber-600',  borderColor: 'border-amber-200',  icon: Package      },
  shipped:    { label: 'Shipped',    bgColor: 'bg-blue-50',   textColor: 'text-blue-600',   borderColor: 'border-blue-200',   icon: Truck        },
  delivered:  { label: 'Delivered', bgColor: 'bg-green-50',  textColor: 'text-green-600',  borderColor: 'border-green-200',  icon: CheckCircle2 },
  cancelled:  { label: 'Cancelled', bgColor: 'bg-red-50',    textColor: 'text-red-500',    borderColor: 'border-red-200',    icon: XCircle      },
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

export default function OrdersPage() {
  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}
          >
            <ShoppingBag size={16} className="text-mint" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-voltora-black tracking-tight">Order History</h1>
            <p className="text-xs text-muted/50">{mockOrders.length} orders</p>
          </div>
        </motion.div>

        {/* Orders list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          {mockOrders.map((order, idx) => {
            const cfg  = STATUS_CONFIG[order.status]
            const Icon = cfg.icon
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-border p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cfg.bgColor} ${cfg.borderColor}`}
                    >
                      <Icon size={16} className={cfg.textColor} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-bold text-voltora-black font-mono">{order.orderNumber}</p>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.bgColor} ${cfg.textColor} ${cfg.borderColor}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted/55">
                        {fmtDate(order.createdAt)} · {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                      </p>
                      {order.trackingCode && (
                        <p className="text-[10px] text-mint font-mono mt-0.5">
                          Tracking: {order.trackingCode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <p className="text-sm font-bold text-voltora-black tabular-nums">{fmt(order.total)}</p>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-xs font-medium text-muted/60 hover:text-voltora-black transition-colors px-2.5 py-1.5 rounded-lg border border-transparent hover:border-border hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                    >
                      View details
                      <ExternalLink size={11} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}
