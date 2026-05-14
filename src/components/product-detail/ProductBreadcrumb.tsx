import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface ProductBreadcrumbProps {
  category: string
  name:     string
}

export function ProductBreadcrumb({ category, name }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 flex-wrap">
      <Link
        to="/"
        className="text-[11px] text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded"
      >
        Home
      </Link>
      <ChevronRight size={10} className="text-muted/40 shrink-0" aria-hidden="true" />
      <Link
        to="/products"
        className="text-[11px] text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded"
      >
        Products
      </Link>
      <ChevronRight size={10} className="text-muted/40 shrink-0" aria-hidden="true" />
      <Link
        to={`/products?category=${encodeURIComponent(category)}`}
        className="text-[11px] text-muted/60 hover:text-voltora-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mint rounded"
      >
        {category}
      </Link>
      <ChevronRight size={10} className="text-muted/40 shrink-0" aria-hidden="true" />
      <span className="text-[11px] font-medium text-voltora-black max-w-[180px] truncate" aria-current="page">
        {name}
      </span>
    </nav>
  )
}
