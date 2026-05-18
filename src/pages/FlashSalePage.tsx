import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock, ShoppingCart } from 'lucide-react'
import { mockProducts } from '../data/mockProducts'
import { ProductCard } from '../components/product/ProductCard'

const SALE_END = new Date(Date.now() + 6 * 60 * 60 * 1000 + 23 * 60 * 1000 + 45 * 1000)

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function Pad({ n }: { n: number }) {
  return <span>{String(n).padStart(2, '0')}</span>
}

const flashProducts = mockProducts
  .filter(p => p.discountPercentage && p.discountPercentage >= 10)
  .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))

export default function FlashSalePage() {
  const { h, m, s } = useCountdown(SALE_END)

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl mb-8"
          style={{ background: 'linear-gradient(135deg, #0B0B0B 0%, #111 60%, #0d1a12 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #CFFFE2 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #CFFFE2 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
          </div>

          <div className="relative px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-mint/15 border border-mint/25">
                  <Zap size={16} className="text-mint" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-mint/70">Limited Time</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                Flash Sale
              </h1>
              <p className="text-sm text-white/50">Up to 30% off on selected components. Don't miss out.</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock size={14} className="text-white/40" />
              <span className="text-xs text-white/40 mr-1">Ends in</span>
              {[
                { val: h, unit: 'h' },
                { val: m, unit: 'm' },
                { val: s, unit: 's' },
              ].map(({ val, unit }, i) => (
                <span key={unit} className="flex items-center gap-1">
                  {i > 0 && <span className="text-white/30 font-bold">:</span>}
                  <span className="flex flex-col items-center">
                    <span
                      className="min-w-[2.6rem] text-center text-lg font-black tabular-nums rounded-lg px-2 py-1"
                      style={{ background: 'rgba(207,255,226,0.08)', color: '#CFFFE2', border: '1px solid rgba(207,255,226,0.15)' }}
                    >
                      <Pad n={val} />
                    </span>
                    <span className="text-[8px] text-white/30 mt-0.5 uppercase tracking-widest">{unit}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-voltora-black">
              {flashProducts.length} items on sale
            </p>
          </div>

          {flashProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(207,255,226,0.08)', border: '1px solid rgba(207,255,226,0.15)' }}>
                <ShoppingCart size={24} className="text-mint/50" />
              </div>
              <p className="text-sm font-semibold text-voltora-black mb-1">No flash deals right now</p>
              <p className="text-xs text-muted/50">Check back soon for lightning deals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {flashProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  )
}
