import { motion, AnimatePresence } from 'framer-motion'
import { Package2 } from 'lucide-react'
import type { Product } from '../../types/product'
import type { ProductViewMode } from '../../types/filters'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from '../ui/Skeleton'
import { EmptyState } from '../ui/EmptyState'

interface ProductGridProps {
  products:          Product[]
  variant?:          'default' | 'compact' | 'featured'
  viewMode?:         ProductViewMode
  columns?:          2 | 3 | 4
  showQuickActions?: boolean
  showSpecs?:        boolean
  loading?:          boolean
  skeletonCount?:    number
  className?:        string
  onAddToCart?:      (product: Product) => void
  onWishlist?:       (product: Product) => void
  onQuickView?:      (product: Product) => void
  onCompare?:        (product: Product) => void
}

const COL_CLASS: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as number[] } },
}

const fadeVariant = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
}

export function ProductGrid({
  products,
  variant = 'default',
  viewMode = 'grid',
  columns = 3,
  showQuickActions = true,
  showSpecs = true,
  loading = false,
  skeletonCount = 6,
  className = '',
  onAddToCart,
  onWishlist,
  onQuickView,
  onCompare,
}: ProductGridProps) {
  const isList   = viewMode === 'list'
  const colClass = isList ? 'grid-cols-1' : COL_CLASS[columns]

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="skeleton"
          variants={fadeVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`grid ${colClass} gap-4 ${className}`}
        >
          {Array.from({ length: skeletonCount }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </motion.div>
      )}

      {!loading && products.length === 0 && (
        <motion.div
          key="empty"
          variants={fadeVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <EmptyState
            icon={Package2}
            title="No products found"
            description="Try adjusting your filters or search query."
            action={{ label: 'Clear filters', href: '/products' }}
            className={className}
          />
        </motion.div>
      )}

      {!loading && products.length > 0 && (
        <motion.div
          key={viewMode}
          variants={container}
          initial="hidden"
          animate="show"
          className={`grid ${colClass} ${isList ? 'gap-2.5' : 'gap-5'} ${className}`}
        >
          {products.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard
                product={product}
                variant={isList ? 'compact' : variant}
                showQuickActions={showQuickActions && !isList}
                showSpecs={showSpecs}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
                onQuickView={onQuickView}
                onCompare={onCompare}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
