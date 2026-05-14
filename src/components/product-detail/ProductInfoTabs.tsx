import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Package } from 'lucide-react'
import type { Product } from '../../types/product'
import { ProductSpecsTable } from './ProductSpecsTable'

interface ProductInfoTabsProps {
  product: Product
}

type TabId = 'overview' | 'specifications' | 'applications' | 'package'

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview',       label: 'Overview'        },
  { id: 'specifications', label: 'Specifications'  },
  { id: 'applications',   label: 'Applications'    },
  { id: 'package',        label: 'Package'         },
]

export function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  const [active, setActive] = useState<TabId>('overview')

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Tab list */}
      <div
        className="flex overflow-x-auto scrollbar-none border-b border-border"
        role="tablist"
        aria-label="Product information"
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`
              relative shrink-0 px-5 py-3.5 text-xs font-semibold transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-inset
              ${active === tab.id ? 'text-voltora-black' : 'text-muted/60 hover:text-voltora-black hover:bg-surface/60'}
            `}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-voltora-black"
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {active === 'overview' && (
              <div className="space-y-5">
                {product.longDescription ? (
                  <p className="text-sm text-muted leading-relaxed">{product.longDescription}</p>
                ) : (
                  <p className="text-sm text-muted leading-relaxed">{product.description}</p>
                )}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-voltora-black">
                          <CheckCircle2 size={14} className="text-mint shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {active === 'specifications' && (
              <ProductSpecsTable product={product} />
            )}

            {active === 'applications' && (
              <div>
                {product.applications && product.applications.length > 0 ? (
                  <ul className="space-y-2.5">
                    {product.applications.map(app => (
                      <li key={app} className="flex items-start gap-2.5 text-sm text-voltora-black">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: '#CFFFE2' }}
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{app}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted/60">Application information not available for this product.</p>
                )}
              </div>
            )}

            {active === 'package' && (
              <div className="space-y-5">
                {product.packageIncludes && product.packageIncludes.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-3">
                      Package Includes
                    </h3>
                    <ul className="space-y-2">
                      {product.packageIncludes.map(item => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-voltora-black">
                          <Package size={13} className="text-muted/50 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-muted/60">Package information not available for this product.</p>
                )}
                {product.warranty && (
                  <div className="flex items-center gap-2 text-xs text-muted/70 pt-3 border-t border-border">
                    <CheckCircle2 size={12} className="text-mint shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-voltora-black">Warranty:</span> {product.warranty}
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
