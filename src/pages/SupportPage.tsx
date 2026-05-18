import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LifeBuoy, Mail, MessageCircle, FileText, ChevronDown, Package, CreditCard, Truck, RefreshCw, Shield, Zap } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days within the US. Express (1–2 days) and international options are available at checkout.',
  },
  {
    q: 'Do you offer returns?',
    a: 'Yes — we accept returns within 30 days of delivery. Items must be unused and in original packaging. Submit a return request from your Orders page.',
  },
  {
    q: 'Can I track my order?',
    a: 'Absolutely. Once your order ships, you will receive a tracking code by email. You can also find it in your Orders page under account.',
  },
  {
    q: 'Do you offer bulk / wholesale pricing?',
    a: 'Yes. For orders of 50+ units, contact us at bulk@voltora.io for a custom quote. Discounts start at 10% for qualifying orders.',
  },
  {
    q: 'Are your components RoHS compliant?',
    a: 'All products sold on Voltora comply with RoHS Directive 2011/65/EU. Datasheets with compliance certificates are available on each product page.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.',
  },
]

const SUPPORT_CARDS = [
  {
    icon: Mail,
    label: 'Email Support',
    desc: 'support@voltora.io',
    sub: 'Reply within 24 hours',
    color: 'rgba(147,197,253,0.12)',
    border: 'rgba(147,197,253,0.25)',
    iconColor: '#93c5fd',
  },
  {
    icon: MessageCircle,
    label: 'Live Chat',
    desc: 'Chat with an agent',
    sub: 'Mon–Fri, 9am–6pm EST',
    color: 'rgba(207,255,226,0.10)',
    border: 'rgba(207,255,226,0.22)',
    iconColor: '#CFFFE2',
  },
  {
    icon: FileText,
    label: 'Documentation',
    desc: 'Guides & datasheets',
    sub: 'Always available',
    color: 'rgba(196,181,253,0.10)',
    border: 'rgba(196,181,253,0.22)',
    iconColor: '#c4b5fd',
  },
]

const TOPIC_LINKS = [
  { icon: Package,    label: 'Order issues'      },
  { icon: Truck,      label: 'Shipping & delivery' },
  { icon: RefreshCw,  label: 'Returns & refunds'  },
  { icon: CreditCard, label: 'Billing & payment'  },
  { icon: Shield,     label: 'Account & security' },
  { icon: Zap,        label: 'Product support'    },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-lg"
      >
        <span className="text-sm font-semibold text-voltora-black">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className="text-muted/40 shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted/65 leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SupportPage() {
  return (
    <div className="min-h-full bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}>
            <LifeBuoy size={22} className="text-mint" />
          </div>
          <h1 className="text-2xl font-black text-voltora-black tracking-tight mb-2">Help Center</h1>
          <p className="text-sm text-muted/55">We're here to help. Find answers or reach out to our team.</p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {SUPPORT_CARDS.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.button
                key={card.label}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border bg-white hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                style={{ borderColor: card.border }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: card.color, border: `1px solid ${card.border}` }}>
                  <Icon size={18} style={{ color: card.iconColor }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-voltora-black mb-0.5">{card.label}</p>
                  <p className="text-xs font-medium text-voltora-black/70">{card.desc}</p>
                  <p className="text-[10px] text-muted/45 mt-0.5">{card.sub}</p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Topic quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 className="text-xs font-bold tracking-widest uppercase text-muted/40 mb-3">Browse by topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TOPIC_LINKS.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  type="button"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.14 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-border hover:border-mint/25 hover:shadow-sm text-sm font-medium text-voltora-black/80 hover:text-voltora-black transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  <Icon size={14} className="text-muted/50 shrink-0" />
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-border px-5 py-2"
        >
          <h2 className="text-sm font-bold text-voltora-black pt-4 pb-2">Frequently Asked Questions</h2>
          {FAQ_ITEMS.map(item => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </motion.div>

      </div>
    </div>
  )
}
