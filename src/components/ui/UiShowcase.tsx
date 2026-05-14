import { useState } from 'react'
import {
  Cpu, Zap, Package2, ShoppingCart, Heart,
  Settings, LogOut, User, ChevronDown,
  AlertTriangle, Info,
} from 'lucide-react'
import { Button }           from './Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Badge }            from './Badge'
import { Input }            from './Input'
import { SearchInput }      from './SearchInput'
import { Dropdown }         from './Dropdown'
import { Drawer }           from './Drawer'
import { Modal }            from './Modal'
import { SkeletonCard } from './Skeleton'
import { EmptyState }       from './EmptyState'
import { SectionHeader }    from './SectionHeader'
import { QuantitySelector } from './QuantitySelector'
import { Tooltip }          from './Tooltip'
import type { DropdownItem } from '../../types/ui'

const dropdownItems: DropdownItem[] = [
  { id: 'profile',  label: 'My Profile',  icon: User,      onClick: () => {} },
  { id: 'settings', label: 'Settings',    icon: Settings,  onClick: () => {} },
  { id: 'logout',   label: 'Logout',      icon: LogOut,    onClick: () => {}, danger: true },
]

export function UiShowcase() {
  const [search,    setSearch]    = useState('')
  const [qty,       setQty]       = useState(1)
  const [modal,     setModal]     = useState(false)
  const [drawer,    setDrawer]    = useState(false)
  const [inputVal,  setInputVal]  = useState('')
  const [loadBtn,   setLoadBtn]   = useState(false)

  const simulateLoad = () => {
    setLoadBtn(true)
    setTimeout(() => setLoadBtn(false), 1800)
  }

  return (
    <section
      className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      aria-label="UI System Preview"
    >
      {/* Header */}
      <div className="border-t border-border pt-14 mb-10">
        <div className="flex items-center gap-3 mb-1">
          <SectionHeader
            eyebrow="Design System"
            title="UI Component Preview"
            description="Internal development preview — all base components for the Voltora design system."
          />
          <Badge variant="warning" className="self-start mt-1 shrink-0">Dev Only</Badge>
        </div>
      </div>

      <div className="space-y-12">

        {/* ─── Buttons ──────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Buttons</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3 items-center mt-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="dark"  size="icon" aria-label="Cart"><ShoppingCart size={18} /></Button>
            <Button variant="primary" leftIcon={Zap}>With Icon</Button>
            <Button variant="secondary" rightIcon={ChevronDown}>Dropdown</Button>
            <Button variant="primary" loading={loadBtn} onClick={simulateLoad}>
              {loadBtn ? 'Loading…' : 'Click to Load'}
            </Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" fullWidth className="max-w-xs">Full Width</Button>
          </div>
        </div>

        {/* ─── Badges ───────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Badges</p>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="mint"    leftIcon={Zap}>In Stock</Badge>
            <Badge variant="dark"    leftIcon={Cpu}>ESP32</Badge>
            <Badge variant="success">New Arrival</Badge>
            <Badge variant="warning">Low Stock</Badge>
            <Badge variant="danger" >Discontinued</Badge>
            <Badge variant="neutral">5V · 3.3V</Badge>
            <Badge variant="outline">IoT</Badge>
            <Badge variant="mint"   size="sm">Best Seller</Badge>
            <Badge variant="neutral" size="sm">Sensor</Badge>
          </div>
        </div>

        {/* ─── Forms ────────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Forms</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
            <Input
              label="Product Name"
              placeholder="ESP32 Dev Kit"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              helperText="Enter the full product name"
            />
            <Input
              label="Stock Count"
              placeholder="0"
              leftIcon={Package2}
              helperText="Units available"
            />
            <Input
              label="With Error"
              placeholder="Invalid field"
              defaultValue="bad value"
              error="This field contains an invalid value."
            />
          </div>
          <div className="mt-4 max-w-sm">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search components, sensors, modules…"
            />
          </div>
        </div>

        {/* ─── Cards ────────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Cards</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>White surface, soft border and shadow.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="mint">In Stock</Badge>
              </CardContent>
              <CardFooter className="border-border">
                <span className="text-sm text-muted">$12.99</span>
              </CardFooter>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle className="text-white">Dark Card</CardTitle>
                <CardDescription className="text-white/50">Dark surface, white text.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="mint">ESP32-S3</Badge>
              </CardContent>
              <CardFooter className="border-white/8">
                <span className="text-sm text-white/60">$12.99</span>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the lift effect.</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="success">New</Badge>
              </CardContent>
              <CardFooter className="border-border">
                <span className="text-sm text-muted">$8.50</span>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* ─── Misc ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* EmptyState */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Empty State</p>
            <Card variant="default" padding="none">
              <EmptyState
                icon={ShoppingCart}
                title="Your cart is empty"
                description="Add products to start building your order."
                action={{ label: 'Browse Products', href: '/products' }}
              />
            </Card>
          </div>

          {/* QuantitySelector */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Quantity Selector</p>
            <div className="flex flex-col gap-3">
              <QuantitySelector value={qty} onChange={setQty} max={10} />
              <QuantitySelector value={1} onChange={() => {}} disabled />
              <p className="text-xs text-muted">Selected: {qty}</p>
            </div>
          </div>

          {/* Tooltip */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Tooltips</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Tooltip content="Top tooltip" position="top">
                <Button variant="outline" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="outline" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="ESP32-S3 • Dual core 240MHz" position="right">
                <Button variant="secondary" size="sm" leftIcon={Info}>Info</Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* ─── Skeleton ─────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">Skeleton Loaders</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>

        {/* ─── Interactive ──────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
            Interactive Components
          </p>
          <div className="flex flex-wrap gap-3 items-center">

            {/* Dropdown */}
            <Dropdown
              trigger={({ onClick, isOpen }) => (
                <Button
                  variant="secondary"
                  rightIcon={ChevronDown}
                  onClick={onClick}
                  aria-expanded={isOpen}
                  className={isOpen ? 'border-mint/40' : ''}
                >
                  Dropdown
                </Button>
              )}
              items={dropdownItems}
              align="left"
            />

            {/* Drawer */}
            <Button
              variant="outline"
              leftIcon={Package2}
              onClick={() => setDrawer(true)}
            >
              Open Drawer
            </Button>

            {/* Modal */}
            <Button
              variant="dark"
              leftIcon={AlertTriangle}
              onClick={() => setModal(true)}
            >
              Open Modal
            </Button>
          </div>
        </div>

        {/* SectionHeader */}
        <div className="border-t border-border pt-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">Section Headers</p>
          <div className="space-y-8 max-w-2xl">
            <SectionHeader
              eyebrow="New Arrivals"
              title="Latest Products"
              description="Freshly stocked components for your next build."
              action={{ label: 'View all', href: '/products?sort=new' }}
            />
            <SectionHeader
              eyebrow="Best Sellers"
              title="Community Favorites"
              description="The most popular components across maker projects."
              align="center"
            />
          </div>
        </div>

      </div>

      {/* ─── Modal ──────────────────────────────────────── */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Remove from Cart"
        description="Are you sure you want to remove this item? This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
            <Button variant="danger"  onClick={() => setModal(false)}>Remove Item</Button>
          </>
        }
      >
        <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
          <div className="w-12 h-12 rounded-lg bg-border/50 flex items-center justify-center shrink-0">
            <Cpu size={20} className="text-muted" />
          </div>
          <div>
            <p className="text-sm font-semibold text-voltora-black">ESP32-S3 Dev Kit</p>
            <p className="text-xs text-muted mt-0.5">Qty: 2 · $25.98</p>
          </div>
        </div>
      </Modal>

      {/* ─── Drawer ─────────────────────────────────────── */}
      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        position="right"
        title="Shopping Cart"
        description="Review your selected items"
      >
        <div className="space-y-4">
          {[
            { name: 'ESP32-S3 Dev Kit', price: '$12.99', qty: 2 },
            { name: 'HC-SR04 Ultrasonic Sensor', price: '$3.50', qty: 1 },
            { name: 'L298N Motor Driver',  price: '$5.20', qty: 1 },
          ].map(item => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/6 border border-white/6"
            >
              <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                <Cpu size={16} className="text-mint/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                <p className="text-xs text-white/40 mt-0.5">Qty: {item.qty} · {item.price}</p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                className="text-white/30 hover:text-red-400 transition-colors"
              >
                <Heart size={14} />
              </button>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t border-white/8">
            <div className="flex justify-between text-sm text-white/60 mb-1">
              <span>Subtotal</span>
              <span className="font-semibold text-white">$29.18</span>
            </div>
            <Button variant="primary" fullWidth className="mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </Drawer>
    </section>
  )
}
