import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading } = useAuth()
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    const result = await forgotPassword(email)
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error ?? 'Failed to send reset link. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="flex flex-col gap-4">
        <div
          className="flex items-start gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(207,255,226,0.10)', border: '1px solid rgba(207,255,226,0.25)' }}
        >
          <CheckCircle2 size={18} className="text-mint shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-voltora-black mb-0.5">Check your inbox</p>
            <p className="text-xs text-muted/70 leading-relaxed">
              If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            </p>
          </div>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-voltora-black hover:text-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="forgot-email" className="text-sm font-medium text-voltora-black leading-none">
          Email address <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" aria-hidden="true" />
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? 'forgot-email-err' : undefined}
            className={`
              w-full h-11 pl-10 pr-4 text-sm rounded-xl border transition-all duration-200 outline-none
              bg-surface placeholder:text-muted/50 text-voltora-black focus:ring-2 focus:ring-mint/25
              ${error ? 'border-red-400 focus:border-red-400' : 'border-border hover:border-muted/60 focus:border-mint'}
            `}
          />
        </div>
        {error && <p id="forgot-email-err" role="alert" className="text-xs text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        {isLoading ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Mail size={15} aria-hidden="true" />}
        {isLoading ? 'Sending…' : 'Send Reset Link'}
      </button>

      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-sm text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        Back to login
      </Link>
    </form>
  )
}
