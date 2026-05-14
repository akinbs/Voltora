import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { useMockWishlist } from '../hooks/useMockWishlist'
import { WishlistGrid } from '../components/wishlist/WishlistGrid'
import { WishlistEmptyState } from '../components/wishlist/WishlistEmptyState'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist, isEmpty, count } = useMockWishlist()

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(251,113,133,0.08)', border: '1px solid rgba(251,113,133,0.20)' }}
            >
              <Heart size={16} className="text-pink-400" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-voltora-black tracking-tight">Wishlist</h1>
              {!isEmpty && (
                <p className="text-xs text-muted/50">{count} saved item{count !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>

          {!isEmpty && (
            <button
              type="button"
              onClick={clearWishlist}
              className="flex items-center gap-1.5 text-xs font-medium text-muted/50 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <Trash2 size={12} aria-hidden="true" />
              Clear all
            </button>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {isEmpty ? (
            <WishlistEmptyState />
          ) : (
            <WishlistGrid items={items} onRemove={removeFromWishlist} />
          )}
        </motion.div>

      </div>
    </div>
  )
}
