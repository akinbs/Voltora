import { Clock, Package, MessageCircle, RotateCcw } from 'lucide-react'

const ITEMS = [
  { icon: Clock,          title: 'Fast Dispatch',       desc: 'Orders placed before 14:00 ship the same business day.' },
  { icon: Package,        title: 'Careful Packaging',   desc: 'Anti-static and padded packaging for all components.'    },
  { icon: MessageCircle,  title: 'Project Support',     desc: 'Free technical assistance for compatibility questions.'  },
  { icon: RotateCcw,      title: 'Easy Returns',        desc: 'Unopened items accepted within 30 days of delivery.'     },
]

export function ProductShippingInfo() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h2 className="text-xs font-bold uppercase tracking-wider text-voltora-black mb-4">
        Delivery & Support
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map(item => (
          <div key={item.title} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(207,255,226,0.10)', border: '1px solid rgba(207,255,226,0.22)' }}
            >
              <item.icon size={14} style={{ color: '#1f8c59' }} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-voltora-black mb-0.5">{item.title}</p>
              <p className="text-[11px] text-muted/70 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
