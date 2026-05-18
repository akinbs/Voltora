import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function RouteLoadingBar() {
  const location = useLocation()
  const reduced  = usePrefersReducedMotion()
  const [key, setKey] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduced) return
    setKey(k => k + 1)
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 550)
    return () => clearTimeout(timer)
  }, [location.key, reduced])

  if (!visible || reduced) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] overflow-hidden"
    >
      <div
        key={key}
        className="h-full route-loading-bar"
        style={{ background: '#CFFFE2' }}
      />
    </div>
  )
}
