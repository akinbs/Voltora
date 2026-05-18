import { motion } from 'framer-motion'
import { Sparkles, ShoppingBag } from 'lucide-react'
import { mockProducts } from '../data/mockProducts'
import { ProductCard } from '../components/product/ProductCard'

const newProducts = mockProducts.filter(p => p.isNew)
const recentProducts = mockProducts.filter(p => !p.isNew).slice(0, 4)

export default function NewArrivalsPage() {
  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}>
              <Sparkles size={16} className="text-mint" />
            </div>
            <div>
              <h1 className="text-xl font-black text-voltora-black tracking-tight">New Arrivals</h1>
              <p className="text-xs text-muted/50">Latest additions to our catalogue</p>
            </div>
          </div>

          {/* Banner */}
          <div
            className="rounded-2xl px-6 py-6"
            style={{ background: 'linear-gradient(135deg, #0B0B0B 0%, #111 100%)' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-mint/60 mb-1">Fresh in stock</p>
                <h2 className="text-xl font-black text-white mb-1">Just Landed</h2>
                <p className="text-sm text-white/45">
                  {newProducts.length} new products added this week — be the first to get them.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {['Boards', 'Sensors', 'Kits', 'Tools'].map(tag => (
                  <span key={tag}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(207,255,226,0.08)', color: 'rgba(207,255,226,0.6)', border: '1px solid rgba(207,255,226,0.12)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* New products grid */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-voltora-black">
              New Products
              <span className="ml-2 text-[10px] font-semibold text-muted/40">({newProducts.length})</span>
            </h2>
          </div>

          {newProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(207,255,226,0.08)', border: '1px solid rgba(207,255,226,0.15)' }}>
                <ShoppingBag size={24} className="text-mint/50" />
              </div>
              <p className="text-sm font-semibold text-voltora-black mb-1">No new arrivals yet</p>
              <p className="text-xs text-muted/50">Check back soon — we add new products regularly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {newProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Recently added */}
        {recentProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted/40">Recently added</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.16 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </div>
    </div>
  )
}
