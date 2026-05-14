interface ProductsResultSummaryProps {
  total:            number
  filtered:         number
  searchQuery:      string
  activeFilterCount: number
}

export function ProductsResultSummary({
  total,
  filtered,
  searchQuery,
  activeFilterCount,
}: ProductsResultSummaryProps) {
  let label: string

  if (searchQuery.trim()) {
    label = `Results for "${searchQuery.trim()}"`
  } else if (activeFilterCount > 0) {
    label = `Filtered by ${activeFilterCount} active filter${activeFilterCount !== 1 ? 's' : ''}`
  } else {
    label = `All components`
  }

  return (
    <p className="text-[11px] text-muted/70 leading-none">
      <span className="font-semibold text-voltora-black text-xs">{filtered}</span>
      {filtered !== total && (
        <span className="text-muted/50"> of {total}</span>
      )}
      <span className="ml-1.5">{label}</span>
    </p>
  )
}
