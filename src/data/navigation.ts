import {
  Home,
  ShoppingBag,
  Zap,
  Sparkles,
  TrendingUp,
  Tag,
  Heart,
  ShoppingCart,
  User,
  Settings,
  ClipboardList,
  LogOut,
  LifeBuoy,
} from 'lucide-react'
import type { NavSection, NavAction, ProfileMenuItem } from '../types/navigation'

export const sidebarSections: NavSection[] = [
  {
    title: 'Main',
    links: [
      { id: 'home',  label: 'Home',     href: '/',         icon: Home        },
      { id: 'shop',  label: 'Shop',     href: '/products', icon: ShoppingBag },
    ],
  },
  {
    title: 'Discover',
    links: [
      { id: 'flash-sale',    label: 'Flash Sale',    href: '/flash-sale',    icon: Zap        },
      { id: 'new-arrivals',  label: 'New Arrivals',  href: '/new-arrivals',  icon: Sparkles   },
      { id: 'best-sellers',  label: 'Best Sellers',  href: '/best-sellers',  icon: TrendingUp },
      { id: 'deals',         label: 'Deals',         href: '/deals',         icon: Tag        },
    ],
  },
  {
    title: 'Account',
    links: [
      { id: 'orders',   label: 'My Orders', href: '/orders',   icon: ClipboardList },
      { id: 'wishlist', label: 'Wishlist',  href: '/wishlist', icon: Heart         },
      { id: 'profile',  label: 'Profile',   href: '/profile',  icon: User          },
    ],
  },
  {
    title: 'Help',
    links: [
      { id: 'support', label: 'Support', href: '/support', icon: LifeBuoy },
    ],
  },
]

export const navActions: NavAction[] = [
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist', icon: Heart,        badge: 4 },
  { id: 'cart',     label: 'Cart',     href: '/cart',     icon: ShoppingCart, badge: 3 },
]

export const profileMenuItems: ProfileMenuItem[] = [
  { id: 'profile',  label: 'My Profile', href: '/profile',  icon: User          },
  { id: 'orders',   label: 'Orders',     href: '/orders',   icon: ClipboardList },
  { id: 'wishlist', label: 'Wishlist',   href: '/wishlist', icon: Heart         },
  { id: 'settings', label: 'Settings',   href: '/settings', icon: Settings      },
  { id: 'logout',   label: 'Logout',     href: '/logout',   icon: LogOut, variant: 'danger' },
]
