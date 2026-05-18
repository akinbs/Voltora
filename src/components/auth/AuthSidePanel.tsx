import { Shield, Heart, Zap } from 'lucide-react'

const FEATURES = [
  { icon: Shield, label: 'Secure account',   desc: 'SSL-encrypted & private'  },
  { icon: Heart,  label: 'Saved wishlist',   desc: 'Keep your favorites sync' },
  { icon: Zap,    label: 'Faster checkout',  desc: 'Saved addresses & cards'  },
]

export function AuthSidePanel() {
  return (
    <div
      className="relative hidden lg:flex flex-col justify-between h-full min-h-[560px] p-10 overflow-hidden rounded-l-3xl"
      style={{ background: '#0B0B0B' }}
    >
      {/* Circuit pattern background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.055] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="auth-circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 40 H30 M50 40 H70" stroke="#CFFFE2" strokeWidth="0.8" fill="none"/>
            <path d="M40 10 V30 M40 50 V70" stroke="#CFFFE2" strokeWidth="0.8" fill="none"/>
            <circle cx="40" cy="40" r="3" stroke="#CFFFE2" strokeWidth="0.8" fill="none"/>
            <circle cx="10" cy="40" r="1.5" fill="#CFFFE2"/>
            <circle cx="70" cy="40" r="1.5" fill="#CFFFE2"/>
            <circle cx="40" cy="10" r="1.5" fill="#CFFFE2"/>
            <circle cx="40" cy="70" r="1.5" fill="#CFFFE2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-circuit)"/>
      </svg>

      {/* Mint glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(207,255,226,0.09) 0%, transparent 70%)' }}
      />

      {/* Brand */}
      <div className="relative z-10">
        <span className="font-bold text-2xl tracking-tight select-none">
          <span className="text-white">VOLT</span>
          <span className="text-mint">ORA</span>
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white leading-snug mb-3 tracking-tight">
          Build your next circuit<br />with confidence.
        </h2>
        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
          Access your cart, orders, saved components and project-ready tools.
        </p>
      </div>

      {/* Features */}
      <div className="relative z-10 space-y-3.5">
        {FEATURES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(207,255,226,0.10)', border: '1px solid rgba(207,255,226,0.18)' }}
            >
              <Icon size={14} className="text-mint" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/85">{label}</p>
              <p className="text-[10px] text-white/35">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="relative z-10 text-[10px] text-white/20">
        © 2026 Voltora. Neo Lab Store.
      </p>
    </div>
  )
}
