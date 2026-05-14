import { Check } from 'lucide-react'

interface CartProgressProps {
  currentStep: 'cart' | 'checkout' | 'confirmation'
}

const STEPS = [
  { id: 'cart',         label: 'Cart'         },
  { id: 'checkout',     label: 'Checkout'     },
  { id: 'confirmation', label: 'Confirmation' },
] as const

const ORDER: Record<string, number> = { cart: 0, checkout: 1, confirmation: 2 }

export function CartProgress({ currentStep }: CartProgressProps) {
  const currentIdx = ORDER[currentStep]

  return (
    <nav aria-label="Order progress" className="flex items-center gap-0 mb-6">
      {STEPS.map((step, idx) => {
        const isDone    = idx < currentIdx
        const isActive  = idx === currentIdx
        const isLast    = idx === STEPS.length - 1

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                aria-current={isActive ? 'step' : undefined}
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-200
                  ${isDone   ? 'bg-mint text-voltora-black'        : ''}
                  ${isActive ? 'bg-voltora-black text-mint ring-2 ring-mint ring-offset-1' : ''}
                  ${!isDone && !isActive ? 'bg-surface border border-border text-muted/40' : ''}
                `}
              >
                {isDone ? <Check size={10} aria-hidden="true" /> : idx + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${
                isActive ? 'text-voltora-black' : isDone ? 'text-mint' : 'text-muted/40'
              }`}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className={`flex-1 h-px mx-2 ${idx < currentIdx ? 'bg-mint' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
