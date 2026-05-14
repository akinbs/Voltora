import { useState, useCallback, useMemo } from 'react'
import type { CartItem, CartTotals } from '../types/cart'
import { mockCartItems } from '../data/mockCart'

const SHIPPING_THRESHOLD = 25
const SHIPPING_COST      = 3.99
const TAX_RATE           = 0.08
const PROMO_CODE         = 'VOLTORA10'
const PROMO_DISCOUNT     = 0.10

export function useMockCart() {
  const [items,      setItems]      = useState<CartItem[]>(mockCartItems)
  const [promoCode,  setPromoCode]  = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState('')

  const increaseQty = useCallback((productId: string) => {
    setItems(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) }
        : item
    ))
  }, [])

  const decreaseQty = useCallback((productId: string) => {
    setItems(prev => prev
      .map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    )
  }, [])

  const updateQty = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId))
    } else {
      setItems(prev => prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      ))
    }
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoApplied(false)
    setPromoCode('')
    setPromoError('')
  }, [])

  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoApplied(false)
      setPromoError('Invalid promo code.')
    }
  }, [])

  const removePromo = useCallback(() => {
    setPromoApplied(false)
    setPromoCode('')
    setPromoError('')
  }, [])

  const totals: CartTotals = useMemo(() => {
    const subtotal       = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    const itemCount      = items.reduce((sum, i) => sum + i.quantity, 0)
    const promoDiscount  = promoApplied ? subtotal * PROMO_DISCOUNT : 0
    const afterPromo     = subtotal - promoDiscount
    const shipping       = afterPromo >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
    const discountAmount = items.reduce((sum, i) => {
      if (i.product.oldPrice) {
        return sum + (i.product.oldPrice - i.product.price) * i.quantity
      }
      return sum
    }, 0)
    const tax   = afterPromo * TAX_RATE
    const total = afterPromo + shipping + tax

    return {
      subtotal,
      discountAmount,
      shipping,
      tax,
      total,
      itemCount,
      promoApplied,
      promoCode,
      promoDiscount,
    }
  }, [items, promoApplied, promoCode])

  return {
    items,
    totals,
    promoCode,
    setPromoCode,
    promoError,
    promoApplied,
    applyPromo,
    removePromo,
    increaseQty,
    decreaseQty,
    updateQty,
    removeItem,
    clearCart,
    isEmpty: items.length === 0,
  }
}
