import { FileText, Download, FileX } from 'lucide-react'
import type { Product } from '../../types/product'

interface ProductDatasheetCardProps {
  product: Product
}

export function ProductDatasheetCard({ product }: ProductDatasheetCardProps) {
  const ds = product.datasheet

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: '#0B0B0B', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center gap-2">
        <FileText size={14} style={{ color: '#CFFFE2' }} aria-hidden="true" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-white">Datasheet</h2>
      </div>

      {ds ? (
        <>
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(207,255,226,0.08)', border: '1px solid rgba(207,255,226,0.15)' }}
            >
              <FileText size={18} style={{ color: '#CFFFE2' }} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white leading-snug">{ds.fileName}</p>
              <p className="text-[10px] text-white/45 mt-0.5">
                {ds.version} · {ds.fileSize}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label={`Download ${ds.fileName}`}
            className="
              flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
              text-xs font-semibold transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint
              active:scale-[0.98]
            "
            style={{ background: 'rgba(207,255,226,0.10)', color: '#CFFFE2', border: '1px solid rgba(207,255,226,0.20)' }}
          >
            <Download size={13} aria-hidden="true" />
            Download Datasheet
          </button>

          <p className="text-[10px] text-white/30 text-center -mt-1">
            PDF · Manufacturer documentation
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4">
          <FileX size={22} style={{ color: 'rgba(255,255,255,0.2)' }} aria-hidden="true" />
          <p className="text-xs text-white/40 text-center leading-relaxed">
            Datasheet will be available soon.
          </p>
        </div>
      )}
    </div>
  )
}
