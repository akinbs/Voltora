import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { featuredKits } from '../../data/home'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] } },
}

const BADGE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Best Seller': { bg: 'rgba(207,255,226,0.12)', color: '#CFFFE2',           border: 'rgba(207,255,226,0.20)' },
  'Popular':     { bg: 'rgba(129,140,248,0.12)', color: 'rgba(167,175,250,1)', border: 'rgba(129,140,248,0.20)' },
  'New':         { bg: 'rgba(251,191,36,0.12)',  color: 'rgba(253,211,77,1)',  border: 'rgba(251,191,36,0.20)'  },
}

export function FeaturedKits() {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Bundles"
          title="Starter Kits"
          description="Everything you need to jump into a project, sourced and packed for you."
          action={{ label: 'All kits', href: '/products?cat=kits' }}
          className="mb-10"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {featuredKits.map(kit => {
            const badgeStyle = BADGE_COLORS[kit.badge] ?? BADGE_COLORS['New']
            return (
              <motion.div
                key={kit.id}
                variants={item}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-voltora-dark-surface border border-white/8 hover:border-white/14 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300"
              >
                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'rgba(207,255,226,0.04)' }}
                />

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: badgeStyle.bg, color: badgeStyle.color, border: `1px solid ${badgeStyle.border}` }}
                  >
                    {kit.badge}
                  </span>
                </div>

                <div className="relative flex flex-col flex-1 p-6 gap-5">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(207,255,226,0.07)', border: '1px solid rgba(207,255,226,0.14)' }}
                  >
                    <Package size={22} strokeWidth={1.5} style={{ color: '#CFFFE2' }} aria-hidden="true" />
                  </div>

                  {/* Name + description */}
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{kit.name}</h3>
                    <p className="text-sm text-white/45 mt-2 leading-relaxed">{kit.description}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5" aria-label="Kit contents">
                    {kit.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-white/55">
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: 'rgba(207,255,226,0.55)' }}
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/6 mt-auto">
                    <div>
                      <p className="text-[11px] text-white/28">{kit.itemCount} items included</p>
                      <p className="text-lg font-bold text-white mt-0.5">
                        from ${kit.startingPrice.toFixed(2)}
                      </p>
                    </div>
                    <Link to={`/products?kit=${kit.slug}`} tabIndex={-1}>
                      <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                        View Kit
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
