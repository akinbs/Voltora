import { useState } from 'react'
import { Bell, Cpu, Package } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfilePreferencesCardProps {
  user: MockUser
}

interface Toggle {
  id:    string
  icon:  React.ElementType
  label: string
  desc:  string
}

const TOGGLES: Toggle[] = [
  { id: 'email-notifs', icon: Bell,    label: 'Email notifications',      desc: 'Order updates and promotional emails'    },
  { id: 'project-recs', icon: Cpu,     label: 'Project recommendations',  desc: 'Component suggestions for your builds'   },
  { id: 'stock-alerts', icon: Package, label: 'Stock alerts',             desc: 'Notified when items are back in stock'   },
]

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`Toggle ${label}`}
      onClick={onToggle}
      className="relative shrink-0 w-9 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
      style={{ background: on ? '#0B0B0B' : '#D9D9D9' }}
    >
      <span
        className="absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: on ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </button>
  )
}

export function ProfilePreferencesCard({ user }: ProfilePreferencesCardProps) {
  const [currency, setCurrency] = useState<'USD' | 'TRY'>(user.preferredCurrency)
  const [toggles,  setToggles]  = useState<Record<string, boolean>>({
    'email-notifs': true,
    'project-recs': true,
    'stock-alerts': false,
  })

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-voltora-black">Preferences</h2>
        <p className="text-[11px] text-muted/45 mt-0.5">Customize your Voltora experience.</p>
      </div>

      {/* Currency row */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border">
        <div>
          <p className="text-sm font-medium text-voltora-black mb-0.5">Display currency</p>
          <p className="text-[11px] text-muted/45">Used across all pricing</p>
        </div>
        <div className="flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
          {(['USD', 'TRY'] as const).map(c => (
            <button
              key={c}
              type="button"
              aria-pressed={currency === c}
              onClick={() => setCurrency(c)}
              className="px-4 py-1.5 transition-colors focus-visible:outline-none"
              style={
                currency === c
                  ? { background: '#0B0B0B', color: '#CFFFE2' }
                  : { background: '#fff', color: '#737373' }
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle rows */}
      <ul className="divide-y divide-border">
        {TOGGLES.map(({ id, icon: Icon, label, desc }) => (
          <li key={id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                <Icon size={13} className="text-muted/45" />
              </div>
              <div>
                <p className="text-sm font-medium text-voltora-black mb-0.5">{label}</p>
                <p className="text-[11px] text-muted/45">{desc}</p>
              </div>
            </div>
            <Toggle
              on={toggles[id]}
              onToggle={() => setToggles(p => ({ ...p, [id]: !p[id] }))}
              label={label}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
