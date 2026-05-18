import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}
      >
        <ShoppingCart size={32} className="text-mint" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold text-voltora-black mb-2">Your cart is empty</h2>
      <p className="text-sm text-muted/60 max-w-xs leading-relaxed mb-6">
        Looks like you haven't added anything yet. Explore our catalog and find your next component.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        Browse Products
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  )
}
