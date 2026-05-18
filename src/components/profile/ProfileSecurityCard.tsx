import { Lock, ShieldCheck, Monitor } from 'lucide-react'

interface SecurityRow {
  icon:    React.ElementType
  label:   string
  desc:    string
  action:  string
  status?: { label: string; ok: boolean }
}

const ROWS: SecurityRow[] = [
  {
    icon:   Lock,
    label:  'Password',
    desc:   'Last changed 3 months ago',
    action: 'Change',
    status: { label: 'Secure', ok: true },
  },
  {
    icon:   ShieldCheck,
    label:  'Two-factor auth',
    desc:   'Not enabled — add an extra layer of security',
    action: 'Enable',
    status: { label: 'Off', ok: false },
  },
  {
    icon:   Monitor,
    label:  'Active sessions',
    desc:   '1 active session on this device',
    action: 'Manage',
  },
]

export function ProfileSecurityCard() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-voltora-black">Security</h2>
        <p className="text-[11px] text-muted/45 mt-0.5">Manage your account security settings.</p>
      </div>

      <ul className="divide-y divide-border">
        {ROWS.map(({ icon: Icon, label, desc, action, status }) => (
          <li key={label} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface/40 transition-colors">
            {/* Left */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                <Icon size={13} className="text-muted/45" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-voltora-black">{label}</p>
                  {status && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      style={
                        status.ok
                          ? { color: '#16a34a', background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.15)' }
                          : { color: '#d97706', background: 'rgba(217,119,6,0.08)',  border: '1px solid rgba(217,119,6,0.15)'  }
                      }
                    >
                      {status.label}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted/45 leading-snug">{desc}</p>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              className="shrink-0 text-xs font-medium text-voltora-black border border-border hover:bg-surface px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint whitespace-nowrap"
            >
              {action}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
