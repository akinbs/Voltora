import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { mockProducts } from '../data/mockProducts'
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

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = mockProducts.find(p => p.slug === slug)

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
          <RelatedProducts currentProduct={product} />
        </motion.div>

      </div>
    </div>
  )
}
