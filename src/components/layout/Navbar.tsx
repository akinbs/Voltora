import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn } from 'lucide-react'
import { IconButton } from '../ui/IconButton'
import { navActions, profileMenuItems } from '../../data/navigation'

interface NavbarProps {
  isSidebarOpen:   boolean
  onToggleSidebar: () => void
}

const dropdownVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: -8 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: -6,
    transition: { duration: 0.12, ease: 'easeIn' } },
}

export function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  /* Detect scroll on the main content area to add shadow ── */
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return
    const handleScroll = () => setScrolled(main.scrollTop > 8)
    main.addEventListener('scroll', handleScroll, { passive: true })
    return () => main.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <header
      className={`
        sticky top-0 z-50 w-full h-16
        bg-[#0B0B0B] border-b transition-[border-color,box-shadow] duration-300
        ${scrolled
          ? 'border-white/10 shadow-lg shadow-black/40'
          : 'border-white/5 shadow-none'
        }
      `}
      role="banner"
    >
      <nav
        className="relative flex items-center h-full px-3 sm:px-4"
        aria-label="Main navigation"
      >
        {/* Brand — ortalı (absolute) */}
        <Link
          to="/"
          aria-label="Voltora home"
          className="absolute left-1/2 -translate-x-1/2 font-bold text-[20px] tracking-tight leading-none select-none"
        >
          <span className="text-white">VOLT</span>
          <span className="text-mint">ORA</span>
        </Link>

        {/* Sol spacer — sağ tarafla denge için */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navActions.map(action => (
            <Link key={action.id} to={action.href} tabIndex={-1}>
              <IconButton
                icon={action.icon}
                label={action.label}
                badge={action.badge}
                size="md"
              />
            </Link>
          ))}

          {/* Login button — hidden on very small screens */}
          <Link
            to="/login"
            className="
              hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 ml-1
              text-sm font-medium text-white/80
              border border-white/10 rounded-lg
              hover:text-white hover:border-white/20 hover:bg-white/5
              active:scale-[0.97] transition-all duration-200
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-mint
            "
          >
            <LogIn size={14} aria-hidden="true" />
            Login
          </Link>

          {/* Profile avatar */}
          <div className="relative ml-1" ref={profileRef}>
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              onClick={() => setProfileOpen(prev => !prev)}
              className="
                w-8 h-8 rounded-full flex items-center justify-center
                bg-gradient-to-br from-mint/30 to-mint-soft/20
                border border-mint/20
                text-mint text-xs font-bold
                hover:border-mint/40 hover:from-mint/40
                active:scale-95
                transition-all duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-mint
              "
            >
              V
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  role="menu"
                  aria-label="Profile menu"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="
                    absolute right-0 top-full mt-2 w-48
                    bg-voltora-dark-surface border border-white/8
                    rounded-xl shadow-2xl shadow-black/50
                    overflow-hidden z-60
                  "
                >
                  {profileMenuItems.map((item, idx) => {
                    const Icon = item.icon
                    const isDanger = item.variant === 'danger'
                    const isLastDefault = idx === profileMenuItems.findIndex(i => i.variant === 'danger') - 1
                    const itemCls = `
                      flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left
                      transition-all duration-150
                      ${isDanger
                        ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                        : 'text-white/75 hover:text-white hover:bg-mint/[0.07]'
                      }
                    `
                    return (
                      <div key={item.id}>
                        {isLastDefault && (
                          <div className="mx-3 my-1 border-t border-white/6" />
                        )}
                        {isDanger ? (
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => setProfileOpen(false)}
                            className={itemCls}
                          >
                            <Icon size={15} aria-hidden="true" strokeWidth={1.75} />
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            role="menuitem"
                            onClick={() => setProfileOpen(false)}
                            className={itemCls}
                          >
                            <Icon size={15} aria-hidden="true" strokeWidth={1.75} />
                            {item.label}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar toggle — sadece mobile'da görünür, desktop'ta sidebar'ın kendi hamburger'ı var */}
          <IconButton
            icon={isSidebarOpen ? X : Menu}
            label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={onToggleSidebar}
            className="shrink-0 ml-1 lg:hidden"
          />
        </div>
      </nav>
    </header>
  )
}
