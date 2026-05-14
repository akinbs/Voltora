import { Edit2 } from 'lucide-react'
import type { CheckoutFormState } from '../../types/checkout'
import type { CheckoutStepId } from '../../types/checkout'

interface CheckoutReviewProps {
  form:     CheckoutFormState
  onBack:   () => void
  onSubmit: () => void
  onEditStep: (step: CheckoutStepId) => void
}

export function CheckoutReview({ form, onBack, onSubmit, onEditStep }: CheckoutReviewProps) {
  const methodLabel = form.paymentMethod === 'card'
    ? `Card ending in ${form.cardNumber.slice(-4) || '••••'}`
    : form.paymentMethod === 'transfer'
    ? 'Bank Transfer'
    : 'Crypto'

  return (
    <div>
      <h2 className="text-base font-bold text-voltora-black mb-5">Review Your Order</h2>

      <div className="space-y-3 mb-6">
        <ReviewSection
          title="Contact"
          onEdit={() => onEditStep('contact')}
        >
          <p>{form.fullName}</p>
          <p>{form.email}</p>
          <p>{form.phone}</p>
        </ReviewSection>

        <ReviewSection
          title="Shipping Address"
          onEdit={() => onEditStep('shipping')}
        >
          <p>{form.address}</p>
          <p>{form.city}, {form.postalCode}</p>
          <p>{form.country}</p>
        </ReviewSection>

        <ReviewSection
          title="Payment"
          onEdit={() => onEditStep('payment')}
        >
          <p>{methodLabel}</p>
        </ReviewSection>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl text-sm font-semibold border border-border text-voltora-black hover:bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          style={{ background: '#000', color: '#CFFFE2' }}
        >
          Place Order (Mock)
        </button>
      </div>
    </div>
  )
}

interface ReviewSectionProps {
  title:    string
  onEdit:   () => void
  children: React.ReactNode
}

function ReviewSection({ title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="flex justify-between items-start p-4 rounded-xl bg-surface border border-border">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted/50 mb-1">{title}</p>
        <div className="text-sm text-voltora-black space-y-0.5">
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${title}`}
        className="p-1.5 rounded-lg text-muted/40 hover:text-voltora-black hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint shrink-0"
      >
        <Edit2 size={12} aria-hidden="true" />
      </button>
    </div>
  )
}
