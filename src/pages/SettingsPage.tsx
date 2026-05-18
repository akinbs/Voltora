import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Lock, Bell, DollarSign, Trash2, AlertTriangle, Check } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { mockUser } from '../data/mockUser'

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 14 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as number[] },
})

export default function SettingsPage() {
  const { userProfile } = useAuth()
  const profile = userProfile ?? mockUser

  const [currency, setCurrency] = useState<'USD' | 'TRY'>(profile.preferredCurrency)
  const [notifs,   setNotifs]   = useState({ orders: true, promos: false, stock: true })
  const [saved,    setSaved]    = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}
          >
            <Settings size={16} className="text-mint" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-voltora-black tracking-tight">Settings</h1>
        </motion.div>

        {/* Account settings */}
        <motion.section {...fadeUp(0.05)} aria-labelledby="settings-account">
          <SettingsCard icon={User} title="Account Settings" titleId="settings-account">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingsField label="Full name"  defaultValue={profile.fullName}     />
              <SettingsField label="Email"      type="email" defaultValue={profile.email} />
              <SettingsField label="Phone"      type="tel"   defaultValue={profile.phone ?? ''} />
              <SettingsField label="Company"    defaultValue={profile.company ?? ''} />
              <SettingsField label="Location"   defaultValue={profile.location ?? ''} className="sm:col-span-2" />
            </div>
          </SettingsCard>
        </motion.section>

        {/* Security */}
        <motion.section {...fadeUp(0.09)} aria-labelledby="settings-security">
          <SettingsCard icon={Lock} title="Security" titleId="settings-security">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingsField label="Current password"     type="password" placeholder="••••••••" />
              <div />
              <SettingsField label="New password"         type="password" placeholder="Min. 6 characters" />
              <SettingsField label="Confirm new password" type="password" placeholder="Repeat new password" />
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold border border-border text-voltora-black hover:bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              Update password
            </button>
          </SettingsCard>
        </motion.section>

        {/* Notifications */}
        <motion.section {...fadeUp(0.13)} aria-labelledby="settings-notifs">
          <SettingsCard icon={Bell} title="Notifications" titleId="settings-notifs">
            <ul className="space-y-3.5">
              {([
                { key: 'orders', label: 'Order updates', desc: 'Shipping and delivery notifications'   },
                { key: 'promos', label: 'Promotions',    desc: 'Sales, campaigns and new arrivals'     },
                { key: 'stock',  label: 'Stock alerts',  desc: 'Notify when wishlisted items restock'  },
              ] as const).map(({ key, label, desc }) => (
                <li key={key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-voltora-black">{label}</p>
                    <p className="text-[11px] text-muted/55">{desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifs[key]}
                    aria-label={`Toggle ${label}`}
                    onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1 ${
                      notifs[key] ? 'bg-voltora-black' : 'bg-border'
                    }`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifs[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </SettingsCard>
        </motion.section>

        {/* Currency */}
        <motion.section {...fadeUp(0.17)} aria-labelledby="settings-currency">
          <SettingsCard icon={DollarSign} title="Currency Preference" titleId="settings-currency">
            <p className="text-xs text-muted/60 mb-3">Select the currency for displaying product prices.</p>
            <div className="flex gap-2">
              {(['USD', 'TRY'] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={currency === c}
                  onClick={() => setCurrency(c)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                    currency === c
                      ? 'bg-voltora-black text-mint border-voltora-black'
                      : 'bg-white text-voltora-black border-border hover:border-voltora-black/30'
                  }`}
                >
                  {currency === c && <Check size={13} aria-hidden="true" />}
                  {c}
                </button>
              ))}
            </div>
          </SettingsCard>
        </motion.section>

        {/* Save */}
        <motion.div {...fadeUp(0.20)} className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
              saved ? 'bg-mint text-voltora-black' : ''
            }`}
            style={saved ? {} : { background: '#000', color: '#CFFFE2' }}
          >
            {saved ? <><Check size={14} aria-hidden="true" /> Saved!</> : 'Save Changes'}
          </button>
        </motion.div>

        {/* Danger zone */}
        <motion.section {...fadeUp(0.23)} aria-labelledby="settings-danger">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={15} className="text-red-500" aria-hidden="true" />
              <h2 id="settings-danger" className="text-sm font-bold text-red-600">Danger Zone</h2>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold text-red-600">Delete account</p>
                <p className="text-xs text-red-400 mt-0.5">Permanently removes all your data. Cannot be undone.</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 border border-red-300 bg-white hover:bg-red-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <Trash2 size={12} aria-hidden="true" />
                Delete account
              </button>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  )
}

// ——— Sub-components ————————————————————————————

interface SettingsCardProps {
  icon:     React.ElementType
  title:    string
  titleId:  string
  children: React.ReactNode
}

function SettingsCard({ icon: Icon, title, titleId, children }: SettingsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center">
          <Icon size={13} className="text-muted/50" aria-hidden="true" />
        </div>
        <h2 id={titleId} className="text-sm font-bold text-voltora-black">{title}</h2>
      </div>
      {children}
    </div>
  )
}

interface SettingsFieldProps {
  label:         string
  type?:         string
  defaultValue?: string
  placeholder?:  string
  className?:    string
}

function SettingsField({ label, type = 'text', defaultValue, placeholder, className }: SettingsFieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-voltora-black mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full h-10 px-3.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint/25 focus:border-mint hover:border-muted/60 transition-all text-voltora-black placeholder:text-muted/40"
      />
    </div>
  )
}
