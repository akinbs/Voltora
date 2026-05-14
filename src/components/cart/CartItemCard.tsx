import { X } from 'lucide-react'
import type { CartItem } from '../../types/cart'
import { ProductVisual } from '../product/ProductVisual'
import { QuantitySelector } from '../ui/QuantitySelector'

interface CartItemCardProps {
  item:       CartItem
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onUpdate:   (id: string, qty: number) => void
  onRemove:   (id: string) => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export function CartItemCard({ item, onIncrease: _onIncrease, onDecrease: _onDecrease, onUpdate, onRemove }: CartItemCardProps) {
  const { product, quantity } = item
  const lineTotal = product.price * quantity

  return (
    <div className="flex gap-3 sm:gap-4 p-4 bg-white rounded-2xl border border-border">
      {/* Thumbnail */}
      <div className="shrink-0 w-20 h-16 rounded-xl overflow-hidden bg-surface border border-border">
        <ProductVisual visualType={product.visualType} name={product.name} size="xs" className="w-full h-full" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-mint mb-0.5">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold text-voltora-black leading-tight truncate">
              {product.name}
            </h3>
            <p className="text-[10px] font-mono text-muted/50 mt-0.5">{product.sku}</p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${product.name} from cart`}
            onClick={() => onRemove(product.id)}
            className="shrink-0 p-1 rounded-lg text-muted/40 hover:text-red-400 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap mt-2">
          <QuantitySelector
            value={quantity}
            onChange={val => onUpdate(product.id, val)}
            min={1}
            max={product.stock}
          />
          <div className="text-right">
            <p className="text-sm font-bold text-voltora-black tabular-nums">{fmt(lineTotal)}</p>
            {quantity > 1 && (
              <p className="text-[10px] text-muted/50">{fmt(product.price)} each</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
