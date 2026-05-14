import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Cpu } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="
      min-h-[calc(100dvh-4rem)]
      flex flex-col items-center justify-center
      px-4 py-16 text-center
    ">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <div className="
          w-20 h-20 rounded-2xl mx-auto
          bg-voltora-dark-surface
          flex items-center justify-center
        ">
          <Cpu size={36} className="text-mint" strokeWidth={1.25} />
        </div>

        <div>
          <p className="text-8xl font-bold text-voltora-black/8 select-none leading-none">
            404
          </p>
          <h1 className="-mt-6 text-2xl font-bold text-voltora-black">
            Circuit not found
          </h1>
          <p className="mt-2 text-sm text-muted max-w-xs mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new route.
          </p>
        </div>

        <Link
          to="/"
          className="
            inline-flex items-center gap-2 px-5 py-2.5
            bg-voltora-black text-white text-sm font-semibold rounded-xl
            hover:bg-voltora-dark-hover transition-colors duration-200
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-mint
          "
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
