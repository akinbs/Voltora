import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { useSidebar } from '../../hooks/useSidebar'
import { PageTransition } from '../motion/PageTransition'
import { RouteLoadingBar } from '../motion/RouteLoadingBar'

export function MainLayout() {
  const { isOpen, isMobile, toggleSidebar, closeSidebar } = useSidebar()
  const location = useLocation()

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Sidebar: left column, full viewport height */}
      <Sidebar
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />

      {/* Content column: takes remaining width, scrolls internally */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <RouteLoadingBar />
        <Navbar
          isSidebarOpen={isOpen}
          onToggleSidebar={toggleSidebar}
        />

        <main
          id="main-content"
          className="flex-1 flex flex-col overflow-y-auto"
          tabIndex={-1}
        >
          <div className="flex-1">
            <PageTransition key={location.key}>
              <Outlet />
            </PageTransition>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
