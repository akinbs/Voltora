import { motion } from 'framer-motion'
import { homeStats } from '../../data/home'
import { AnimatedCounter } from '../motion/AnimatedCounter'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
}

export function LabStats() {
  return (
    <section
      className="bg-voltora-dark-surface border-y border-white/5"
      aria-label="Store statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden"
        >
          {homeStats.map(stat => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="flex flex-col items-center text-center gap-3 p-8 bg-voltora-dark-surface"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(207,255,226,0.07)', border: '1px solid rgba(207,255,226,0.12)' }}>
                  <Icon size={18} strokeWidth={1.75} style={{ color: '#CFFFE2' }} aria-hidden="true" />
                </div>
                <div>
                  {stat.numericValue !== undefined ? (
                    <AnimatedCounter
                      value={stat.numericValue}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      duration={1.8}
                      className="text-3xl font-bold text-white tracking-tight"
                    />
                  ) : (
                    <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                  )}
                  <p className="text-sm font-medium text-white/55 mt-1">{stat.label}</p>
                  <p className="text-xs text-white/25 mt-1">{stat.description}</p>
                </div>
                <div className="w-6 h-0.5 rounded-full" style={{ background: 'rgba(207,255,226,0.35)' }} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
