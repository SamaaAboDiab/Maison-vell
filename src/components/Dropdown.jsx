import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export const pillSpring = { type: 'spring', stiffness: 400, damping: 34 }

const TRIGGER = 'wide relative flex max-w-full items-center gap-1.5 px-3 py-2 text-[10px] tracking-[.14em] transition-colors'

// A styled stand-in for <select>: native options can't be recoloured, so their highlight stays browser blue.
// `pill` fills the trigger with the shared black pill (layoutId cat-pill); `buttonClassName` replaces the
// trigger's look so it can match the buttons beside it.
export default function Dropdown({ label, listLabel, options, value, onPick, pill = false, className = '', buttonClassName, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={`relative min-w-0 ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={buttonClassName ?? `${TRIGGER} ${pill ? 'text-white' : 'text-mid hover:text-ink'}`}
      >
        {pill && <motion.span layoutId="cat-pill" className="absolute inset-0 bg-ink" transition={pillSpring} />}
        <span className="relative truncate">{label}</span>
        <ChevronDown strokeWidth={1.5} className={`relative h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={listLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-full z-30 mt-1 min-w-full border border-line bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,.08)] ${align === 'left' ? 'left-0' : 'right-0'}`}
          >
            {options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => { onPick(o.value); setOpen(false) }}
                  className={`wide block w-full whitespace-nowrap px-4 py-2.5 text-left text-[10px] tracking-[.14em] transition-colors ${o.value === value ? 'bg-ink text-white' : 'text-mid hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white'}`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
