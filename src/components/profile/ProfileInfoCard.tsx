import { useState } from 'react'
import { Edit2, Check } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfileInfoCardProps {
  user: MockUser
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const [editing, setEditing] = useState(false)

  const fields: { label: string; value: string }[] = [
    { label: 'Full name',    value: user.fullName           },
    { label: 'Email',        value: user.email              },
    { label: 'Phone',        value: user.phone    ?? '—'    },
    { label: 'Company',      value: user.company  ?? '—'    },
    { label: 'Location',     value: user.location ?? '—'    },
    { label: 'Currency',     value: user.preferredCurrency  },
  ]

  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-voltora-black">Personal Information</h2>
        <button
          type="button"
          onClick={() => setEditing(v => !v)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-lg px-2.5 py-1.5"
          style={
            editing
              ? { color: '#16a34a', background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)' }
              : { color: '#737373', background: 'transparent', border: '1px solid transparent' }
          }
        >
          {editing ? <><Check size={11} /> Save</> : <><Edit2 size={11} /> Edit</>}
        </button>
      </div>

      {/* Fields */}
      <ul className="divide-y divide-border">
        {fields.map(({ label, value }) => (
          <li key={label} className="flex items-center justify-between gap-6 px-5 py-3.5">
            <span className="text-xs text-muted/50 font-medium shrink-0 w-28">{label}</span>
            {editing ? (
              <input
                defaultValue={value === '—' ? '' : value}
                placeholder={value === '—' ? 'Not set' : undefined}
                className="flex-1 text-sm text-voltora-black font-medium text-right bg-transparent border-b border-border focus:border-voltora-black outline-none pb-0.5 transition-colors"
              />
            ) : (
              <span className="text-sm text-voltora-black font-medium text-right flex-1 truncate">
                {value}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-surface/60">
        <p className="text-[10px] text-muted/40 font-medium">
          Member since {joinDate}
        </p>
      </div>
    </div>
  )
}
