import { Link } from 'react-router-dom'
import { ArrowRight, Package, Truck, CheckCircle2, XCircle } from 'lucide-react'
import type { MockOrder, OrderStatus } from '../../types/order'
import { mockOrders } from '../../data/mockOrders'

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  processing: { label: 'Processing', color: 'text-amber-600 bg-amber-50 border-amber-200',   icon: Package      },
  shipped:    { label: 'Shipped',    color: 'text-blue-600 bg-blue-50 border-blue-200',       icon: Truck        },
  delivered:  { label: 'Delivered', color: 'text-green-600 bg-green-50 border-green-200',    icon: CheckCircle2 },
  cancelled:  { label: 'Cancelled', color: 'text-red-500 bg-red-50 border-red-200',          icon: XCircle      },
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

interface ProfileOrdersPreviewProps {
  orders?: MockOrder[]
}

export function ProfileOrdersPreview({ orders = mockOrders.slice(0, 3) }: ProfileOrdersPreviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-voltora-black">Recent Orders</h2>
        <Link
          to="/orders"
          className="flex items-center gap-1 text-xs font-medium text-muted/60 hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          View all <ArrowRight size={11} aria-hidden="true" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-muted/50 text-center py-6">No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map(order => {
            const cfg  = STATUS_CONFIG[order.status]
            const Icon = cfg.icon
            return (
              <li key={order.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-border last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-muted/50" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-voltora-black font-mono">{order.orderNumber}</p>
                    <p className="text-[10px] text-muted/50">{fmtDate(order.createdAt)} · {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs font-bold text-voltora-black tabular-nums">{fmt(order.total)}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
