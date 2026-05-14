import { motion } from 'framer-motion'
import { mockUser } from '../data/mockUser'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileNavigation } from '../components/profile/ProfileNavigation'
import { ProfileInfoCard } from '../components/profile/ProfileInfoCard'
import { ProfileOrdersPreview } from '../components/profile/ProfileOrdersPreview'
import { ProfileSavedAddresses } from '../components/profile/ProfileSavedAddresses'
import { ProfileSecurityCard } from '../components/profile/ProfileSecurityCard'
import { ProfilePreferencesCard } from '../components/profile/ProfilePreferencesCard'

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as number[] },
})

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">

        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <ProfileHeader user={mockUser} />
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.05)}>
          <ProfileStats />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar nav */}
          <motion.div {...fadeUp(0.08)} className="lg:col-span-1">
            <ProfileNavigation />
          </motion.div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-5">
            <motion.div {...fadeUp(0.10)}>
              <ProfileInfoCard user={mockUser} />
            </motion.div>

            <motion.div {...fadeUp(0.13)}>
              <ProfileOrdersPreview />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div {...fadeUp(0.16)}>
                <ProfileSavedAddresses addresses={mockUser.savedAddresses} />
              </motion.div>
              <motion.div {...fadeUp(0.19)}>
                <ProfileSecurityCard />
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.22)}>
              <ProfilePreferencesCard user={mockUser} />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  )
}
