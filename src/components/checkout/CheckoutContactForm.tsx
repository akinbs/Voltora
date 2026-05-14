import type { CheckoutFormState } from '../../types/checkout'

interface CheckoutContactFormProps {
  form:     CheckoutFormState
  onChange: (field: keyof CheckoutFormState, value: string) => void
  onNext:   () => void
}

export function CheckoutContactForm({ form, onChange, onNext }: CheckoutContactFormProps) {
  const isValid = form.email.includes('@') && form.fullName.trim().length > 1 && form.phone.trim().length >= 7

  return (
    <div>
      <h2 className="text-base font-bold text-voltora-black mb-5">Contact Information</h2>
      <div className="space-y-4">
        <Field
          label="Email address"
          type="email"
          value={form.email}
          onChange={v => onChange('email', v)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Field
          label="Full name"
          type="text"
          value={form.fullName}
          onChange={v => onChange('fullName', v)}
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />
        <Field
          label="Phone number"
          type="tel"
          value={form.phone}
          onChange={v => onChange('phone', v)}
          placeholder="+1 555 000 0000"
          autoComplete="tel"
          required
        />
      </div>
      <button
        type="button"
        disabled={!isValid}
        onClick={onNext}
        className="mt-6 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        style={{ background: '#000', color: '#CFFFE2' }}
      >
        Continue to Shipping
      </button>
    </div>
  )
}

interface FieldProps {
  label:        string
  type:         string
  value:        string
  onChange:     (v: string) => void
  placeholder?: string
  autoComplete?: string
  required?:    boolean
}

function Field({ label, type, value, onChange, placeholder, autoComplete, required }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-voltora-black mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black transition-shadow"
      />
    </div>
  )
}
