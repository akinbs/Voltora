import { Check } from 'lucide-react'
import type { CheckoutStepId } from '../../types/checkout'

interface CheckoutStepsProps {
  currentStep: CheckoutStepId
  completedSteps: CheckoutStepId[]
}

const STEPS: { id: CheckoutStepId; label: string }[] = [
  { id: 'contact',  label: 'Contact'  },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment',  label: 'Payment'  },
  { id: 'review',   label: 'Review'   },
]

const ORDER: Record<CheckoutStepId, number> = {
  contact: 0, shipping: 1, payment: 2, review: 3,
}

export function CheckoutSteps({ currentStep, completedSteps }: CheckoutStepsProps) {
  const currentIdx = ORDER[currentStep]

  return (
    <nav aria-label="Checkout steps" className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((step, idx) => {
          const isDone   = completedSteps.includes(step.id)
          const isActive = step.id === currentStep
          const isLast   = idx === STEPS.length - 1

          return (
            <li key={step.id} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <div className="flex flex-col items-center gap-1">
                <div
                  aria-current={isActive ? 'step' : undefined}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300
                    ${isDone   ? 'bg-mint text-voltora-black'                                       : ''}
                    ${isActive ? 'bg-voltora-black text-mint ring-2 ring-mint ring-offset-2'        : ''}
                    ${!isDone && !isActive ? 'bg-surface border-2 border-border text-muted/40'      : ''}
                  `}
                >
                  {isDone ? <Check size={12} aria-hidden="true" /> : idx + 1}
                </div>
                <span className={`text-[10px] font-semibold hidden sm:block whitespace-nowrap ${
                  isActive ? 'text-voltora-black' : isDone ? 'text-mint' : 'text-muted/40'
                }`}>
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className={`flex-1 h-px mx-2 mb-4 transition-colors duration-300 ${
                  idx < currentIdx ? 'bg-mint' : 'bg-border'
                }`} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
