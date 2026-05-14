import { Link } from 'react-router-dom'
import { ChevronRight, Boxes, Zap, Truck } from 'lucide-react'

const BADGES = [
  { icon: Boxes, label: '12+ Components' },
  { icon: Zap,   label: 'Project Ready'  },
  { icon: Truck, label: 'Fast Dispatch'  },
]

export function ProductsHeader() {
  return (
    <div className="relative overflow-hidden bg-white border-b border-border">
      {/* Subtle mint glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(207,255,226,0.18)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 relative">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[11px] text-muted/60 mb-4">
          <Link to="/" className="hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded">
            Home
          </Link>
          <ChevronRight size={11} aria-hidden="true" />
          <span className="text-voltora-black font-medium">Products</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-voltora-black tracking-tight leading-tight">
              All Components
            </h1>
            <p className="text-sm text-muted mt-1.5 max-w-md leading-relaxed">
              Browse curated boards, sensors, modules and tools for your next build.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {BADGES.map(b => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(207,255,226,0.12)', color: '#1f8c59', border: '1px solid rgba(207,255,226,0.30)' }}
              >
                <b.icon size={11} aria-hidden="true" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
