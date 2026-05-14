import { Link } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { AuthCard } from '../components/auth/AuthCard'
import { LoginForm } from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        description="Sign in to your Voltora account"
        footer={
          <p className="text-center text-sm text-muted/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-voltora-black font-semibold hover:text-mint transition-colors">
              Create one
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  )
}
