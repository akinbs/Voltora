import { Link } from 'react-router-dom'
import { BrandLogo } from '../ui/BrandLogo'

const footerLinks = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products',      href: '/products'               },
      { label: 'Development Boards',href: '/products?cat=boards'    },
      { label: 'Sensors',           href: '/products?cat=sensors'   },
      { label: 'Kits',              href: '/products?cat=kits'      },
      { label: 'New Arrivals',      href: '/products?sort=new'      },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center',    href: '/help'     },
      { label: 'Shipping Info',  href: '/shipping' },
      { label: 'Returns',        href: '/returns'  },
      { label: 'Track Order',    href: '/track'    },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',       href: '/about'    },
      { label: 'Blog',           href: '/blog'     },
      { label: 'Careers',        href: '/careers'  },
      { label: 'Contact',        href: '/contact'  },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="bg-voltora-soft-black border-t border-white/5 text-white/60"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <BrandLogo variant="dark" size="md" />
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-[200px]">
              Premium components for makers, engineers and embedded projects.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(col => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="
                        text-sm text-white/50
                        hover:text-mint transition-colors duration-200
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Voltora Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
