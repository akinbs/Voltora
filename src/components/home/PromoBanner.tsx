import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '../ui/Button'

const CHIPS = [
  { label: 'IoT Ready',    accent: true  },
  { label: 'Robotics',     accent: false },
  { label: 'Sensors',      accent: false },
  { label: 'Power Modules',accent: true  },
  { label: 'Dev Boards',   accent: false },
  { label: 'Maker Tools',  accent: false },
]

export function PromoBanner() {
  return (
    <section
      className="bg-voltora-soft-black border-y border-white/5"
      aria-label="Promotional banner"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.03] pointer-events-none" />
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'rgba(207,255,226,0.05)' }}
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-mint mb-5">
              <Zap size={11} aria-hidden="true" />
              New Arrivals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Power your next<br />prototype.
            </h2>
            <p className="mt-4 text-base text-white/45 max-w-md lg:max-w-none leading-relaxed">
              Explore curated boards, sensors and tools built for fast experiments and reliable builds.
            </p>
            <div className="mt-8">
              <Link to="/products" tabIndex={-1}>
                <Button variant="primary" size="lg" rightIcon={ArrowRight}>
                  Shop New Arrivals
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — tech chips */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-none"
          >
            <div className="grid grid-cols-2 gap-3">
              {CHIPS.map(chip => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background:   chip.accent ? 'rgba(207,255,226,0.08)' : 'rgba(255,255,255,0.04)',
                    border:       chip.accent ? '1px solid rgba(207,255,226,0.18)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: chip.accent ? '#CFFFE2' : 'rgba(255,255,255,0.3)' }}
                  />
                  <span
                    className="text-xs font-medium whitespace-nowrap"
                    style={{ color: chip.accent ? 'rgba(207,255,226,0.85)' : 'rgba(255,255,255,0.55)' }}
                  >
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
