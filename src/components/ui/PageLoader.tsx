import { motion } from 'framer-motion'
import { Loader } from './Loader'

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-surface"
    >
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <span className="font-bold text-2xl tracking-tight select-none">
          <span className="text-voltora-black">VOLT</span>
          <span className="text-mint">ORA</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Loader variant="circuit" size="md" label="Preparing your lab…" />
      </motion.div>
    </motion.div>
  )
}
