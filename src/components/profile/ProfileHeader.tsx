import { MapPin, Building2, Edit2, ShoppingBag, Heart, ShoppingCart, CalendarDays } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfileHeaderProps {
  user: MockUser
}

const STATS = [
  { icon: ShoppingBag,  label: 'Orders',       value: '4'  },
  { icon: Heart,        label: 'Wishlist',      value: '8'  },
  { icon: ShoppingCart, label: 'In cart',       value: '3'  },
  { icon: CalendarDays, label: 'Member since',  value: '2024' },
]

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const joinYear = new Date(user.createdAt).getFullYear()

  return (
    <div style={{ background: '#0B0B0B' }}>
      {/* Top: identity */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0 select-none"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                boxShadow: '0 0 0 3px rgba(245,158,11,0.2)',
              }}
              aria-label={`Avatar: ${user.fullName}`}
            >
              {user.avatarInitials}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2.5 mb-0.5">
                <h1 className="text-base font-bold text-white tracking-tight leading-none">
                  {user.fullName}
                </h1>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-white/45 mb-2">{user.email}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {user.location && (
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <MapPin size={10} />
                    {user.location}
                  </span>
                )}
                {user.company && (
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <Building2 size={10} />
                    {user.company}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Edit button */}
          <button
            type="button"
            aria-label="Edit profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Edit2 size={11} />
            Edit
          </button>
        </div>
      </div>

      {/* Bottom: stats */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="grid grid-cols-4 divide-x divide-white/[0.06]">
          {STATS.map(({ icon: Icon, label, value }, i) => (
            <div key={label} className="flex flex-col items-start gap-0.5 px-4 py-4 first:pl-0 last:pr-0">
              <p className="text-base font-bold text-white tabular-nums leading-none">
                {label === 'Member since' ? joinYear : value}
              </p>
              <p className="text-[10px] text-white/30 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
