import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import { mockProducts } from '../../data/mockProducts'
import { ProductCard } from '../product/ProductCard'
import { SkeletonCard } from '../ui/Skeleton'

interface RelatedProductsProps {
  currentProduct: Product
  products?:      Product[]
  loading?:       boolean
}

function getRelated(current: Product): Product[] {
  const same  = mockProducts.filter(p => p.id !== current.id && p.category === current.category)
  const other = mockProducts.filter(p => p.id !== current.id && p.category !== current.category)
  return [...same, ...other].slice(0, 4)
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as number[] } },
}

export function RelatedProducts({ currentProduct, products, loading = false }: RelatedProductsProps) {
  const related = products ?? getRelated(currentProduct)
  if (!loading && related.length === 0) return null

  return (
    <section aria-label="Related products">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-mint mb-1">
            More from our catalog
          </p>
          <h2 className="text-xl font-bold text-voltora-black tracking-tight">
            Related Components
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-voltora-black hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          View all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {related.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard
                product={product}
                variant="default"
                showQuickActions
                showSpecs={false}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="sm:hidden mt-4 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-voltora-black hover:text-mint transition-colors"
        >
          View all products
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
