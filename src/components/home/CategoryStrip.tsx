import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Package } from 'lucide-react'
import {
  Cpu, Radio, Zap, Package2, Wrench, Cable, Bot,
  Wifi, Bluetooth, Battery, Layers, Shield, Tag, Box,
  Thermometer, Wind, Activity, Lightbulb, Server,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { useCategories }  from '../../hooks/useCategories'

const ICON_MAP: Record<string, LucideIcon> = {
  Cpu, Radio, Zap, Package2, Wrench, Cable, Bot, Package,
  Wifi, Bluetooth, Battery, Layers, Shield, Tag, Box,
  Thermometer, Wind, Activity, Lightbulb, Server,
}

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? Package
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
}

const item = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as number[] } },
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-white border border-border animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-surface" />
      <div className="w-16 h-2.5 bg-border rounded" />
      <div className="w-10 h-2 bg-border/60 rounded hidden sm:block" />
    </div>
  )
}

export function CategoryStrip() {
  const { categories, isLoading } = useCategories({ activeOnly: true })

  return (
    <section className="py-14 lg:py-18 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse"
          title="Shop by Category"
          description="Everything you need for your next electronics project."
          action={{ label: 'All categories', href: '/products' }}
          className="mb-8"
        />

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {Array.from({ length: 8 }, (_, i) => <CategorySkeleton key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {categories.map(cat => {
              const Icon = getIcon(cat.iconName)
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="group flex flex-col items-center text-center gap-2.5 p-4 rounded-xl bg-white border border-border hover:border-mint/40 hover:shadow-md hover:shadow-mint/8 hover:-translate-y-0.5 transition-all duration-200"
                    aria-label={`Browse ${cat.name} — ${cat.productCount} items`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center group-hover:bg-mint/10 transition-colors duration-200">
                      <Icon
                        size={19}
                        strokeWidth={1.75}
                        className="text-muted group-hover:text-mint transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-voltora-black leading-tight">{cat.name}</p>
                      <p className="text-[10px] text-muted/70 mt-0.5 leading-tight hidden sm:block">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-0.5 mt-auto">
                      <span className="text-[10px] text-muted/55">{cat.productCount}</span>
                      <ChevronRight
                        size={10}
                        className="text-muted/30 group-hover:text-mint group-hover:translate-x-0.5 transition-all duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
