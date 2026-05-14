import { AnimatePresence } from 'framer-motion'
import type { Product } from '../../types/product'
import { WishlistItemCard } from './WishlistItemCard'

interface WishlistGridProps {
  items:    Product[]
  onRemove: (id: string) => void
}

export function WishlistGrid({ items, onRemove }: WishlistGridProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      role="list"
      aria-label="Wishlist items"
    >
      <AnimatePresence mode="popLayout">
        {items.map(product => (
          <div key={product.id} role="listitem">
            <WishlistItemCard product={product} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
