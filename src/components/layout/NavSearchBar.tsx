import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Hash, TrendingUp } from 'lucide-react'
import { mockProducts } from '../../data/mockProducts'

const CATEGORIES = ['Dev Boards', 'Sensors', 'Robotics', 'Power', 'Components', 'Kits', 'Tools', 'Cables']

const TRENDING = mockProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 3)

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-bold text-white">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

const fmt = (n: number) => `$${n.toFixed(2)}`

export function NavSearchBar() {
  const [query,    setQuery]    = useState('')
  const [focused,  setFocused]  = useState(false)
  const [selected, setSelected] = useState(-1)
  const inputRef    = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate    = useNavigate()

  const trimmed = query.trim()

  const productResults = trimmed
    ? mockProducts
        .filter(p =>
          p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
          p.category.toLowerCase().includes(trimmed.toLowerCase()) ||
          p.description.toLowerCase().includes(trimmed.toLowerCase())
        )
        .slice(0, 4)
    : []

  const categoryResults = trimmed
    ? CATEGORIES.filter(c => c.toLowerCase().includes(trimmed.toLowerCase())).slice(0, 3)
    : []

  const totalItems = productResults.length + categoryResults.length
  const open = focused

  /* ── ⌘K / Ctrl+K shortcut ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* ── Click outside closes ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
        setSelected(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'Escape') {
      setFocused(false)
      setSelected(-1)
      inputRef.current?.blur()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, totalItems))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, -1))
    }
    if (e.key === 'Enter') {
      if (selected === totalItems) {
        goSearch()
      } else if (selected >= 0 && selected < productResults.length) {
        navigate(`/products/${productResults[selected].slug}`)
        close()
      } else if (selected >= productResults.length) {
        const cat = categoryResults[selected - productResults.length]
        navigate(`/products?cat=${cat.toLowerCase().replace(' ', '')}`)
        close()
      } else if (trimmed) {
        goSearch()
      }
    }
  }, [open, selected, totalItems, productResults, categoryResults, trimmed])

  const goSearch = () => {
    if (trimmed) navigate(`/products?q=${encodeURIComponent(trimmed)}`)
    close()
  }

  const close = () => {
    setFocused(false)
    setSelected(-1)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">

      {/* ── Input pill ── */}
      <div
        className="flex items-center gap-2.5 h-9 px-3 rounded-xl transition-all duration-200"
        style={{
          background: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
          border: focused
            ? '1px solid rgba(255,255,255,0.18)'
            : '1px solid rgba(255,255,255,0.07)',
          boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <Search size={13} className="text-white/35 shrink-0" aria-hidden="true" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(-1) }}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, boards, kits..."
          aria-label="Search"
          aria-expanded={open}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-[13px] text-white/80 placeholder:text-white/25 outline-none"
        />

        <AnimatePresence initial={false}>
          {query ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              type="button"
              onClick={() => { setQuery(''); setSelected(-1); inputRef.current?.focus() }}
              aria-label="Clear search"
              className="flex items-center justify-center w-4 h-4 rounded-full shrink-0 text-white/30 hover:text-white/60 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <X size={9} strokeWidth={2.5} />
            </motion.button>
          ) : (
            <motion.kbd
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:flex items-center gap-0.5 text-[9px] font-medium text-white/20 shrink-0 select-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 4,
                padding: '1px 5px',
              }}
            >
              ⌘K
            </motion.kbd>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.4)',
            }}
          >
            {/* Empty state — no query */}
            {!trimmed && (
              <>
                {/* Trending */}
                <div className="px-3 pt-3 pb-1">
                  <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2">
                    <TrendingUp size={10} />
                    Trending
                  </p>
                  <ul>
                    {TRENDING.map((p, i) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => { navigate(`/products/${p.slug}`); close() }}
                          className="w-full flex items-center justify-between gap-3 px-2 py-2 rounded-lg text-left transition-colors hover:bg-white/5"
                          style={selected === i ? { background: 'rgba(255,255,255,0.06)' } : {}}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center"
                              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.15)' }}
                            >
                              <Search size={9} style={{ color: '#F59E0B' }} />
                            </div>
                            <span className="text-[12px] text-white/65 truncate">{p.name}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-white/35 shrink-0">{fmt(p.price)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <div className="px-3 py-2 border-t border-white/5">
                  <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2">
                    <Hash size={10} />
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.slice(0, 6).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => { navigate(`/products?cat=${cat.toLowerCase().replace(' ', '')}`); close() }}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-2 border-t border-white/5">
                  <p className="text-[9px] text-white/15 text-center">
                    Type to search · ↑↓ navigate · Enter select · Esc close
                  </p>
                </div>
              </>
            )}

            {/* Search results */}
            {trimmed && (productResults.length > 0 || categoryResults.length > 0) && (
              <>
                {productResults.length > 0 && (
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2">Products</p>
                    <ul>
                      {productResults.map((p, i) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => { navigate(`/products/${p.slug}`); close() }}
                            className="w-full flex items-center justify-between gap-3 px-2 py-2.5 rounded-lg text-left transition-colors"
                            style={selected === i ? { background: 'rgba(255,255,255,0.06)' } : {}}
                            onMouseEnter={() => setSelected(i)}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className="w-6 h-6 rounded-md shrink-0"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                              />
                              <div className="min-w-0">
                                <p className="text-[12px] text-white/75 truncate leading-none mb-0.5">
                                  {highlight(p.name, trimmed)}
                                </p>
                                <p className="text-[10px] text-white/25">{p.category}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-white/40 shrink-0">{fmt(p.price)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {categoryResults.length > 0 && (
                  <div className="px-3 py-2 border-t border-white/5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2">Categories</p>
                    <ul className="space-y-0.5">
                      {categoryResults.map((cat, i) => {
                        const idx = productResults.length + i
                        return (
                          <li key={cat}>
                            <button
                              type="button"
                              onClick={() => { navigate(`/products?cat=${cat.toLowerCase().replace(' ', '')}`); close() }}
                              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-colors"
                              style={selected === idx ? { background: 'rgba(255,255,255,0.06)' } : {}}
                              onMouseEnter={() => setSelected(idx)}
                            >
                              <Hash size={11} className="text-white/25 shrink-0" />
                              <span className="text-[12px] text-white/55">{highlight(cat, trimmed)}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* See all */}
                <button
                  type="button"
                  onClick={goSearch}
                  onMouseEnter={() => setSelected(totalItems)}
                  className="w-full flex items-center justify-between gap-2 px-5 py-2.5 border-t border-white/5 text-[11px] font-medium transition-colors"
                  style={
                    selected === totalItems
                      ? { color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }
                      : { color: 'rgba(255,255,255,0.35)' }
                  }
                >
                  <span>See all results for "<span className="text-white/60">{trimmed}</span>"</span>
                  <ArrowRight size={11} />
                </button>
              </>
            )}

            {/* No results */}
            {trimmed && productResults.length === 0 && categoryResults.length === 0 && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-white/30 mb-1">No results for "{trimmed}"</p>
                <p className="text-[10px] text-white/15">Try a different term or browse categories</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
