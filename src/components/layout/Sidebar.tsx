import { NavLink, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { sidebarSections } from '../../data/navigation'

interface SidebarProps {
  isOpen:   boolean
  isMobile: boolean
  onClose:  () => void
  onToggle: () => void
}

const OPEN_W   = 260
const CLOSED_W = 68

const SHARED_BG = 'bg-[#0B0B0B]'

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

const mobilePanelVariants = {
  open:   { x: 0,       transition: { duration: 0.3,  ease: [0.16, 1, 0.3, 1] as number[] } },
  closed: { x: '-100%', transition: { duration: 0.24, ease: 'easeIn' } },
}

interface SidebarContentProps {
  isOpen:   boolean
  isMobile: boolean
  onToggle: () => void
  onClose:  () => void
}

function SidebarContent({ isOpen, isMobile, onToggle, onClose }: SidebarContentProps) {
  const location = useLocation()
  const expanded = isOpen || isMobile

  return (
    <div className="flex flex-col h-full">

      {/* ── Top brand row ─────────────────────────────────────── */}
      <div
        className={`
          h-16 flex items-center shrink-0 border-b border-white/5
          ${expanded ? 'px-3 justify-between' : 'justify-around'}
        `}
      >
        {/* Zap icon only — no brand text */}
        <Link
          to="/"
          aria-label="Voltora home"
          className="flex items-center justify-center w-7 h-7 rounded-lg bg-mint/10 text-mint shrink-0
                     hover:bg-mint/15 transition-colors duration-150
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <Zap size={14} strokeWidth={2.5} aria-hidden="true" />
        </Link>

        {/* Toggle / Close button */}
        <button
          type="button"
          aria-label={isMobile ? 'Close sidebar' : isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={isMobile ? onClose : onToggle}
          className="
            flex items-center justify-center w-8 h-8 rounded-lg shrink-0
            text-white/50 hover:text-white hover:bg-white/8
            transition-all duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
          "
        >
          {isMobile
            ? <X    size={16} strokeWidth={2} aria-hidden="true" />
            : isOpen
              ? <X    size={16} strokeWidth={2} aria-hidden="true" />
              : <Menu size={16} strokeWidth={2} aria-hidden="true" />
          }
        </button>
      </div>

      {/* ── Nav links — scrollable ───────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-none"
        aria-label="Category navigation"
      >
        {sidebarSections.map(section => (
          <div key={section.title} className="mb-5">
            {expanded && (
              <p className="px-4 mb-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase text-white/25">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.links.map(link => {
                const Icon = link.icon
                const customActive =
                  location.search.includes(`cat=${link.id}`) ||
                  location.search.includes(`sort=${link.id}`)

                return (
                  <li key={link.id}>
                    <NavLink
                      to={link.href}
                      aria-label={expanded ? undefined : link.label}
                      title={expanded ? undefined : link.label}
                      className={({ isActive }) => {
                        const active = isActive || customActive
                        return [
                          'flex items-center gap-3 rounded-lg text-sm font-medium',
                          'transition-all duration-150',
                          expanded ? 'mx-2 px-3 py-2' : 'mx-2 px-0 py-2 justify-center',
                          active
                            ? 'bg-mint/10 text-mint border border-mint/15'
                            : 'text-white/55 hover:text-white hover:bg-white/5 border border-transparent',
                        ].join(' ')
                      }}
                    >
                      <Icon size={17} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto', transition: { duration: 0.18, delay: 0.04 } }}
                            exit={{ opacity: 0, width: 0, transition: { duration: 0.12 } }}
                            className="whitespace-nowrap overflow-hidden leading-none"
                          >
                            {link.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom strip ─────────────────────────────────────── */}
      <div className={`shrink-0 border-t border-white/5 ${expanded ? 'px-4 py-3' : 'py-3 flex justify-center'}`}>
        {expanded ? (
          <p className="text-[9px] font-medium text-white/20 tracking-wide">Neo Lab Store · v0.1</p>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-mint/30" />
        )}
      </div>
    </div>
  )
}

export function Sidebar({ isOpen, isMobile, onClose, onToggle }: SidebarProps) {

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mob-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
              onClick={onClose}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <motion.aside
          variants={mobilePanelVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          className={`fixed top-0 left-0 z-50 h-full w-[260px] ${SHARED_BG} border-r border-white/5 overflow-hidden`}
          aria-label="Site navigation"
        >
          <SidebarContent isOpen={true} isMobile={true} onToggle={onToggle} onClose={onClose} />
        </motion.aside>
      </>
    )
  }

  /* ── DESKTOP ── */
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? OPEN_W : CLOSED_W }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`hidden lg:flex flex-col flex-none h-full overflow-hidden ${SHARED_BG} border-r border-white/5`}
      aria-label="Site navigation"
    >
      <SidebarContent isOpen={isOpen} isMobile={false} onToggle={onToggle} onClose={onClose} />
    </motion.aside>
  )
}
