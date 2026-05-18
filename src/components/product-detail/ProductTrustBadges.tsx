import { ShieldCheck, CreditCard, Zap, MessageCircle } from 'lucide-react'

const BADGES = [
  { icon: ShieldCheck,   title: 'Original Parts',    desc: 'Verified authentic components'    },
  { icon: CreditCard,    title: 'Secure Payment',    desc: 'SSL-encrypted checkout'            },
  { icon: Zap,           title: 'Fast Dispatch',     desc: 'Ships within 48 hours'             },
  { icon: MessageCircle, title: 'Project Support',   desc: 'Tech help for your build'          },
]

export function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-border">
      {BADGES.map(b => (
        <div key={b.title} className="flex items-start gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(207,255,226,0.12)', border: '1px solid rgba(207,255,226,0.25)' }}
          >
            <b.icon size={13} style={{ color: '#1f8c59' }} aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-voltora-black leading-none mb-0.5">{b.title}</p>
            <p className="text-[10px] text-muted/65 leading-snug">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
