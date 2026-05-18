import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockUser } from '../data/mockUser'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileInfoCard } from '../components/profile/ProfileInfoCard'
import { ProfileOrdersPreview } from '../components/profile/ProfileOrdersPreview'
import { ProfileSavedAddresses } from '../components/profile/ProfileSavedAddresses'
import { ProfileSecurityCard } from '../components/profile/ProfileSecurityCard'
import { ProfilePreferencesCard } from '../components/profile/ProfilePreferencesCard'

const TABS = [
  { id: 'overview',    label: 'Overview'    },
  { id: 'orders',      label: 'Orders'      },
  { id: 'addresses',   label: 'Addresses'   },
  { id: 'security',    label: 'Security'    },
  { id: 'preferences', label: 'Preferences' },
] as const

type TabId = typeof TABS[number]['id']

export default function ProfilePage() {
  const [tab, setTab] = useState<TabId>('overview')

  return (
    <div className="min-h-full bg-surface">
      <ProfileHeader user={mockUser} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tab bar */}
        <div className="flex gap-0.5 border-b border-border mt-0 overflow-x-auto scrollbar-none">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative shrink-0 px-4 py-3.5 text-sm transition-colors duration-150 focus-visible:outline-none
                ${tab === t.id
                  ? 'text-voltora-black font-semibold'
                  : 'text-muted/55 hover:text-muted font-medium'
                }`}
            >
              {t.label}
              {tab === t.id && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-voltora-black rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="py-6 pb-14"
          >
            {tab === 'overview' && (
              <div className="space-y-4">
                <ProfileInfoCard user={mockUser} />
                <ProfileOrdersPreview limit={3} />
              </div>
            )}
            {tab === 'orders'      && <ProfileOrdersPreview limit={100} />}
            {tab === 'addresses'   && <ProfileSavedAddresses addresses={mockUser.savedAddresses} />}
            {tab === 'security'    && <ProfileSecurityCard />}
            {tab === 'preferences' && <ProfilePreferencesCard user={mockUser} />}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
