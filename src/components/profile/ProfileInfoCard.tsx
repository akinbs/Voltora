import { User, Mail, Phone, Building2, MapPin, DollarSign, Edit2 } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfileInfoCardProps {
  user: MockUser
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const fields = [
    { icon: User,        label: 'Full name',          value: user.fullName           },
    { icon: Mail,        label: 'Email',               value: user.email             },
    { icon: Phone,       label: 'Phone',               value: user.phone ?? '—'      },
    { icon: Building2,   label: 'Company',             value: user.company ?? '—'    },
    { icon: MapPin,      label: 'Location',            value: user.location ?? '—'   },
    { icon: DollarSign,  label: 'Preferred currency',  value: user.preferredCurrency },
  ]

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold text-voltora-black">Account Information</h2>
        <button
          type="button"
          aria-label="Edit account information"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted/60 hover:text-voltora-black hover:bg-surface border border-transparent hover:border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <Edit2 size={11} aria-hidden="true" />
          Edit
        </button>
      </div>

      <ul className="space-y-3.5">
        {fields.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={12} className="text-muted/50" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/45 mb-0.5">{label}</p>
              <p className="text-sm text-voltora-black font-medium">{value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
