import { SectionHeader }       from '../ui/SectionHeader'
import { ProductGrid }          from '../product/ProductGrid'
import { Reveal }               from '../motion/Reveal'
import { useFeaturedProducts }  from '../../hooks/useFeaturedProducts'

export function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts({ limitCount: 6 })

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10">
          <SectionHeader
            eyebrow="Shop"
            title="Featured Components"
            description="Handpicked modules and parts for your next embedded project."
            action={{ label: 'View all products', href: '/products' }}
          />
        </Reveal>

        <ProductGrid
          products={products}
          columns={3}
          loading={isLoading}
          skeletonCount={6}
          showQuickActions
          showSpecs
        />
      </div>
    </section>
  )
}
