import { Link } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { AuthCard } from '../components/auth/AuthCard'
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Reset password"
        description="Enter your email and we'll send you a reset link."
        footer={
          <p className="text-center text-sm text-muted/70">
            Remembered your password?{' '}
            <Link to="/login" className="text-voltora-black font-semibold hover:text-mint transition-colors">
              Sign in
            </Link>
          </p>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  )
}
