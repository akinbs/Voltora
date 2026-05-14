import { Link } from 'react-router-dom'
import { Trash2, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import { ProductVisual } from '../product/ProductVisual'
import { ProductPrice } from '../product/ProductPrice'
import { ProductStockBadge } from '../product/ProductStockBadge'

interface WishlistItemCardProps {
  product:  Product
  onRemove: (id: string) => void
}

export function WishlistItemCard({ product, onRemove }: WishlistItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-border overflow-hidden group"
    >
      {/* Visual */}
      <Link to={`/products/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-t-2xl">
        <div className="relative overflow-hidden bg-surface">
          <ProductVisual visualType={product.visualType} name={product.name} size="md" className="w-full transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="absolute top-2 right-2">
            <ProductStockBadge stockStatus={product.stockStatus} stock={product.stock} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-mint mb-1">
          {product.category}
        </p>
        <Link to={`/products/${product.slug}`} className="block mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded">
          <h3 className="text-sm font-semibold text-voltora-black leading-snug hover:text-mint transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <ProductPrice
          price={product.price}
          oldPrice={product.oldPrice}
          currency={product.currency}
          discountPercentage={product.discountPercentage}
          size="sm"
        />

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            style={product.stockStatus === 'out-of-stock'
              ? { background: '#f3f4f6', color: '#9ca3af' }
              : { background: '#000', color: '#CFFFE2' }
            }
          >
            <ShoppingCart size={12} aria-hidden="true" />
            {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
          </Link>
          <button
            type="button"
            aria-label={`Remove ${product.name} from wishlist`}
            onClick={() => onRemove(product.id)}
            className="p-2 rounded-xl border border-border text-muted/40 hover:text-red-400 hover:bg-red-50 hover:border-red-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            <Trash2 size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
