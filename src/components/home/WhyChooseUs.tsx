import { motion } from 'framer-motion'
import { SectionHeader } from '../ui/SectionHeader'
import { whyChooseUsItems } from '../../data/home'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
}

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trust"
          title="Why Voltora?"
          description="Reliable parts, clean shopping experience and project-focused support."
          align="center"
          className="mb-12"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {whyChooseUsItems.map(w => {
            const Icon = w.icon
            return (
              <motion.div
                key={w.id}
                variants={item}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border border-border hover:border-mint/35 hover:shadow-md hover:shadow-mint/8 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center group-hover:bg-mint/8 group-hover:border-mint/20 transition-colors duration-200">
                  <Icon size={20} strokeWidth={1.75} className="text-muted group-hover:text-mint transition-colors duration-200" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-voltora-black">{w.title}</h3>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{w.description}</p>
                </div>
                <div
                  className="w-6 h-0.5 rounded-full mt-auto"
                  style={{ background: 'rgba(207,255,226,0.5)' }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
