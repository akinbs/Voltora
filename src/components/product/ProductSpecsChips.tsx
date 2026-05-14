import type { ProductSpec } from '../../types/product'

interface ProductSpecsChipsProps {
  specs:       ProductSpec[]
  maxVisible?: number
}

export function ProductSpecsChips({ specs, maxVisible = 4 }: ProductSpecsChipsProps) {
  const visible  = specs.slice(0, maxVisible)
  const overflow = specs.length - maxVisible

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((spec, i) => (
        <span
          key={i}
          className="text-[9px] font-medium px-2 py-0.5 rounded-full border text-muted/80 border-border bg-surface"
        >
          {spec.value}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-[9px] font-medium px-2 py-0.5 rounded-full border text-muted/55 border-border bg-surface">
          +{overflow}
        </span>
      )}
    </div>
  )
}
