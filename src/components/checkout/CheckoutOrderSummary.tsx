import type { CartItem, CartTotals } from '../../types/cart'
import { ProductVisual } from '../product/ProductVisual'

interface CheckoutOrderSummaryProps {
  items:  CartItem[]
  totals: CartTotals
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export function CheckoutOrderSummary({ items, totals }: CheckoutOrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 lg:sticky lg:top-20">
      <h2 className="text-sm font-bold text-voltora-black mb-4">
        Order Summary
        <span className="ml-2 text-[10px] font-normal text-muted/50">({totals.itemCount} items)</span>
      </h2>

      {/* Items */}
      <ul className="space-y-3 mb-4 pb-4 border-b border-border">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center gap-3">
            <div className="shrink-0 w-10 h-8 rounded-lg overflow-hidden bg-surface border border-border">
              <ProductVisual visualType={product.visualType} name={product.name} size="xs" className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-voltora-black truncate">{product.name}</p>
              <p className="text-[10px] text-muted/50">×{quantity}</p>
            </div>
            <span className="text-xs font-semibold text-voltora-black tabular-nums shrink-0">
              {fmt(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="space-y-1.5 text-xs mb-4 pb-4 border-b border-border">
        <div className="flex justify-between text-muted/60">
          <span>Subtotal</span>
          <span className="tabular-nums">{fmt(totals.subtotal)}</span>
        </div>
        {totals.promoApplied && (
          <div className="flex justify-between text-mint font-medium">
            <span>Promo</span>
            <span className="tabular-nums">-{fmt(totals.promoDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted/60">
          <span>Shipping</span>
          <span className={`tabular-nums ${totals.shipping === 0 ? 'text-mint font-medium' : ''}`}>
            {totals.shipping === 0 ? 'Free' : fmt(totals.shipping)}
          </span>
        </div>
        <div className="flex justify-between text-muted/50 text-[10px]">
          <span>Tax (8%)</span>
          <span className="tabular-nums">{fmt(totals.tax)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-voltora-black">Total</span>
        <span className="text-base font-bold text-voltora-black tabular-nums">{fmt(totals.total)}</span>
      </div>
    </div>
  )
}
