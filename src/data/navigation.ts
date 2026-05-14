import {
  Cpu,
  Radio,
  Bot,
  Zap,
  Layers,
  Cable,
  Wrench,
  Package2,
  Sparkles,
  TrendingUp,
  Tag,
  Search,
  Heart,
  ShoppingCart,
  User,
  Settings,
  ClipboardList,
  LogOut,
} from 'lucide-react'
import type { NavSection, NavAction, ProfileMenuItem } from '../types/navigation'

export const sidebarSections: NavSection[] = [
  {
    title: 'Categories',
    links: [
      { id: 'boards',     label: 'Development Boards', href: '/products?cat=boards',   icon: Cpu      },
      { id: 'sensors',    label: 'Sensors',            href: '/products?cat=sensors',  icon: Radio    },
      { id: 'robotics',   label: 'Robotics',           href: '/products?cat=robotics', icon: Bot      },
      { id: 'power',      label: 'Power Modules',      href: '/products?cat=power',    icon: Zap      },
      { id: 'components', label: 'Components',         href: '/products?cat=components',icon: Layers  },
      { id: 'cables',     label: 'Cables',             href: '/products?cat=cables',   icon: Cable    },
      { id: 'tools',      label: 'Tools',              href: '/products?cat=tools',    icon: Wrench   },
      { id: 'kits',       label: 'Kits',               href: '/products?cat=kits',     icon: Package2 },
    ],
  },
  {
    title: 'Discover',
    links: [
      { id: 'new',        label: 'New Arrivals',  href: '/products?sort=new',  icon: Sparkles    },
      { id: 'bestseller', label: 'Best Sellers',  href: '/products?sort=best', icon: TrendingUp  },
      { id: 'campaigns',  label: 'Campaigns',     href: '/products?sort=sale', icon: Tag         },
    ],
  },
]

export const navActions: NavAction[] = [
  { id: 'search',   label: 'Search',   href: '/search',   icon: Search                     },
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist', icon: Heart,        badge: 4     },
  { id: 'cart',     label: 'Cart',     href: '/cart',     icon: ShoppingCart, badge: 3     },
]

export const profileMenuItems: ProfileMenuItem[] = [
  { id: 'profile',  label: 'My Profile', href: '/profile',  icon: User          },
  { id: 'orders',   label: 'Orders',     href: '/orders',   icon: ClipboardList },
  { id: 'wishlist', label: 'Wishlist',   href: '/wishlist', icon: Heart         },
  { id: 'settings', label: 'Settings',   href: '/settings', icon: Settings      },
  { id: 'logout',   label: 'Logout',     href: '/logout',   icon: LogOut, variant: 'danger' },
]
