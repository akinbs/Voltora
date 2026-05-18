import { ShoppingBag, Heart, MapPin, ShoppingCart } from 'lucide-react'

const STATS = [
  { icon: ShoppingBag, label: 'Orders',            value: '4',  accent: '#CFFFE2' },
  { icon: Heart,       label: 'Wishlist Items',    value: '8',  accent: '#f9a8d4' },
  { icon: MapPin,      label: 'Saved Addresses',   value: '2',  accent: '#93c5fd' },
  { icon: ShoppingCart,label: 'Active Cart',       value: '1',  accent: '#fcd34d' },
]

export function ProfileStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATS.map(({ icon: Icon, label, value, accent }) => (
        <div key={label} className="bg-white rounded-2xl border border-border p-4 flex flex-col gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            <Icon size={14} style={{ color: accent }} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xl font-bold text-voltora-black tabular-nums leading-none">{value}</p>
            <p className="text-[10px] text-muted/55 mt-0.5 font-medium">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
