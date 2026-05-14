import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin, Shield, Settings,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview',     href: '/profile',   icon: LayoutDashboard },
  { label: 'Orders',       href: '/orders',    icon: ShoppingBag     },
  { label: 'Wishlist',     href: '/wishlist',  icon: Heart           },
  { label: 'Addresses',    href: '/profile#addresses', icon: MapPin  },
  { label: 'Security',     href: '/profile#security',  icon: Shield  },
  { label: 'Preferences',  href: '/settings',  icon: Settings        },
]

export function ProfileNavigation() {
  return (
    <nav aria-label="Profile navigation" className="bg-white rounded-2xl border border-border p-2">
      <ul className="flex flex-wrap gap-1 sm:gap-0 sm:flex-col">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <NavLink
              to={href}
              className={({ isActive }) => `
                flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                ${isActive
                  ? 'bg-voltora-black text-mint'
                  : 'text-muted/70 hover:text-voltora-black hover:bg-surface'
                }
              `}
              end={href === '/profile'}
            >
              <Icon size={14} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
