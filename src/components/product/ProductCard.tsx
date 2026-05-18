import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import { ProductVisual } from './ProductVisual'
import { ProductRating } from './ProductRating'
import { ProductPrice } from './ProductPrice'
import { ProductStockBadge } from './ProductStockBadge'
import { ProductSpecsChips } from './ProductSpecsChips'
import { ProductQuickActions } from './ProductQuickActions'
import { useToast } from '../../hooks/useToast'

interface ProductCardProps {
  product:           Product
  variant?:          'default' | 'compact' | 'featured'
  showQuickActions?: boolean
  showSpecs?:        boolean
  className?:        string
  onAddToCart?:      (product: Product) => void
  onWishlist?:       (product: Product) => void
  onQuickView?:      (product: Product) => void
  onCompare?:        (product: Product) => void
  isWishlisted?:     boolean
}

const BADGE = {
  new:        { label: 'NEW',        bg: 'rgba(207,255,226,0.15)', color: '#1f8c59', border: 'rgba(207,255,226,0.35)' },
  bestSeller: { label: 'BESTSELLER', bg: 'rgba(251,191,36,0.12)',  color: '#92650a', border: 'rgba(251,191,36,0.30)' },
}

function AddButton({
  disabled,
  onClick,
  label,
  small = false,
}: {
  disabled: boolean
  onClick?: () => void
  label:    string
  small?:   boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={`flex items-center gap-1 font-semibold rounded-lg transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
        disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.96]
        ${small ? 'text-[10px] px-2.5 py-1' : 'text-[11px] px-3 py-1.5'}`}
      style={
        disabled
          ? { background: '#f3f4f6', color: '#9ca3af' }
          : { background: '#000', color: '#CFFFE2' }
      }
    >
      <ShoppingCart size={small ? 10 : 11} strokeWidth={2} aria-hidden="true" />
      {disabled ? 'N/A' : 'Add'}
    </button>
  )
}

/* ── Compact / list-row variant ────────────────────────────────── */
function CompactCard({
  product,
  showSpecs,
  onAddToCart,
  className,
}: Pick<ProductCardProps, 'product' | 'showSpecs' | 'onAddToCart' | 'className'>) {
  const { addToast } = useToast()
  const isOutOfStock  = product.stockStatus === 'out-of-stock'

  const handleAddToCart = () => {
    onAddToCart?.(product)
    addToast({ type: 'success', title: 'Added to cart', description: product.name })
  }

  return (
    <motion.article
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        group relative flex flex-row bg-white rounded-xl border border-border overflow-hidden
        hover:border-mint/30 hover:shadow-md hover:shadow-black/5 focus-within:border-mint/25
        transition-[border-color,box-shadow] duration-300
        ${className ?? ''}
      `}
    >
      {/* Visual thumbnail */}
      <div className="relative w-20 shrink-0 overflow-hidden">
        <ProductVisual visualType={product.visualType} name={product.name} size="xs" />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center pointer-events-none">
            <span className="text-[8px] font-bold text-muted/60">OOS</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted/50 mb-0.5 truncate">
            {product.category}
          </p>
          <h3 className="text-xs font-bold text-voltora-black leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>
          <ProductRating rating={product.rating} reviewCount={product.reviewCount} compact />
        </div>
        {showSpecs && product.specs.length > 0 && (
          <div className="mt-1.5">
            <ProductSpecsChips specs={product.specs} maxVisible={2} />
          </div>
        )}
      </div>

      {/* Price + action */}
      <div className="shrink-0 px-3 py-2.5 flex flex-col justify-between items-end border-l border-border">
        <div className="flex flex-col items-end gap-0.5">
          <ProductPrice
            price={product.price}
            oldPrice={product.oldPrice}
            currency={product.currency}
            discountPercentage={product.discountPercentage}
            size="sm"
          />
          <ProductStockBadge stockStatus={product.stockStatus} stock={product.stock} compact />
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <Link
            to={`/products/${product.slug}`}
            className="text-[10px] font-medium text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded"
            aria-label={`View ${product.name}`}
          >
            Details
          </Link>
          <AddButton
            disabled={isOutOfStock}
            onClick={isOutOfStock ? undefined : handleAddToCart}
            label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            small
          />
        </div>
      </div>
    </motion.article>
  )
}

/* ── Default / featured card ───────────────────────────────────── */
export function ProductCard({
  product,
  variant = 'default',
  showQuickActions = true,
  showSpecs = true,
  className = '',
  onAddToCart,
  onWishlist,
  onQuickView,
  onCompare,
  isWishlisted = false,
}: ProductCardProps) {
  const { addToast } = useToast()

  const handleAddToCart = () => {
    onAddToCart?.(product)
    addToast({ type: 'success', title: 'Added to cart', description: product.name })
  }

  const handleWishlist = () => {
    onWishlist?.(product)
    addToast({
      type:        isWishlisted ? 'info' : 'success',
      title:       isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist',
      description: product.name,
    })
  }

  if (variant === 'compact') {
    return (
      <CompactCard
        product={product}
        showSpecs={showSpecs}
        onAddToCart={onAddToCart}
        className={className}
      />
    )
  }

  const isOutOfStock = product.stockStatus === 'out-of-stock'
  const isFeatured   = variant === 'featured'
  const visualSize   = isFeatured ? 'lg' : 'md'

  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`
        group relative flex flex-col bg-white rounded-2xl border border-border overflow-hidden
        hover:border-mint/30 hover:shadow-lg hover:shadow-black/5 focus-within:border-mint/25
        transition-[border-color,box-shadow] duration-300
        ${className}
      `}
    >
      {/* ── Visual ──────────────────────────────────── */}
      <div className="relative shrink-0">
        <ProductVisual visualType={product.visualType} name={product.name} size={visualSize} />

        {/* Badges */}
        {(product.isNew || product.isBestSeller) && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.isNew && (
              <span
                className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: BADGE.new.bg, color: BADGE.new.color, border: `1px solid ${BADGE.new.border}` }}
              >
                {BADGE.new.label}
              </span>
            )}
            {product.isBestSeller && (
              <span
                className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: BADGE.bestSeller.bg, color: BADGE.bestSeller.color, border: `1px solid ${BADGE.bestSeller.border}` }}
              >
                {BADGE.bestSeller.label}
              </span>
            )}
          </div>
        )}

        {/* Out-of-stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
            <span
              className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#9ca3af', border: '1px solid #e5e7eb' }}
            >
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Quick actions */}
        {showQuickActions && (
          <div className="absolute top-2.5 right-2.5 z-20 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250">
            <ProductQuickActions
              onWishlist={handleWishlist}
              onQuickView={onQuickView ? () => onQuickView(product) : undefined}
              onCompare={onCompare     ? () => onCompare(product)   : undefined}
              isWishlisted={isWishlisted}
            />
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted/55 mb-1 truncate">
          {product.category}
        </p>
        <h3 className="text-[13px] font-bold text-voltora-black leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] leading-relaxed text-muted/65 line-clamp-2 mb-2.5">
          {product.description}
        </p>
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        {showSpecs && product.specs.length > 0 && (
          <div className="mt-2.5">
            <ProductSpecsChips specs={product.specs} maxVisible={4} />
          </div>
        )}
        <div className="flex-1 min-h-[8px]" />

        {/* Footer */}
        <div className="flex items-end justify-between gap-2 mt-3 pt-3 border-t border-border">
          <div className="flex flex-col gap-1 min-w-0">
            <ProductPrice
              price={product.price}
              oldPrice={product.oldPrice}
              currency={product.currency}
              discountPercentage={product.discountPercentage}
              size="md"
            />
            <ProductStockBadge stockStatus={product.stockStatus} stock={product.stock} compact />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/products/${product.slug}`}
              className="text-[10px] font-medium text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
              aria-label={`View details for ${product.name}`}
            >
              Details
            </Link>
            <AddButton
              disabled={isOutOfStock}
              onClick={isOutOfStock ? undefined : handleAddToCart}
              label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
