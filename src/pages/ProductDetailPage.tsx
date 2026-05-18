import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { useProductDetail } from '../hooks/useProductDetail'
import { EmptyState } from '../components/ui/EmptyState'
import { ProductBreadcrumb } from '../components/product-detail/ProductBreadcrumb'
import { ProductGallery } from '../components/product-detail/ProductGallery'
import { ProductPurchasePanel } from '../components/product-detail/ProductPurchasePanel'
import { ProductInfoTabs } from '../components/product-detail/ProductInfoTabs'
import { ProductDatasheetCard } from '../components/product-detail/ProductDatasheetCard'
import { ProductShippingInfo } from '../components/product-detail/ProductShippingInfo'
import { RelatedProducts } from '../components/product-detail/RelatedProducts'

const fadeUp = {
  initial:   { opacity: 0, y: 16 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as number[] },
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pulse">
      <div className="h-4 w-52 bg-border rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10">
        <div className="flex flex-col gap-3">
          <div className="aspect-square rounded-2xl bg-surface border border-border" />
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ width: 72, height: 56 }} className="rounded-xl bg-surface border border-border" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-2">
          <div className="h-3 w-24 bg-border rounded" />
          <div className="h-7 w-3/4 bg-border rounded" />
          <div className="h-4 w-1/2 bg-border rounded" />
          <div className="h-10 w-32 bg-border rounded" />
          <div className="h-px bg-border" />
          <div className="h-24 bg-surface border border-border rounded-xl" />
          <div className="h-12 bg-border rounded-xl" />
          <div className="h-12 bg-border rounded-xl" />
        </div>
      </div>
      <div className="h-10 w-64 bg-border rounded-xl mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        <div className="h-32 bg-surface border border-border rounded-2xl" />
        <div className="h-32 bg-surface border border-border rounded-2xl" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { product, relatedProducts, isLoading } = useProductDetail(slug)

  if (isLoading) {
    return (
      <div className="min-h-full bg-surface">
        <ProductDetailSkeleton />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <EmptyState
          icon={Package}
          title="Product not found"
          description="The component you are looking for may have been removed or renamed."
          action={{ label: 'Back to Products', href: '/products' }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Breadcrumb */}
        <motion.div {...fadeUp} className="mb-6">
          <ProductBreadcrumb category={product.category} name={product.name} />
        </motion.div>

        {/* Main detail grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10"
        >
          <ProductGallery product={product} />

          <div className="lg:sticky lg:top-20 lg:self-start">
            <ProductPurchasePanel product={product} />
          </div>
        </motion.div>

        {/* Info tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <ProductInfoTabs product={product} />
        </motion.div>

        {/* Datasheet + Shipping row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
        >
          <ProductDatasheetCard product={product} />
          <ProductShippingInfo />
        </motion.div>

        {/* Related products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <RelatedProducts
            currentProduct={product}
            products={relatedProducts}
          />
        </motion.div>

      </div>
    </div>
  )
}
