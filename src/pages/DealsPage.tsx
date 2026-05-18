import { motion } from 'framer-motion'
import { Tag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { ProductCard } from '../components/product/ProductCard'

const discountedProducts = mockProducts.filter(p => p.oldPrice && p.oldPrice > p.price)

const PROMO_BANNERS = [
  {
    title: 'Free Shipping',
    subtitle: 'On orders over $50',
    cta: 'Shop Now',
    href: '/products',
    color: '#0B0B0B',
    accent: '#CFFFE2',
  },
  {
    title: 'Bundle & Save',
    subtitle: 'Mix any 3 kits — save 15%',
    cta: 'View Kits',
    href: '/products?cat=kits',
    color: '#111827',
    accent: '#93c5fd',
  },
  {
    title: 'Student Discount',
    subtitle: '10% off with .edu email',
    cta: 'Verify Now',
    href: '/register',
    color: '#0f172a',
    accent: '#c4b5fd',
  },
]

export default function DealsPage() {
  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(134,239,172,0.12)', border: '1px solid rgba(134,239,172,0.25)' }}>
            <Tag size={16} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-voltora-black tracking-tight">Deals</h1>
            <p className="text-xs text-muted/50">Current promotions and price drops</p>
          </div>
        </motion.div>

        {/* Promo banners */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {PROMO_BANNERS.map((banner, idx) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.06 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={banner.href}
                className="group relative overflow-hidden rounded-2xl flex flex-col justify-between p-5 min-h-[120px] hover:scale-[1.015] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                style={{ background: banner.color }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${banner.accent} 0%, transparent 70%)`, transform: 'translate(20%, -20%)' }} />
                <div>
                  <h3 className="text-base font-black text-white mb-0.5">{banner.title}</h3>
                  <p className="text-xs text-white/50">{banner.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-150"
                  style={{ color: banner.accent }}>
                  {banner.cta}
                  <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Discounted products */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted/40">Price drops</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-[10px] font-semibold text-muted/35">{discountedProducts.length} items</span>
            </div>
          </div>

          {discountedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(134,239,172,0.08)', border: '1px solid rgba(134,239,172,0.15)' }}>
                <Tag size={24} className="text-green-400/50" />
              </div>
              <p className="text-sm font-semibold text-voltora-black mb-1">No deals right now</p>
              <p className="text-xs text-muted/50">Check back soon for price drops and promotions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {discountedProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.14 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

      </div>
    </div>
  )
}
