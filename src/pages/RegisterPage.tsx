import { AuthLayout } from '../components/auth/AuthLayout'
import { AuthCard } from '../components/auth/AuthCard'
import { RegisterForm } from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Create account"
        description="Join Voltora and start building."
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  )
}
