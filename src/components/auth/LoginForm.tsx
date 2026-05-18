import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Loader2, CheckCircle2 } from 'lucide-react'
import { PasswordInput } from './PasswordInput'
import { SocialAuthButtons } from './SocialAuthButtons'
import { useMockAuth } from '../../hooks/useMockAuth'

export function LoginForm() {
  const { login, isLoading } = useMockAuth()
  const navigate = useNavigate()

  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors,     setErrors]     = useState<{ email?: string; password?: string }>({})
  const [success,    setSuccess]    = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!email.trim())           e.email    = 'Email is required.'
    else if (!email.includes('@')) e.email  = 'Enter a valid email address.'
    if (!password)               e.password = 'Password is required.'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const ok = await login({ email, password, rememberMe })
    if (ok) {
      setSuccess(true)
      setTimeout(() => navigate('/profile'), 900)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(207,255,226,0.15)', border: '1px solid rgba(207,255,226,0.3)' }}
        >
          <CheckCircle2 size={28} className="text-mint" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-voltora-black">Signed in successfully!</p>
        <p className="text-xs text-muted/60">Redirecting to your profile…</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-sm font-medium text-voltora-black leading-none">
          Email address <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'login-email-err' : undefined}
          className={`
            w-full h-11 px-4 text-sm rounded-xl border transition-all duration-200 outline-none
            bg-surface placeholder:text-muted/50 text-voltora-black focus:ring-2 focus:ring-mint/25
            ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-border hover:border-muted/60 focus:border-mint'}
          `}
        />
        {errors.email && (
          <p id="login-email-err" role="alert" className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-voltora-black">
            Password <span className="text-red-400" aria-hidden="true">*</span>
          </span>
          <Link to="/forgot-password" className="text-xs text-mint hover:text-mint-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded">
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          label=""
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          required
        />
      </div>

      {/* Remember me */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-border accent-voltora-black cursor-pointer"
        />
        <span className="text-sm text-muted/70">Remember me</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        {isLoading
          ? <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          : <LogIn size={15} aria-hidden="true" />
        }
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>

      <SocialAuthButtons />
    </form>
  )
}
