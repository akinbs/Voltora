import { useId } from 'react'
import { cn } from '../../lib/cn'
import type { ProductVisualType } from '../../types/product'

interface VisualConfig {
  bg:       string
  accent:   string
  dotColor: string
  glow:     string
  chipBg:   string
  label:    string
}

const CONFIGS: Record<ProductVisualType, VisualConfig> = {
  board:     { bg: 'linear-gradient(145deg,#0a1f14,#060e09)', accent: '#CFFFE2', dotColor: '#CFFFE2', glow: 'rgba(207,255,226,0.09)', chipBg: '#0d2318', label: 'Dev Board'    },
  sensor:    { bg: 'linear-gradient(145deg,#0c1428,#080d1c)', accent: '#818cf8', dotColor: '#818cf8', glow: 'rgba(129,140,248,0.10)', chipBg: '#0e1530', label: 'Sensor'       },
  module:    { bg: 'linear-gradient(145deg,#1a0e00,#0f0700)', accent: '#f59e0b', dotColor: '#fbbf24', glow: 'rgba(245,158,11,0.08)',  chipBg: '#1c1000', label: 'Module'       },
  motor:     { bg: 'linear-gradient(145deg,#0e0e0e,#070707)', accent: '#94a3b8', dotColor: '#94a3b8', glow: 'rgba(148,163,184,0.07)', chipBg: '#161616', label: 'DC Motor'     },
  tool:      { bg: 'linear-gradient(145deg,#0d1117,#080d14)', accent: '#64748b', dotColor: '#94a3b8', glow: 'rgba(100,116,139,0.07)', chipBg: '#141a22', label: 'Tool'         },
  power:     { bg: 'linear-gradient(145deg,#180a00,#0f0500)', accent: '#f97316', dotColor: '#fb923c', glow: 'rgba(249,115,22,0.08)',  chipBg: '#1c0a00', label: 'Power Module' },
  cable:     { bg: 'linear-gradient(145deg,#0f0f0f,#070707)', accent: '#6b7280', dotColor: '#9ca3af', glow: 'rgba(107,114,128,0.06)', chipBg: '#1a1a1a', label: 'Connector'    },
  component: { bg: 'linear-gradient(145deg,#111111,#0a0a0a)', accent: '#9ca3af', dotColor: '#ffffff', glow: 'rgba(255,255,255,0.05)', chipBg: '#161616', label: 'Component'    },
}

const SIZE_H: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'h-20',
  sm: 'h-36',
  md: 'h-48',
  lg: 'h-56',
  xl: 'h-80',
}

/* ── per-type SVG illustrations ── */

function BoardIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <>
      <g stroke={ac} strokeWidth="0.6" fill="none" opacity="0.11">
        <polyline points="0,50 62,50 62,35 93,35" />
        <polyline points="0,80 55,80 55,95 93,95" />
        <polyline points="200,50 140,50 140,35 157,35" />
        <polyline points="200,80 148,80 148,95 157,95" />
      </g>
      <g fill={ac} opacity="0.20">
        <circle cx="62"  cy="50" r="2.5" />
        <circle cx="55"  cy="80" r="2.5" />
        <circle cx="140" cy="50" r="2.5" />
        <circle cx="148" cy="80" r="2.5" />
      </g>
      {/* Chip body */}
      <rect x="93" y="41" width="64" height="48" rx="2" fill={cb} stroke={ac} strokeWidth="0.8" strokeOpacity="0.28" />
      {/* Top pins */}
      {[0,1,2,3,4].map(i => <rect key={i} x={97+i*11} y="33" width="8" height="8" rx="1" fill={cb} stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />)}
      {/* Bottom pins */}
      {[0,1,2,3,4].map(i => <rect key={i} x={97+i*11} y="89" width="8" height="8" rx="1" fill={cb} stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />)}
      {/* Left pins */}
      {[0,1,2].map(i => <rect key={i} x="85" y={49+i*13} width="8" height="9" rx="1" fill={cb} stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />)}
      {/* Right pins */}
      {[0,1,2].map(i => <rect key={i} x="157" y={49+i*13} width="8" height="9" rx="1" fill={cb} stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />)}
      <text x="125" y="62" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={ac} fillOpacity="0.50" letterSpacing="1">MCU</text>
      <text x="125" y="74" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill={ac} fillOpacity="0.28">32-bit</text>
    </>
  )
}

function SensorIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <g transform="translate(100,65)">
      <circle r="54" stroke={ac} strokeWidth="0.5" fill="none" strokeOpacity="0.07" strokeDasharray="2 5" />
      <circle r="42" stroke={ac} strokeWidth="0.5" fill="none" strokeOpacity="0.10" strokeDasharray="2 4" />
      <circle r="30" stroke={ac} strokeWidth="0.6" fill="none" strokeOpacity="0.15" strokeDasharray="2 3" />
      {/* Body */}
      <circle r="20" fill={cb} stroke={ac} strokeWidth="0.8" strokeOpacity="0.32" />
      <circle r="13" fill={ac} fillOpacity="0.08" />
      <circle r="7"  fill={ac} fillOpacity="0.22" />
      <circle r="3"  fill={ac} fillOpacity="0.55" />
      {/* Mounting holes */}
      {[[-38,-30],[38,-30],[-38,30],[38,30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="none" stroke={ac} strokeWidth="0.7" strokeOpacity="0.22" />
      ))}
    </g>
  )
}

function ModuleIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <>
      {/* PCB body */}
      <rect x="55" y="40" width="90" height="50" rx="2" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.25" />
      {/* IC chip */}
      <rect x="75" y="50" width="50" height="30" rx="1" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.35" />
      <text x="100" y="68" textAnchor="middle" fontSize="6" fontFamily="monospace" fill={ac} fillOpacity="0.40">IC</text>
      {/* Left terminal blocks */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="42" y={45+i*13} width="13" height="11" rx="1" fill={cb} stroke={ac} strokeWidth="0.6" strokeOpacity="0.30" />
          <circle cx="48.5" cy={50.5+i*13} r="2.5" fill="none" stroke={ac} strokeWidth="0.6" strokeOpacity="0.35" />
        </g>
      ))}
      {/* Right terminal blocks */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="145" y={45+i*13} width="13" height="11" rx="1" fill={cb} stroke={ac} strokeWidth="0.6" strokeOpacity="0.30" />
          <circle cx="151.5" cy={50.5+i*13} r="2.5" fill="none" stroke={ac} strokeWidth="0.6" strokeOpacity="0.35" />
        </g>
      ))}
      {/* Header pins at top */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={65+i*10} y="33" width="7" height="7" rx="0.5" fill={cb} stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />
      ))}
    </>
  )
}

function MotorIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <>
      {/* Motor body (front circle) */}
      <circle cx="88" cy="65" r="44" fill={cb} stroke={ac} strokeWidth="0.8" strokeOpacity="0.25" />
      <circle cx="88" cy="65" r="36" fill="none" stroke={ac} strokeWidth="0.4" strokeOpacity="0.14" />
      {/* Winding slots – 8 spokes */}
      {Array.from({length: 8}, (_, i) => {
        const a = (i * Math.PI * 2) / 8
        return (
          <line key={i}
            x1={88} y1={65}
            x2={88 + Math.cos(a) * 36}
            y2={65 + Math.sin(a) * 36}
            stroke={ac} strokeWidth="0.5" strokeOpacity="0.12" />
        )
      })}
      {/* Hub */}
      <circle cx="88" cy="65" r="13" fill={cb} stroke={ac} strokeWidth="0.8" strokeOpacity="0.35" />
      <circle cx="88" cy="65" r="6"  fill={ac} fillOpacity="0.18" />
      <circle cx="88" cy="65" r="2.5" fill={ac} fillOpacity="0.50" />
      {/* Mounting holes */}
      {[[-38,0],[0,-38],[0,38]].map(([dx, dy], i) => (
        <circle key={i} cx={88+dx} cy={65+dy} r="3" fill="none" stroke={ac} strokeWidth="0.7" strokeOpacity="0.22" />
      ))}
      {/* Shaft */}
      <rect x="132" y="61" width="52" height="8" rx="4" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.28" />
      <circle cx="183" cy="65" r="5" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.35" />
    </>
  )
}

function ToolIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <>
      {/* Handle */}
      <rect x="8" y="56" width="108" height="18" rx="9" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.28" />
      {/* Grip lines */}
      {[30,46,62,78].map(x => (
        <line key={x} x1={x} y1={57} x2={x} y2={73} stroke={ac} strokeWidth="0.5" strokeOpacity="0.15" />
      ))}
      {/* Taper */}
      <path d="M116,56 L170,61 L170,69 L116,74 Z" fill={cb} stroke={ac} strokeWidth="0.6" strokeOpacity="0.25" />
      {/* Tip */}
      <path d="M170,61 L195,65 L170,69 Z" fill={cb} stroke={ac} strokeWidth="0.6" strokeOpacity="0.35" />
      {/* Heat glow */}
      <circle cx="196" cy="65" r="9"  fill={ac} fillOpacity="0.10" />
      <circle cx="196" cy="65" r="5"  fill={ac} fillOpacity="0.22" />
      <circle cx="196" cy="65" r="2.5" fill={ac} fillOpacity="0.50" />
      {/* Cable */}
      <path d="M8,65 C-2,55 2,72 -6,65" stroke={ac} strokeWidth="1.5" fill="none" strokeOpacity="0.18" strokeLinecap="round" />
    </>
  )
}

function PowerIllustration({ ac, cb }: { ac: string; cb: string }) {
  return (
    <>
      {/* PCB board */}
      <rect x="18" y="50" width="164" height="38" rx="2" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.22" />
      {/* Capacitor cylinder */}
      <rect x="28" y="35" width="24" height="35" rx="0" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.28" />
      <ellipse cx="40" cy="34" rx="12" ry="6" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.35" />
      {/* Capacitor stripes */}
      <line x1="28" y1="42" x2="52" y2="42" stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />
      <line x1="28" y1="50" x2="52" y2="50" stroke={ac} strokeWidth="0.5" strokeOpacity="0.22" />
      {/* Inductor coil bars */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={84+i*8} y="56" width="5" height="22" rx="2.5" fill={ac} fillOpacity="0.18" />
      ))}
      {/* IC chip */}
      <rect x="138" y="57" width="30" height="24" rx="1" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.35" />
      <text x="153" y="72" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill={ac} fillOpacity="0.40">LM</text>
      {/* Lightning bolt */}
      <path d="M175,32 L168,46 L173,46 L166,60" stroke={ac} strokeWidth="1.2" fill="none" strokeOpacity="0.45" strokeLinejoin="round" strokeLinecap="round" />
    </>
  )
}

function CableIllustration({ ac }: { ac: string }) {
  const WIRE_COLORS = ['#ef4444','#3b82f6','#22c55e','#eab308','#9ca3af','#e5e7eb']
  return (
    <>
      {/* Left connector block */}
      <rect x="2" y="26" width="14" height="78" rx="2" fill="#1a1a1a" stroke={ac} strokeWidth="0.7" strokeOpacity="0.30" />
      {/* Left holes */}
      {[0,1,2,3,4,5].map(i => (
        <circle key={i} cx="9" cy={39+i*11} r="2.5" fill="none" stroke={ac} strokeWidth="0.7" strokeOpacity="0.40" />
      ))}
      {/* Right connector block */}
      <rect x="184" y="26" width="14" height="78" rx="2" fill="#1a1a1a" stroke={ac} strokeWidth="0.7" strokeOpacity="0.30" />
      {/* Right holes */}
      {[0,1,2,3,4,5].map(i => (
        <circle key={i} cx="191" cy={39+i*11} r="2.5" fill="none" stroke={ac} strokeWidth="0.7" strokeOpacity="0.40" />
      ))}
      {/* Wires */}
      {WIRE_COLORS.map((color, i) => {
        const y0 = 39 + i * 11
        const cy = y0 + (i % 2 === 0 ? -12 : 12)
        return (
          <path
            key={i}
            d={`M16,${y0} C60,${y0} 80,${cy} 100,${cy} C120,${cy} 140,${y0} 184,${y0}`}
            stroke={color}
            strokeWidth="1.8"
            fill="none"
            opacity="0.30"
            strokeLinecap="round"
          />
        )
      })}
    </>
  )
}

function ComponentIllustration({ ac, cb }: { ac: string; cb: string }) {
  const cols = 9
  const rows = 4
  const startX = 30
  const spacingX = 16
  const topY = 40
  const botY = 76
  const spacingY = 7

  return (
    <>
      {/* Breadboard body */}
      <rect x="18" y="32" width="164" height="66" rx="3" fill={cb} stroke={ac} strokeWidth="0.7" strokeOpacity="0.22" />
      {/* Center gap */}
      <rect x="18" y="61" width="164" height="8" fill="rgba(0,0,0,0.35)" />
      {/* Top hole grid */}
      {Array.from({length: cols}, (_, c) =>
        Array.from({length: rows}, (_, r) => (
          <circle
            key={`t-${c}-${r}`}
            cx={startX + c * spacingX}
            cy={topY + r * spacingY}
            r="1.5"
            fill="none"
            stroke={ac}
            strokeWidth="0.7"
            strokeOpacity={r === 0 ? 0.30 : 0.16}
          />
        ))
      )}
      {/* Bottom hole grid */}
      {Array.from({length: cols}, (_, c) =>
        Array.from({length: rows}, (_, r) => (
          <circle
            key={`b-${c}-${r}`}
            cx={startX + c * spacingX}
            cy={botY + r * spacingY}
            r="1.5"
            fill="none"
            stroke={ac}
            strokeWidth="0.7"
            strokeOpacity={r === rows - 1 ? 0.30 : 0.16}
          />
        ))
      )}
      {/* Bus lines */}
      <line x1="18" y1="37" x2="182" y2="37" stroke="#ef4444" strokeWidth="0.5" opacity="0.20" />
      <line x1="18" y1="44" x2="182" y2="44" stroke="#3b82f6" strokeWidth="0.5" opacity="0.20" />
      <line x1="18" y1="85" x2="182" y2="85" stroke="#ef4444" strokeWidth="0.5" opacity="0.20" />
      <line x1="18" y1="92" x2="182" y2="92" stroke="#3b82f6" strokeWidth="0.5" opacity="0.20" />
    </>
  )
}

function getIllustration(type: ProductVisualType, cfg: VisualConfig): React.ReactNode {
  const ac = cfg.accent
  const cb = cfg.chipBg
  switch (type) {
    case 'board':     return <BoardIllustration     ac={ac} cb={cb} />
    case 'sensor':    return <SensorIllustration    ac={ac} cb={cb} />
    case 'module':    return <ModuleIllustration    ac={ac} cb={cb} />
    case 'motor':     return <MotorIllustration     ac={ac} cb={cb} />
    case 'tool':      return <ToolIllustration      ac={ac} cb={cb} />
    case 'power':     return <PowerIllustration     ac={ac} cb={cb} />
    case 'cable':     return <CableIllustration     ac={ac} />
    case 'component': return <ComponentIllustration ac={ac} cb={cb} />
    default:          return null
  }
}

/* ── public component ── */

interface ProductVisualProps {
  visualType: ProductVisualType
  name:       string
  size?:      'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ProductVisual({
  visualType,
  name,
  size = 'md',
  className,
}: ProductVisualProps) {
  const uid = useId().replace(/:/g, 'pv')
  const cfg = CONFIGS[visualType]

  return (
    <div
      className={cn('relative overflow-hidden', SIZE_H[size], className)}
      style={{ background: cfg.bg }}
      role="img"
      aria-label={`${name} product visual`}
    >
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id={`dots-${uid}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="0.65" fill={cfg.dotColor} opacity="0.13" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${uid})`} />
      </svg>

      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full blur-3xl pointer-events-none"
        style={{ background: cfg.glow }}
      />

      {/* Illustration SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 130"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {getIllustration(visualType, cfg)}
      </svg>

      {/* Type label */}
      <p
        className="absolute bottom-2 left-3 text-[8px] font-mono tracking-widest uppercase pointer-events-none select-none"
        style={{ color: `${cfg.accent}55` }}
        aria-hidden="true"
      >
        {cfg.label}
      </p>
    </div>
  )
}
