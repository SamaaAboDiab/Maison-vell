import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LOOKS, PIECES, formatPrice } from '../data/collection'
import { PieceImage } from './Sprites'

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const input = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    setQ('')
    const t = setTimeout(() => input.current?.focus(), 60)
    const onKey = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    return () => { clearTimeout(t); removeEventListener('keydown', onKey) }
  }, [open, onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return PIECES.filter((p) => {
      const look = LOOKS.find((l) => l.number === p.look)
      return [p.name, p.category, look.name, look.palette].join(' ').toLowerCase().includes(term)
    })
  }, [q])

  const go = (to) => { onClose(); navigate(to) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Search"
          className="fixed inset-0 z-[210] overflow-y-auto bg-white/95 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-3xl px-5 pb-16 pt-10 desk:pt-20">
            <div className="flex justify-end">
              <button type="button" aria-label="Close search" onClick={onClose}>
                <X strokeWidth={1.5} className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); go(`/shop?q=${encodeURIComponent(q.trim())}`) }}
              className="mt-6 flex items-center gap-4 border-b border-ink pb-3"
            >
              <Search strokeWidth={1.5} className="h-5 w-5 shrink-0" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search pieces, colours, looks"
                className="wide w-full bg-transparent text-[15px] tracking-[.12em] outline-none placeholder:text-dim desk:text-[20px]"
              />
            </form>

            {!q.trim() && (
              <div className="mt-10">
                <p className="eyebrow">Popular</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Satin', 'Pleated', 'Coat', 'Blush', 'Accessories'].map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)} className="wide border border-line px-4 py-2 text-[10px] tracking-[.14em] transition-colors hover:border-ink">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.trim() && (
              <p className="mt-8 text-[13px] text-mid">
                {results.length ? `${results.length} ${results.length === 1 ? 'piece' : 'pieces'}` : `Nothing matches “${q}”. Try a colour or a fabric.`}
              </p>
            )}

            <motion.ul layout className="mt-4 grid grid-cols-2 gap-4 desk:grid-cols-4">
              <AnimatePresence>
                {results.map((p) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <button type="button" onClick={() => go(`/lookbook/${p.look}`)} className="group block w-full text-left">
                      <div className="aspect-[4/5] bg-rail p-4">
                        <PieceImage piece={p} />
                      </div>
                      <p className="wide mt-3 text-[9.5px] tracking-[.14em]">{p.name}</p>
                      <p className="mt-1 text-[12px] text-mid">{formatPrice(p.price)}</p>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
