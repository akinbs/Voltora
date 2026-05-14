import { MapPin, Star, Plus } from 'lucide-react'
import type { SavedAddress } from '../../types/user'

interface ProfileSavedAddressesProps {
  addresses: SavedAddress[]
}

export function ProfileSavedAddresses({ addresses }: ProfileSavedAddressesProps) {
  return (
    <div id="addresses" className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-voltora-black">Saved Addresses</h2>
        <button
          type="button"
          aria-label="Add new address"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted/60 hover:text-voltora-black hover:bg-surface border border-transparent hover:border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <Plus size={11} aria-hidden="true" />
          Add
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-sm text-muted/50 text-center py-6">No saved addresses.</p>
      ) : (
        <ul className="space-y-3">
          {addresses.map(addr => (
            <li
              key={addr.id}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-surface"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.22)' }}
              >
                <MapPin size={12} className="text-mint" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-bold text-voltora-black">{addr.title}</p>
                  {addr.isDefault && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                      <Star size={8} aria-hidden="true" /> Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted/70 leading-relaxed">
                  {addr.fullName} · {addr.address}, {addr.city}, {addr.postalCode}, {addr.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
