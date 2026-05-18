import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'

export function WishlistEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(251,113,133,0.08)', border: '1px solid rgba(251,113,133,0.20)' }}
      >
        <Heart size={32} className="text-pink-400" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-voltora-black mb-2">Your wishlist is empty</h2>
      <p className="text-sm text-muted/60 max-w-xs leading-relaxed mb-6">
        Save components you love here so you can find them easily later.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        Explore Products
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  )
}
