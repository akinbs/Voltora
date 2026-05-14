import { useState, useCallback, useEffect } from 'react'

interface UseSidebarReturn {
  isOpen: boolean
  isMobile: boolean
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
}

const MOBILE_BREAKPOINT = 1024

export function useSidebar(): UseSidebarReturn {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  )
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= MOBILE_BREAKPOINT)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      if (!e.matches) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), [])
  const openSidebar   = useCallback(() => setIsOpen(true), [])
  const closeSidebar  = useCallback(() => setIsOpen(false), [])

  return { isOpen, isMobile, toggleSidebar, openSidebar, closeSidebar }
}
