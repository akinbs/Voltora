import { useState } from 'react'
import { DollarSign, Bell, Cpu, Package } from 'lucide-react'
import type { MockUser } from '../../types/user'

interface ProfilePreferencesCardProps {
  user: MockUser
}

interface PrefToggle {
  id:     string
  icon:   React.ElementType
  label:  string
  desc:   string
}

const TOGGLES: PrefToggle[] = [
  { id: 'email-notifs',     icon: Bell,    label: 'Email notifications',     desc: 'Receive order updates and promos' },
  { id: 'project-recs',     icon: Cpu,     label: 'Project recommendations', desc: 'Get component ideas for your builds' },
  { id: 'stock-alerts',     icon: Package, label: 'Stock alerts',            desc: 'Notify me when items are back' },
]

export function ProfilePreferencesCard({ user }: ProfilePreferencesCardProps) {
  const [currency, setCurrency] = useState<'USD' | 'TRY'>(user.preferredCurrency)
  const [toggles,  setToggles]  = useState<Record<string, boolean>>({
    'email-notifs':  true,
    'project-recs':  true,
    'stock-alerts':  false,
  })

  const toggle = (id: string) => setToggles(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <h2 className="text-sm font-bold text-voltora-black mb-4">Preferences</h2>

      {/* Currency */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center">
            <DollarSign size={13} className="text-muted/50" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-voltora-black">Preferred currency</p>
            <p className="text-[10px] text-muted/50">Used for pricing display</p>
          </div>
        </div>
        <div className="flex rounded-xl border border-border overflow-hidden text-xs font-semibold">
          {(['USD', 'TRY'] as const).map(c => (
            <button
              key={c}
              type="button"
              aria-pressed={currency === c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                currency === c
                  ? 'bg-voltora-black text-mint'
                  : 'bg-white text-muted/60 hover:bg-surface'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle items */}
      <ul className="space-y-3.5">
        {TOGGLES.map(({ id, icon: Icon, label, desc }) => (
          <li key={id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                <Icon size={13} className="text-muted/50" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-voltora-black">{label}</p>
                <p className="text-[10px] text-muted/50">{desc}</p>
              </div>
            </div>
            {/* Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={toggles[id]}
              aria-label={`Toggle ${label}`}
              onClick={() => toggle(id)}
              className={`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1 ${
                toggles[id] ? 'bg-voltora-black' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  toggles[id] ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
