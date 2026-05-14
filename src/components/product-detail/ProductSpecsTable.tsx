import type { Product } from '../../types/product'

interface ProductSpecsTableProps {
  product: Product
}

export function ProductSpecsTable({ product }: ProductSpecsTableProps) {
  if (product.technicalDetails && product.technicalDetails.length > 0) {
    return (
      <div className="space-y-5">
        {product.technicalDetails.map(group => (
          <div key={group.group}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-3.5 rounded-full" style={{ background: '#CFFFE2' }} aria-hidden="true" />
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted/70">{group.group}</h4>
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              {group.items.map((item, idx) => (
                <div
                  key={item.label + idx}
                  className={`flex items-center px-4 py-2.5 text-xs ${
                    idx % 2 === 0 ? 'bg-surface' : 'bg-white'
                  }`}
                >
                  <span className="text-muted/70 font-medium w-40 shrink-0">{item.label}</span>
                  <span className="text-voltora-black font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border">
      {product.specs.map((spec, idx) => (
        <div
          key={spec.label + idx}
          className={`flex items-center px-4 py-2.5 text-xs ${idx % 2 === 0 ? 'bg-surface' : 'bg-white'}`}
        >
          <span className="text-muted/70 font-medium w-40 shrink-0">{spec.label}</span>
          <span className="text-voltora-black font-semibold">{spec.value}</span>
        </div>
      ))}
    </div>
  )
}
