import type { CheckoutFormState } from '../../types/checkout'

interface CheckoutShippingFormProps {
  form:     CheckoutFormState
  onChange: (field: keyof CheckoutFormState, value: string) => void
  onNext:   () => void
  onBack:   () => void
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Netherlands', 'Turkey', 'Other',
]

export function CheckoutShippingForm({ form, onChange, onNext, onBack }: CheckoutShippingFormProps) {
  const isValid = form.address.trim().length > 3
    && form.city.trim().length > 1
    && form.postalCode.trim().length >= 3
    && form.country.length > 0

  return (
    <div>
      <h2 className="text-base font-bold text-voltora-black mb-5">Shipping Address</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-voltora-black mb-1.5">
            Street address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.address}
            onChange={e => onChange('address', e.target.value)}
            placeholder="123 Main Street, Apt 4B"
            autoComplete="street-address"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-voltora-black mb-1.5">
              City <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.city}
              onChange={e => onChange('city', e.target.value)}
              placeholder="San Francisco"
              autoComplete="address-level2"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-voltora-black mb-1.5">
              Postal code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.postalCode}
              onChange={e => onChange('postalCode', e.target.value)}
              placeholder="94105"
              autoComplete="postal-code"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-voltora-black mb-1.5">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            value={form.country}
            onChange={e => onChange('country', e.target.value)}
            autoComplete="country-name"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint text-voltora-black appearance-none"
          >
            <option value="">Select country…</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl text-sm font-semibold border border-border text-voltora-black hover:bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          style={{ background: '#000', color: '#CFFFE2' }}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
