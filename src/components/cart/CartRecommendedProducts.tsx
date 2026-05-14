import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockProducts } from '../../data/mockProducts'
import { ProductCard } from '../product/ProductCard'

interface CartRecommendedProductsProps {
  excludeIds: string[]
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as number[] } },
}

export function CartRecommendedProducts({ excludeIds }: CartRecommendedProductsProps) {
  const recs = mockProducts
    .filter(p => !excludeIds.includes(p.id) && p.stockStatus !== 'out-of-stock')
    .slice(0, 4)

  if (recs.length === 0) return null

  return (
    <section aria-label="Recommended products" className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-mint mb-1">
            You might also like
          </p>
          <h2 className="text-lg font-bold text-voltora-black tracking-tight">Recommended</h2>
        </div>
        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-voltora-black hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          View all <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {recs.map(product => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} variant="default" showSpecs={false} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
