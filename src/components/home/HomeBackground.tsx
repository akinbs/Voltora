export function HomeBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute -top-[30%] -right-[10%] w-[900px] h-[900px] rounded-full blur-[220px]"
        style={{ background: 'rgba(207,255,226,0.035)' }}
      />
      <div
        className="absolute top-[50%] -left-[12%] w-[600px] h-[600px] rounded-full blur-[180px]"
        style={{ background: 'rgba(207,255,226,0.025)' }}
      />
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.025]" />
    </div>
  )
}
