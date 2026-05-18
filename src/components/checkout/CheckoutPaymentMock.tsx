import { CreditCard, Building2, Bitcoin, AlertTriangle } from 'lucide-react'
import type { CheckoutFormState } from '../../types/checkout'
import { FlipCard } from './FlipCard'

interface CheckoutPaymentMockProps {
  form:     CheckoutFormState
  onChange: (field: keyof CheckoutFormState, value: string) => void
  onNext:   () => void
  onBack:   () => void
}

const METHODS = [
  { id: 'card' as const,     label: 'Credit / Debit Card', icon: CreditCard  },
  { id: 'transfer' as const, label: 'Bank Transfer',       icon: Building2   },
  { id: 'crypto' as const,   label: 'Crypto (Mock)',       icon: Bitcoin     },
]

export function CheckoutPaymentMock({ form, onChange, onNext, onBack }: CheckoutPaymentMockProps) {
  const isCardValid = form.paymentMethod !== 'card'
    || (form.cardNumber.replace(/\s/g, '').length >= 12 && form.cardName.trim().length > 1 && form.cardExpiry.length >= 4 && form.cardCvc.length >= 3)

  return (
    <div>
      <h2 className="text-base font-bold text-voltora-black mb-2">Payment</h2>

      {/* UI mock warning */}
      <div className="flex items-start gap-2 p-3 mb-5 rounded-xl bg-amber-50 border border-amber-200">
        <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          <strong>UI Mock Only</strong> — No real payment is processed. This is a frontend demo for Voltora.
        </p>
      </div>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {METHODS.map(m => {
          const Icon = m.icon
          const isActive = form.paymentMethod === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange('paymentMethod', m.id)}
              aria-pressed={isActive}
              className={`
                flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
                ${isActive
                  ? 'border-voltora-black bg-voltora-black/5'
                  : 'border-border hover:border-voltora-black/30 bg-surface'
                }
              `}
            >
              <Icon size={16} className={isActive ? 'text-voltora-black' : 'text-muted/50'} aria-hidden="true" />
              <span className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-voltora-black' : 'text-muted/50'}`}>
                {m.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Card preview + fields */}
      {form.paymentMethod === 'card' && (
        <div className="space-y-4">
          {/* Live card preview */}
          <div className="flex justify-center py-2">
            <FlipCard
              cardNumber={form.cardNumber}
              cardName={form.cardName}
              cardExpiry={form.cardExpiry}
              cardCvc={form.cardCvc}
            />
          </div>
          <p className="text-center text-[10px] text-muted/40">Hover to see back · CVC shown on reverse</p>
          <div>
            <label className="block text-xs font-semibold text-voltora-black mb-1.5">Card number</label>
            <input
              type="text"
              value={form.cardNumber}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                const fmt = v.match(/.{1,4}/g)?.join(' ') ?? v
                onChange('cardNumber', fmt)
              }}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              autoComplete="cc-number"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black font-mono tracking-wider"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-voltora-black mb-1.5">Cardholder name</label>
            <input
              type="text"
              value={form.cardName}
              onChange={e => onChange('cardName', e.target.value)}
              placeholder="Jane Doe"
              autoComplete="cc-name"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-voltora-black mb-1.5">Expiry</label>
              <input
                type="text"
                value={form.cardExpiry}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                  const fmt = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
                  onChange('cardExpiry', fmt)
                }}
                placeholder="MM/YY"
                maxLength={5}
                autoComplete="cc-exp"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-voltora-black mb-1.5">CVC</label>
              <input
                type="text"
                value={form.cardCvc}
                onChange={e => onChange('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                maxLength={4}
                autoComplete="cc-csc"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-mint placeholder:text-muted/40 text-voltora-black font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {form.paymentMethod === 'transfer' && (
        <div className="p-4 rounded-xl bg-surface border border-border text-sm text-muted/70 leading-relaxed">
          <p className="font-semibold text-voltora-black mb-1">Bank Transfer Details (Mock)</p>
          <p>IBAN: <span className="font-mono text-voltora-black">GB29 NWBK 6016 1331 9268 19</span></p>
          <p>Reference: <span className="font-mono text-voltora-black">VLT-2026-0001</span></p>
        </div>
      )}

      {form.paymentMethod === 'crypto' && (
        <div className="p-4 rounded-xl bg-surface border border-border text-sm text-muted/70 leading-relaxed">
          <p className="font-semibold text-voltora-black mb-1">Crypto Wallet (Mock)</p>
          <p className="font-mono text-voltora-black break-all text-xs">0x1a2b3c4d5e6f7890abcdef1234567890abcdef12</p>
          <p className="mt-1 text-[11px]">USDT (ERC-20) · Amount shown at confirmation</p>
        </div>
      )}

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
          disabled={!isCardValid}
          onClick={onNext}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          style={{ background: '#000', color: '#CFFFE2' }}
        >
          Review Order
        </button>
      </div>
    </div>
  )
}
