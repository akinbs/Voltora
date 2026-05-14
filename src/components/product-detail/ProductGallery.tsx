import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product, ProductImage } from '../../types/product'
import { ProductVisual } from '../product/ProductVisual'

interface ProductGalleryProps {
  product: Product
}

function getImages(product: Product): ProductImage[] {
  if (product.images && product.images.length > 0) return product.images
  return [
    { id: 'main',   label: 'Main View',  visualType: product.visualType },
    { id: 'alt1',   label: 'Circuit',    visualType: 'board'            },
    { id: 'alt2',   label: 'Module',     visualType: 'module'           },
    { id: 'alt3',   label: 'Package',    visualType: 'component'        },
  ]
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images        = getImages(product)
  const [selected, setSelected] = useState(images[0].id)
  const active        = images.find(img => img.id === selected) ?? images[0]

  const isNew        = product.isNew
  const isBestSeller = product.isBestSeller
  const discount     = product.discountPercentage

  return (
    <div className="flex flex-col gap-3">
      {/* Main visual */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ProductVisual
              visualType={active.visualType}
              name={`${product.name} – ${active.label}`}
              size="xl"
              className="w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {isNew && (
            <span
              className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(207,255,226,0.15)', color: '#1f8c59', border: '1px solid rgba(207,255,226,0.35)' }}
            >
              NEW
            </span>
          )}
          {isBestSeller && (
            <span
              className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.12)', color: '#92650a', border: '1px solid rgba(251,191,36,0.30)' }}
            >
              BESTSELLER
            </span>
          )}
          {discount !== undefined && discount > 0 && (
            <span
              className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.20)' }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Current view label */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span
            className="text-[9px] font-medium px-2 py-1 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.7)' }}
          >
            {active.label}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-2 overflow-x-auto scrollbar-none"
        role="group"
        aria-label="Product views"
      >
        {images.map(img => {
          const isActive = img.id === selected
          return (
            <button
              key={img.id}
              type="button"
              aria-label={`View: ${img.label}`}
              aria-pressed={isActive}
              onClick={() => setSelected(img.id)}
              className={`
                relative shrink-0 rounded-xl overflow-hidden transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                ${isActive ? 'ring-2 ring-mint ring-offset-1' : 'opacity-60 hover:opacity-90'}
              `}
              style={{ width: 72, height: 56 }}
            >
              <ProductVisual
                visualType={img.visualType}
                name={img.label}
                size="xs"
                className="w-full h-full"
              />
              <span className="sr-only">{img.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
