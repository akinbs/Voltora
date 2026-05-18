import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, X, ChevronRight, Truck, Lock } from 'lucide-react'
import type { CartTotals } from '../../types/cart'

interface CartSummaryProps {
  totals:        CartTotals
  promoCode:     string
  promoError:    string
  promoApplied:  boolean
  onPromoChange: (v: string) => void
  onApplyPromo:  (v: string) => void
  onRemovePromo: () => void
  isEmpty:       boolean
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export function CartSummary({
  totals, promoCode, promoError, promoApplied,
  onPromoChange, onApplyPromo, onRemovePromo, isEmpty,
}: CartSummaryProps) {
  const [promoOpen, setPromoOpen] = useState(false)

  const freeShippingLeft = 25 - (totals.subtotal - totals.promoDiscount)

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 lg:sticky lg:top-20">
      <h2 className="text-base font-bold text-voltora-black mb-4">Order Summary</h2>

      {/* Free shipping progress */}
      {!isEmpty && totals.shipping > 0 && freeShippingLeft > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Truck size={12} className="text-mint" aria-hidden="true" />
            <span className="text-[11px] font-medium text-voltora-black">
              Add <span className="text-mint font-bold">{fmt(freeShippingLeft)}</span> more for free shipping
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-1">
            <div
              className="h-1 rounded-full bg-mint transition-all duration-500"
              style={{ width: `${Math.min(((totals.subtotal - totals.promoDiscount) / 25) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Promo code */}
      <div className="mb-4">
        {promoApplied ? (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-mint/10 border border-mint/30">
            <div className="flex items-center gap-2">
              <Tag size={12} className="text-mint" aria-hidden="true" />
              <span className="text-xs font-semibold text-voltora-black">VOLTORA10 applied</span>
              <span className="text-[10px] text-mint font-bold">-10%</span>
            </div>
            <button
              type="button"
              onClick={onRemovePromo}
              aria-label="Remove promo code"
              className="p-1 rounded hover:bg-red-50 text-muted/40 hover:text-red-400 transition-colors"
            >
              <X size={12} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div>
            {!promoOpen ? (
              <button
                type="button"
                onClick={() => setPromoOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-muted/60 hover:text-voltora-black transition-colors"
              >
                <Tag size={12} aria-hidden="true" />
                Have a promo code?
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => onPromoChange(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && onApplyPromo(promoCode)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 font-mono uppercase"
                  aria-label="Promo code"
                />
                <button
                  type="button"
                  onClick={() => onApplyPromo(promoCode)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-voltora-black text-mint transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  Apply
                </button>
              </div>
            )}
            {promoError && (
              <p className="text-[11px] text-red-500 mt-1">{promoError}</p>
            )}
          </div>
        )}
      </div>

      {/* Line items */}
      <div className="space-y-2.5 mb-4 pb-4 border-b border-border text-sm">
        <div className="flex justify-between text-muted/70">
          <span>Subtotal ({totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''})</span>
          <span className="tabular-nums">{fmt(totals.subtotal)}</span>
        </div>
        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Product discounts</span>
            <span className="tabular-nums">-{fmt(totals.discountAmount)}</span>
          </div>
        )}
        {totals.promoApplied && (
          <div className="flex justify-between text-mint font-medium">
            <span>Promo (VOLTORA10)</span>
            <span className="tabular-nums">-{fmt(totals.promoDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted/70">
          <span>Shipping</span>
          <span className={`tabular-nums ${totals.shipping === 0 ? 'text-mint font-medium' : ''}`}>
            {totals.shipping === 0 ? 'Free' : fmt(totals.shipping)}
          </span>
        </div>
        <div className="flex justify-between text-muted/60 text-xs">
          <span>Tax (8%)</span>
          <span className="tabular-nums">{fmt(totals.tax)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm font-bold text-voltora-black">Total</span>
        <span className="text-lg font-bold text-voltora-black tabular-nums">{fmt(totals.total)}</span>
      </div>

      {/* Checkout button */}
      <Link
        to={isEmpty ? '/products' : '/checkout'}
        aria-disabled={isEmpty}
        className={`
          flex items-center justify-center gap-2 w-full py-3 rounded-xl
          text-sm font-semibold transition-all duration-200 active:scale-[0.98]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
          ${isEmpty ? 'pointer-events-none opacity-40' : ''}
        `}
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        Proceed to Checkout
        <ChevronRight size={14} aria-hidden="true" />
      </Link>

      <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted/40">
        <Lock size={9} aria-hidden="true" />
        SSL-encrypted secure checkout
      </div>
    </div>
  )
}
