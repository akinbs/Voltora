import { Lock, ShieldCheck, Monitor } from 'lucide-react'

interface SecurityItem {
  icon:   React.ElementType
  label:  string
  desc:   string
  action: string
  status?: string
}

const ITEMS: SecurityItem[] = [
  {
    icon:   Lock,
    label:  'Password',
    desc:   'Last changed 3 months ago',
    action: 'Change password',
    status: 'Secure',
  },
  {
    icon:   ShieldCheck,
    label:  'Two-factor authentication',
    desc:   'Add an extra layer of security',
    action: 'Enable 2FA',
  },
  {
    icon:   Monitor,
    label:  'Active sessions',
    desc:   '1 active session on this device',
    action: 'Manage sessions',
  },
]

export function ProfileSecurityCard() {
  return (
    <div id="security" className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <h2 className="text-sm font-bold text-voltora-black mb-4">Security</h2>
      <ul className="divide-y divide-border">
        {ITEMS.map(({ icon: Icon, label, desc, action, status }) => (
          <li key={label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                <Icon size={13} className="text-muted/50" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-voltora-black">{label}</p>
                  {status && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                      {status}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted/50">{desc}</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 text-xs font-medium text-voltora-black border border-border hover:border-voltora-black/40 hover:bg-surface px-2.5 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint whitespace-nowrap"
            >
              {action}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
