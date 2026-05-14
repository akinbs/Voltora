import { Heart, Eye, ArrowLeftRight } from 'lucide-react'
import { Tooltip } from '../ui/Tooltip'

interface ProductQuickActionsProps {
  onWishlist?:   () => void
  onQuickView?:  () => void
  onCompare?:    () => void
  isWishlisted?: boolean
}

const BTN = 'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint'
const BTN_STYLE = { background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.10)' }

export function ProductQuickActions({
  onWishlist,
  onQuickView,
  onCompare,
  isWishlisted = false,
}: ProductQuickActionsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Tooltip content="Add to wishlist" position="left">
        <button
          type="button"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={onWishlist}
          className={`${BTN} ${isWishlisted ? 'text-pink-400' : 'text-white/50 hover:text-pink-400'}`}
          style={BTN_STYLE}
        >
          <Heart size={13} strokeWidth={2} aria-hidden="true" />
        </button>
      </Tooltip>

      <Tooltip content="Quick view" position="left">
        <button
          type="button"
          aria-label="Quick view"
          onClick={onQuickView}
          className={`${BTN} text-white/50 hover:text-mint`}
          style={BTN_STYLE}
        >
          <Eye size={13} strokeWidth={2} aria-hidden="true" />
        </button>
      </Tooltip>

      <Tooltip content="Compare" position="left">
        <button
          type="button"
          aria-label="Compare product"
          onClick={onCompare}
          className={`${BTN} text-white/50 hover:text-mint`}
          style={BTN_STYLE}
        >
          <ArrowLeftRight size={12} strokeWidth={2} aria-hidden="true" />
        </button>
      </Tooltip>
    </div>
  )
}
