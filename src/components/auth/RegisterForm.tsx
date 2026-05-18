import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Loader2, CheckCircle2 } from 'lucide-react'
import { PasswordInput } from './PasswordInput'
import { SocialAuthButtons } from './SocialAuthButtons'
import { useAuth } from '../../hooks/useAuth'

interface Errors {
  fullName?:        string
  email?:           string
  password?:        string
  confirmPassword?: string
  acceptTerms?:     string
  form?:            string
}

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const [fullName,        setFullName]        = useState('')
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms,     setAcceptTerms]     = useState(false)
  const [errors,          setErrors]          = useState<Errors>({})
  const [success,         setSuccess]         = useState(false)

  const validate = () => {
    const e: Errors = {}
    if (!fullName.trim() || fullName.trim().length < 2) e.fullName = 'Full name is required.'
    if (!email.trim() || !email.includes('@'))          e.email    = 'Enter a valid email address.'
    if (!password || password.length < 6)               e.password = 'Password must be at least 6 characters.'
    if (password !== confirmPassword)                   e.confirmPassword = 'Passwords do not match.'
    if (!acceptTerms)                                   e.acceptTerms = 'You must accept the terms.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const result = await register({ fullName, email, password, confirmPassword, acceptTerms })
    if (result.success) {
      setSuccess(true)
      setTimeout(() => navigate('/profile'), 900)
    } else {
      setErrors(prev => ({ ...prev, form: result.error ?? 'Registration failed. Please try again.' }))
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
        <p className="text-sm font-semibold text-voltora-black">Account created!</p>
        <p className="text-xs text-muted/60">Redirecting to your profile…</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* Form-level error */}
      {errors.form && (
        <div
          role="alert"
          className="px-4 py-3 rounded-xl text-sm text-red-700 border border-red-200"
          style={{ background: 'rgba(239,68,68,0.06)' }}
        >
          {errors.form}
        </div>
      )}

      {/* Full name */}
      <InputField
        id="reg-fullname"
        label="Full name"
        type="text"
        value={fullName}
        onChange={setFullName}
        placeholder="Jane Doe"
        autoComplete="name"
        error={errors.fullName}
        required
      />

      {/* Email */}
      <InputField
        id="reg-email"
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
        required
      />

      {/* Password */}
      <PasswordInput
        label="Password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        placeholder="Min. 6 characters"
        autoComplete="new-password"
        required
      />

      {/* Confirm password */}
      <PasswordInput
        label="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirmPassword}
        placeholder="Repeat password"
        autoComplete="new-password"
        required
      />

      {/* Accept terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={e => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-border accent-voltora-black cursor-pointer shrink-0"
          />
          <span className="text-sm text-muted/70 leading-snug">
            I accept the{' '}
            <span className="text-voltora-black font-medium underline underline-offset-2 cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-voltora-black font-medium underline underline-offset-2 cursor-pointer">Privacy Policy</span>
          </span>
        </label>
        {errors.acceptTerms && (
          <p role="alert" className="text-xs text-red-500 mt-1">{errors.acceptTerms}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        {isLoading
          ? <Loader2 size={15} className="animate-spin" aria-hidden="true" />
          : <UserPlus size={15} aria-hidden="true" />
        }
        {isLoading ? 'Creating account…' : 'Create Account'}
      </button>

      <SocialAuthButtons />

      <p className="text-center text-sm text-muted/70">
        Already have an account?{' '}
        <Link to="/login" className="text-voltora-black font-semibold hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded">
          Sign in
        </Link>
      </p>
    </form>
  )
}

interface InputFieldProps {
  id:            string
  label:         string
  type:          string
  value:         string
  onChange:      (v: string) => void
  placeholder?:  string
  autoComplete?: string
  error?:        string
  required?:     boolean
}

function InputField({ id, label, type, value, onChange, placeholder, autoComplete, error, required }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-voltora-black leading-none">
        {label}{required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={!!error}
        className={`
          w-full h-11 px-4 text-sm rounded-xl border transition-all duration-200 outline-none
          bg-surface placeholder:text-muted/50 text-voltora-black focus:ring-2 focus:ring-mint/25
          ${error ? 'border-red-400 focus:border-red-400' : 'border-border hover:border-muted/60 focus:border-mint'}
        `}
      />
      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
