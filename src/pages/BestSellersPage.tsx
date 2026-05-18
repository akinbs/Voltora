import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Star } from 'lucide-react'
import { mockProducts } from '../data/mockProducts'
import { ProductCard } from '../components/product/ProductCard'

const CATEGORIES = ['All', 'Dev Boards', 'Sensors', 'Robotics', 'Power', 'Kits']

const bestSellers = mockProducts
  .filter(p => p.isBestSeller || p.rating >= 4.5)
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)

export default function BestSellersPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? bestSellers
    : bestSellers.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()))

  const top3 = filtered.slice(0, 3)
  const rest  = filtered.slice(3)

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}>
              <TrendingUp size={16} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-black text-voltora-black tracking-tight">Best Sellers</h1>
              <p className="text-xs text-muted/50">Top-rated by our community</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted/50">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            Sorted by rating
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-none pb-1"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-[11px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                ${activeCategory === cat
                  ? 'bg-voltora-black text-white border-voltora-black'
                  : 'bg-white text-muted/60 border-border hover:border-muted/30 hover:text-voltora-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Top 3 podium */}
        {top3.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted/40">Top picks</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {top3.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="absolute -top-2 -left-1 z-10">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      idx === 0 ? 'bg-amber-400 text-amber-900'
                      : idx === 1 ? 'bg-slate-300 text-slate-700'
                      : 'bg-orange-300 text-orange-900'
                    }`}>
                      #{idx + 1}
                    </span>
                  </div>
                  <ProductCard product={product} variant="featured" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Rest of list */}
        {rest.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted/40">More best sellers</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {rest.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.16 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <TrendingUp size={24} className="text-amber-400/50" />
            </div>
            <p className="text-sm font-semibold text-voltora-black mb-1">No results in this category</p>
            <p className="text-xs text-muted/50">Try selecting a different category.</p>
          </div>
        )}

      </div>
    </div>
  )
}
