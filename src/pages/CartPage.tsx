import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useMockCart } from '../hooks/useMockCart'
import { CartItemCard } from '../components/cart/CartItemCard'
import { CartSummary } from '../components/cart/CartSummary'
import { CartEmptyState } from '../components/cart/CartEmptyState'
import { CartProgress } from '../components/cart/CartProgress'
import { CartRecommendedProducts } from '../components/cart/CartRecommendedProducts'

export default function CartPage() {
  const {
    items, totals, promoCode, promoError, promoApplied,
    setPromoCode, applyPromo, removePromo,
    increaseQty, decreaseQty, updateQty, removeItem, isEmpty,
  } = useMockCart()

  const excludeIds = items.map(i => i.product.id)

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <CartProgress currentStep="cart" />
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}
            >
              <ShoppingCart size={16} className="text-mint" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-voltora-black tracking-tight">Your Cart</h1>
              {!isEmpty && (
                <p className="text-xs text-muted/50">
                  {totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {isEmpty ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <CartEmptyState />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onUpdate={updateQty}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Summary */}
            <div>
              <CartSummary
                totals={totals}
                promoCode={promoCode}
                promoError={promoError}
                promoApplied={promoApplied}
                onPromoChange={setPromoCode}
                onApplyPromo={applyPromo}
                onRemovePromo={removePromo}
                isEmpty={isEmpty}
              />
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <CartRecommendedProducts excludeIds={excludeIds} />
        </motion.div>

      </div>
    </div>
  )
}
