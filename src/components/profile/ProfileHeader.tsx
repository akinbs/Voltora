import { MapPin, Building2, Edit2 } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfileHeaderProps {
  user: MockUser
}

const ROLE_LABEL: Record<string, string> = {
  customer: 'Customer',
  admin:    'Admin',
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 sm:p-8"
      style={{ background: '#0B0B0B' }}
    >
      {/* Subtle circuit bg */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
        <defs>
          <pattern id="ph-circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 H20 M40 30 H60 M30 0 V20 M30 40 V60" stroke="#CFFFE2" strokeWidth="0.6" fill="none"/>
            <circle cx="30" cy="30" r="2.5" stroke="#CFFFE2" strokeWidth="0.6" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-circuit)"/>
      </svg>
      <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(207,255,226,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold text-voltora-black shrink-0"
          style={{ background: 'linear-gradient(135deg, #CFFFE2 0%, #A2D5C6 100%)', boxShadow: '0 0 0 3px rgba(207,255,226,0.25)' }}
          aria-label={`Avatar for ${user.fullName}`}
        >
          {user.avatarInitials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{user.fullName}</h1>
            <span
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(207,255,226,0.14)', color: '#CFFFE2', border: '1px solid rgba(207,255,226,0.25)' }}
            >
              {ROLE_LABEL[user.role]}
            </span>
          </div>
          <p className="text-sm text-white/50 mb-2">{user.email}</p>
          <div className="flex items-center gap-3 flex-wrap">
            {user.location && (
              <span className="flex items-center gap-1.5 text-xs text-white/35">
                <MapPin size={11} aria-hidden="true" />
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1.5 text-xs text-white/35">
                <Building2 size={11} aria-hidden="true" />
                {user.company}
              </span>
            )}
          </div>
        </div>

        {/* Edit button */}
        <button
          type="button"
          aria-label="Edit profile"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint shrink-0"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <Edit2 size={12} aria-hidden="true" />
          Edit Profile
        </button>
      </div>
    </div>
  )
}
