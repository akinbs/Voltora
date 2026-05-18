import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu } from 'lucide-react'
import { Button } from '../ui/Button'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as number[] },
})

export function HeroSection() {
  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left: text ── */}
        <div className="flex-1 max-w-xl">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center mb-6 text-xs font-semibold tracking-widest uppercase" style={{ color: '#F59E0B' }}>
              Premium Electronic Components
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.07)}
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-voltora-black leading-[1.08]"
          >
            Build smarter<br />
            <span className="text-voltora-dark-surface">circuits with</span>
            <br />
            <span className="bg-gradient-to-r from-voltora-black to-voltora-dark-hover bg-clip-text text-transparent">
              Voltora.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.13)}
            className="mt-5 text-base sm:text-lg text-muted leading-relaxed max-w-md"
          >
            Discover curated modules, sensors, boards and maker tools designed for engineers, students and creators.
          </motion.p>

          <motion.div {...fadeUp(0.19)} className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" tabIndex={-1}>
              <Button variant="dark" size="lg" rightIcon={ArrowRight}>
                Explore Products
              </Button>
            </Link>
            <Link to="/products?cat=kits" tabIndex={-1}>
              <Button variant="secondary" size="lg">
                View Starter Kits
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* ── Right: product preview card ── */}
        <motion.div
          initial={{ opacity: 0, x: 28, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 max-w-sm w-full"
        >
          <div className="relative rounded-2xl overflow-hidden bg-voltora-dark-surface border border-white/8 p-5 mint-glow">
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(207,255,226,0.07)' }}
            />

            <div className="relative space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
                  Featured Module
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(207,255,226,0.12)', color: '#CFFFE2', border: '1px solid rgba(207,255,226,0.20)' }}
                >
                  In Stock
                </span>
              </div>

              {/* Circuit board visual */}
              <div
                className="relative h-44 rounded-xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0a1f14 0%, #060e09 100%)' }}
              >
                {/* PCB dot grid */}
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <pattern id="hero-pcb-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                      <circle cx="9" cy="9" r="0.7" fill="#CFFFE2" opacity="0.13" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-pcb-dots)" />
                  <g stroke="#CFFFE2" strokeWidth="0.7" fill="none" opacity="0.1">
                    <polyline points="18,44 54,44 54,26 112,26" />
                    <polyline points="18,94 46,94 46,76 94,76 94,94 156,94" />
                    <polyline points="242,44 196,44 196,66 156,66" />
                    <circle cx="54"  cy="44" r="2.5" fill="#CFFFE2" opacity="0.2" />
                    <circle cx="46"  cy="94" r="2.5" fill="#CFFFE2" opacity="0.2" />
                    <circle cx="94"  cy="76" r="2.5" fill="#CFFFE2" opacity="0.2" />
                    <circle cx="196" cy="66" r="2.5" fill="#CFFFE2" opacity="0.2" />
                  </g>
                </svg>

                {/* Centre glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full blur-3xl"
                  style={{ background: 'rgba(207,255,226,0.09)' }}
                />

                {/* ESP32 chip */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="relative flex flex-col items-center justify-center w-[72px] h-[52px] rounded-sm"
                    style={{ background: '#0d2318', border: '1px solid rgba(207,255,226,0.22)' }}
                  >
                    {/* Top pins */}
                    <div className="absolute -top-[7px] inset-x-1.5 flex justify-around">
                      {[0,1,2,3,4].map(i => (
                        <div
                          key={i}
                          className="w-2.5 h-1.5 rounded-t-sm"
                          style={{ background: '#1e4a2e', border: '1px solid rgba(207,255,226,0.12)' }}
                        />
                      ))}
                    </div>
                    {/* Bottom pins */}
                    <div className="absolute -bottom-[7px] inset-x-1.5 flex justify-around">
                      {[0,1,2,3,4].map(i => (
                        <div
                          key={i}
                          className="w-2.5 h-1.5 rounded-b-sm"
                          style={{ background: '#1e4a2e', border: '1px solid rgba(207,255,226,0.12)' }}
                        />
                      ))}
                    </div>
                    <Cpu size={18} strokeWidth={0.75} style={{ color: 'rgba(207,255,226,0.55)' }} aria-hidden="true" />
                    <p
                      className="text-[7px] font-mono mt-0.5 tracking-widest"
                      style={{ color: 'rgba(207,255,226,0.4)' }}
                    >
                      ESP32-S3
                    </p>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold text-sm">ESP32 Dev Board</p>
                    <p className="text-white/40 text-xs mt-0.5">WiFi · BLE 5.0 · 240MHz · 4MB</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">$14.90</p>
                    <p className="text-xs text-white/30 line-through">$19.50</p>
                  </div>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['IoT Ready', '3.3V', 'Dev Board'].map(t => (
                    <span
                      key={t}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(207,255,226,0.06)', color: 'rgba(207,255,226,0.70)', border: '1px solid rgba(207,255,226,0.14)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Spec mini-grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/6">
                  {[['CPU', 'Xtensa LX7'], ['Cores', 'Dual 240MHz'], ['Flash', '4MB']].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[9px] text-white/25 uppercase tracking-wide">{k}</p>
                      <p className="text-[11px] text-white/65 font-medium mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
