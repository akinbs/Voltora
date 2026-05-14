import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CheckoutStepId, CheckoutFormState } from '../types/checkout'
import { useMockCart } from '../hooks/useMockCart'
import { CheckoutSteps } from '../components/checkout/CheckoutSteps'
import { CheckoutContactForm } from '../components/checkout/CheckoutContactForm'
import { CheckoutShippingForm } from '../components/checkout/CheckoutShippingForm'
import { CheckoutPaymentMock } from '../components/checkout/CheckoutPaymentMock'
import { CheckoutReview } from '../components/checkout/CheckoutReview'
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary'
import { CheckoutSuccessMock } from '../components/checkout/CheckoutSuccessMock'
import { CartProgress } from '../components/cart/CartProgress'

const STEP_ORDER: CheckoutStepId[] = ['contact', 'shipping', 'payment', 'review']

const INITIAL_FORM: CheckoutFormState = {
  email: '', fullName: '', phone: '',
  address: '', city: '', postalCode: '', country: '',
  paymentMethod: 'card',
  cardNumber: '', cardName: '', cardExpiry: '', cardCvc: '',
}

export default function CheckoutPage() {
  const { items, totals }          = useMockCart()
  const [step, setStep]            = useState<CheckoutStepId>('contact')
  const [completed, setCompleted]  = useState<CheckoutStepId[]>([])
  const [form, setForm]            = useState<CheckoutFormState>(INITIAL_FORM)
  const [isSuccess, setIsSuccess]  = useState(false)

  const onChange = useCallback((field: keyof CheckoutFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx < STEP_ORDER.length - 1) {
      setCompleted(prev => prev.includes(step) ? prev : [...prev, step])
      setStep(STEP_ORDER[idx + 1])
    }
  }, [step])

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) setStep(STEP_ORDER[idx - 1])
  }, [step])

  const goToStep = useCallback((target: CheckoutStepId) => {
    setStep(target)
  }, [])

  const handleSubmit = useCallback(() => {
    setIsSuccess(true)
  }, [])

  if (isSuccess) {
    return (
      <div className="min-h-full bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <CheckoutSuccessMock />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Cart progress (shows checkout step) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          <CartProgress currentStep="checkout" />
          <h1 className="text-xl font-bold text-voltora-black tracking-tight">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: steps + form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
              <CheckoutSteps currentStep={step} completedSteps={completed} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {step === 'contact' && (
                    <CheckoutContactForm form={form} onChange={onChange} onNext={goNext} />
                  )}
                  {step === 'shipping' && (
                    <CheckoutShippingForm form={form} onChange={onChange} onNext={goNext} onBack={goBack} />
                  )}
                  {step === 'payment' && (
                    <CheckoutPaymentMock form={form} onChange={onChange} onNext={goNext} onBack={goBack} />
                  )}
                  {step === 'review' && (
                    <CheckoutReview form={form} onBack={goBack} onSubmit={handleSubmit} onEditStep={goToStep} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <CheckoutOrderSummary items={items} totals={totals} />
          </motion.div>
        </div>

      </div>
    </div>
  )
}
