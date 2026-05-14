import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  label:        string
  value:        string
  onChange:     (v: string) => void
  error?:       string
  placeholder?: string
  autoComplete?: string
  disabled?:    boolean
  required?:    boolean
}

export function PasswordInput({
  label, value, onChange, error, placeholder = '••••••••',
  autoComplete = 'current-password', disabled, required,
}: PasswordInputProps) {
  const uid     = useId().replace(/:/g, '_')
  const inputId = `pw_${uid}`
  const errorId = `${inputId}_err`
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-voltora-black leading-none">
        {label}
        {required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full h-11 pl-4 pr-11 text-sm rounded-xl border transition-all duration-200 outline-none
            bg-surface placeholder:text-muted/50 text-voltora-black
            focus:ring-2 focus:ring-mint/25
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-400 focus:border-red-400' : 'border-border hover:border-muted/60 focus:border-mint'}
          `}
        />
        <button
          type="button"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow(s => !s)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded disabled:cursor-not-allowed"
        >
          {show ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500 leading-snug">
          {error}
        </p>
      )}
    </div>
  )
}
