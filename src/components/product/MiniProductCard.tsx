import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ChevronRight, Cpu, Radio, Zap, Package2, Wrench, Cog, BatteryCharging, Plug } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Product, ProductVisualType } from '../../types/product'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface VisualStyle {
  bg:        string
  glow:      string
  icon:      LucideIcon
  iconColor: string
  dotColor:  string
}

const VISUAL_STYLES: Record<ProductVisualType, VisualStyle> = {
  board:     { bg: 'linear-gradient(135deg,#0a1f14 0%,#060e09 100%)', glow: 'rgba(207,255,226,0.10)', icon: Cpu,            iconColor: 'rgba(207,255,226,0.45)', dotColor: '#CFFFE2'  },
  sensor:    { bg: 'linear-gradient(135deg,#0c1428 0%,#080d1c 100%)', glow: 'rgba(129,140,248,0.10)', icon: Radio,          iconColor: 'rgba(129,140,248,0.50)', dotColor: '#818cf8'  },
  module:    { bg: 'linear-gradient(135deg,#1c1000 0%,#110900 100%)', glow: 'rgba(251,191,36,0.08)',  icon: Zap,            iconColor: 'rgba(251,191,36,0.45)',  dotColor: '#fbbf24'  },
  motor:     { bg: 'linear-gradient(135deg,#0e0e0e 0%,#070707 100%)', glow: 'rgba(148,163,184,0.08)', icon: Cog,            iconColor: 'rgba(148,163,184,0.50)', dotColor: '#94a3b8'  },
  tool:      { bg: 'linear-gradient(135deg,#0d1117 0%,#080d14 100%)', glow: 'rgba(148,163,184,0.08)', icon: Wrench,         iconColor: 'rgba(148,163,184,0.45)', dotColor: '#94a3b8'  },
  power:     { bg: 'linear-gradient(135deg,#180a00 0%,#0f0500 100%)', glow: 'rgba(249,115,22,0.08)',  icon: BatteryCharging, iconColor: 'rgba(249,115,22,0.55)',  dotColor: '#fb923c'  },
  cable:     { bg: 'linear-gradient(135deg,#0f0f0f 0%,#070707 100%)', glow: 'rgba(107,114,128,0.06)', icon: Plug,           iconColor: 'rgba(156,163,175,0.50)', dotColor: '#9ca3af'  },
  component: { bg: 'linear-gradient(135deg,#111111 0%,#0a0a0a 100%)', glow: 'rgba(255,255,255,0.04)', icon: Package2,       iconColor: 'rgba(255,255,255,0.22)', dotColor: '#ffffff'  },
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const filled = Math.round(rating)
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5, ${reviewCount} reviews`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={i < filled ? '#fbbf24' : 'rgba(0,0,0,0.12)'}
              stroke="none"
            />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-muted font-medium">{rating.toFixed(1)}</span>
      <span className="text-[10px] text-muted/50">({reviewCount})</span>
    </div>
  )
}

interface MiniProductCardProps {
  product: Product
}

export function MiniProductCard({ product }: MiniProductCardProps) {
  const visual = VISUAL_STYLES[product.visualType]
  const VisualIcon = visual.icon
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-border hover:border-mint/35 hover:shadow-lg hover:shadow-mint/8 hover:-translate-y-0.5 transition-all duration-300">

      {/* Visual area */}
      <div className="relative h-44 overflow-hidden" style={{ background: visual.bg }}>
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern id={`dots-${product.id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="0.7" fill={visual.dotColor} opacity="0.14" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${product.id})`} />
        </svg>

        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-3xl pointer-events-none"
          style={{ background: visual.glow }}
        />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <VisualIcon size={44} strokeWidth={0.7} style={{ color: visual.iconColor }} aria-hidden="true" />
        </div>

        {/* Discount badge */}
        {discountPct !== null && (
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(207,255,226,0.18)', color: '#CFFFE2', border: '1px solid rgba(207,255,226,0.22)' }}
            >
              -{discountPct}%
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 text-white/40 hover:text-pink-400"
          style={{ background: 'rgba(0,0,0,0.30)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <Heart size={12} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted/65">
          {product.category}
        </p>

        <h3 className="text-sm font-bold text-voltora-black leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-muted leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.badges.map(badge => (
              <Badge key={badge.label} variant={badge.variant} size="sm">
                {badge.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Price + actions */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-3 border-t border-border">
          <div>
            <p className="text-base font-bold text-voltora-black">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted/70 line-through">${product.oldPrice.toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              to={`/products/${product.slug}`}
              className="flex items-center gap-0.5 text-xs font-medium text-muted hover:text-voltora-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
              aria-label={`View details for ${product.name}`}
            >
              Details
              <ChevronRight size={11} aria-hidden="true" />
            </Link>
            <Button
              variant="dark"
              size="sm"
              leftIcon={ShoppingCart}
              aria-label={`Add ${product.name} to cart`}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
