import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { OrderStatus } from '../../types/order'
import { mockOrders } from '../../data/mockOrders'

interface ProfileOrdersPreviewProps {
  limit?: number
}

const STATUS: Record<OrderStatus, { label: string; dot: string; text: string; bg: string }> = {
  processing: { label: 'Processing', dot: 'bg-amber-400',  text: 'text-amber-700',  bg: 'bg-amber-50'  },
  shipped:    { label: 'Shipped',    dot: 'bg-blue-400',   text: 'text-blue-700',   bg: 'bg-blue-50'   },
  delivered:  { label: 'Delivered', dot: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50'  },
  cancelled:  { label: 'Cancelled', dot: 'bg-red-400',    text: 'text-red-600',    bg: 'bg-red-50'    },
}

const fmt      = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
const fmtDate  = (s: string) => new Date(s).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

export function ProfileOrdersPreview({ limit = 3 }: ProfileOrdersPreviewProps) {
  const orders  = mockOrders.slice(0, limit)
  const showAll = limit <= 3 && mockOrders.length > limit

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-voltora-black">
          {limit > 3 ? 'Order History' : 'Recent Orders'}
          <span className="ml-2 text-[10px] font-medium text-muted/35">({mockOrders.length})</span>
        </h2>
        {showAll && (
          <Link
            to="/orders"
            className="flex items-center gap-1 text-xs font-medium text-muted/50 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
          >
            View all <ArrowRight size={11} />
          </Link>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/40">No orders yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {orders.map(order => {
            const s = STATUS[order.status]
            return (
              <li key={order.id} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-surface/50 transition-colors">
                {/* Left */}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-voltora-black font-mono mb-0.5">{order.orderNumber}</p>
                  <p className="text-[10px] text-muted/45">
                    {fmtDate(order.createdAt)} · {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                    {order.trackingCode && (
                      <span className="text-mint ml-1.5 font-mono">{order.trackingCode}</span>
                    )}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                    {s.label}
                  </span>
                  <span className="text-sm font-bold text-voltora-black tabular-nums">
                    {fmt(order.total)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
