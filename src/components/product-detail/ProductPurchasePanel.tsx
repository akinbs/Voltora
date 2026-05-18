import { useState } from 'react'
import { ShoppingCart, Zap, Heart, GitCompare, Lock } from 'lucide-react'
import type { Product } from '../../types/product'
import { ProductRating } from '../product/ProductRating'
import { ProductPrice } from '../product/ProductPrice'
import { ProductStockBadge } from '../product/ProductStockBadge'
import { ProductSpecsChips } from '../product/ProductSpecsChips'
import { QuantitySelector } from '../ui/QuantitySelector'
import { ProductTrustBadges } from './ProductTrustBadges'
import { useToast } from '../../hooks/useToast'

interface ProductPurchasePanelProps {
  product: Product
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [qty, setQty]           = useState(1)
  const { addToast }            = useToast()
  const isOutOfStock            = product.stockStatus === 'out-of-stock'

  const description = product.longDescription
    ? product.longDescription.slice(0, 160).trimEnd() + '…'
    : product.description

  const handleAddToCart = () => {
    addToast({
      type:        'success',
      title:       `Added ${qty > 1 ? `${qty}× ` : ''}to cart`,
      description: product.name,
    })
  }

  const handleBuyNow = () => {
    addToast({
      type:        'info',
      title:       'Proceeding to checkout…',
      description: product.name,
    })
  }

  const handleWishlist = () => {
    addToast({
      type:        'success',
      title:       'Saved to wishlist',
      description: product.name,
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      {/* Category + name */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-mint mb-2">
        {product.category}
      </p>
      <h1 className="text-xl sm:text-2xl font-bold text-voltora-black tracking-tight leading-tight mb-1">
        {product.name}
      </h1>

      {/* Brand + SKU */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {product.brand && (
          <span className="text-[11px] font-medium text-muted/70">
            by <span className="text-voltora-black font-semibold">{product.brand}</span>
          </span>
        )}
        <span className="text-muted/30 text-xs">·</span>
        <span className="text-[11px] font-mono text-muted/60">{product.sku}</span>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      {/* Price + stock */}
      <div className="flex items-center gap-3 flex-wrap mb-4 pb-4 border-b border-border">
        <ProductPrice
          price={product.price}
          oldPrice={product.oldPrice}
          currency={product.currency}
          discountPercentage={product.discountPercentage}
          size="lg"
        />
        <ProductStockBadge stockStatus={product.stockStatus} stock={product.stock} />
      </div>

      {/* Short description */}
      <p className="text-xs text-muted/70 leading-relaxed mb-4">
        {description}
      </p>

      {/* Specs chips */}
      {product.specs.length > 0 && (
        <div className="mb-5">
          <ProductSpecsChips specs={product.specs} maxVisible={6} />
        </div>
      )}

      {/* Quantity */}
      {!isOutOfStock && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-muted/70 shrink-0">Qty</span>
          <QuantitySelector
            value={qty}
            onChange={setQty}
            min={1}
            max={product.stock}
          />
          {product.stock > 0 && product.stock <= 15 && (
            <span className="text-[10px] text-amber-600 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col gap-2.5 mb-4">
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={isOutOfStock ? undefined : handleAddToCart}
          aria-label={isOutOfStock ? 'Out of stock' : `Add ${qty} × ${product.name} to cart`}
          className="
            flex items-center justify-center gap-2 w-full py-3 rounded-xl
            text-sm font-semibold transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-[0.98]
          "
          style={isOutOfStock ? { background: '#f3f4f6', color: '#9ca3af' } : { background: '#000', color: '#CFFFE2' }}
        >
          <ShoppingCart size={15} aria-hidden="true" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={isOutOfStock ? undefined : handleBuyNow}
          aria-label={isOutOfStock ? 'Out of stock' : `Buy ${product.name} now`}
          className="
            flex items-center justify-center gap-2 w-full py-3 rounded-xl
            text-sm font-semibold border transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-[0.98]
          "
          style={isOutOfStock
            ? { background: '#f9fafb', color: '#9ca3af', border: '1px solid #e5e7eb' }
            : { background: 'rgba(207,255,226,0.08)', color: '#0a3d1f', border: '1px solid rgba(207,255,226,0.35)' }
          }
        >
          <Zap size={15} aria-hidden="true" />
          Buy Now
        </button>
      </div>

      {/* Icon actions */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="flex items-center gap-1.5 text-[11px] font-medium text-muted/60 hover:text-pink-400 transition-colors px-3 py-2 rounded-lg hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <Heart size={13} aria-hidden="true" />
          Wishlist
        </button>
        <span className="text-muted/25 text-xs">·</span>
        <button
          type="button"
          aria-label="Add to compare"
          className="flex items-center gap-1.5 text-[11px] font-medium text-muted/60 hover:text-voltora-black transition-colors px-3 py-2 rounded-lg hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <GitCompare size={13} aria-hidden="true" />
          Compare
        </button>
      </div>

      {/* Shipping note */}
      {product.shippingNote && (
        <p className="text-[10px] text-muted/55 leading-relaxed mb-3 flex items-center gap-1.5">
          <span aria-hidden="true">📦</span>
          {product.shippingNote}
        </p>
      )}

      {/* Secure checkout note */}
      <div className="flex items-center gap-1.5 text-[10px] text-muted/50">
        <Lock size={10} aria-hidden="true" />
        SSL-encrypted secure checkout
      </div>

      {/* Trust badges */}
      <ProductTrustBadges />
    </div>
  )
}
