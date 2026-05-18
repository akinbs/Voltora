import { MapPin, Plus, Star } from 'lucide-react'
import type { SavedAddress } from '../../types/user'

interface ProfileSavedAddressesProps {
  addresses: SavedAddress[]
}

export function ProfileSavedAddresses({ addresses }: ProfileSavedAddressesProps) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-voltora-black">
          Saved Addresses
          <span className="ml-2 text-[10px] font-medium text-muted/35">({addresses.length})</span>
        </h2>
        <button
          type="button"
          aria-label="Add new address"
          className="flex items-center gap-1.5 text-xs font-medium text-muted/55 hover:text-voltora-black transition-colors px-2.5 py-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <Plus size={11} />
          Add new
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted/40">No saved addresses yet.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {addresses.map(addr => (
            <li key={addr.id} className="flex items-start gap-4 px-5 py-4 hover:bg-surface/40 transition-colors">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}
              >
                <MapPin size={13} style={{ color: '#F59E0B' }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-voltora-black">{addr.title}</p>
                  {addr.isDefault && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                      <Star size={8} /> Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted/55 leading-relaxed">
                  {addr.fullName}
                </p>
                <p className="text-xs text-muted/45 leading-relaxed">
                  {addr.address}, {addr.city} {addr.postalCode}, {addr.country}
                </p>
              </div>

              {/* Action */}
              <button
                type="button"
                className="text-[10px] font-medium text-muted/40 hover:text-voltora-black transition-colors shrink-0 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded px-1"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
