import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Heart, Plus, X } from 'lucide-react'
import { PieceImage } from '../components/Sprites'
import Reveal from '../components/Reveal'
import Dropdown, { pillSpring } from '../components/Dropdown'
import { CATEGORIES, LOOKS, PIECES, formatPrice, lookLabel } from '../data/collection'
import { useStore } from '../context/StoreContext'
import { usePageTitle } from '../hooks/usePageTitle'

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  low: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
}

// how many categories stay visible as tabs on small screens; the rest go in the dropdown
const PHONE_TABS = 2

function CategoryTab({ c, active, onPick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onPick(c)}
      className={`wide relative shrink-0 px-3 py-2 text-[10px] tracking-[.14em] transition-colors ${active ? 'text-white' : 'text-mid hover:text-ink'}`}
    >
      {active && <motion.span layoutId="cat-pill" className="absolute inset-0 bg-ink" transition={pillSpring} />}
      <span className="relative">{c}</span>
    </button>
  )
}

export default function Shop() {
  usePageTitle('Shop')
  const [params, setParams] = useSearchParams()
  const { addToCart, isSaved, toggleSaved, saved } = useStore()

  const cat = CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'All'
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured'
  const q = params.get('q') || ''
  const savedOnly = params.get('saved') === '1'

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const pick = (c) => update('cat', c === 'All' ? '' : c)
  const moreActive = CATEGORIES.indexOf(cat) >= PHONE_TABS

  const shown = useMemo(() => {
    const term = q.toLowerCase()
    return PIECES.filter((p) => cat === 'All' || p.category === cat)
      .filter((p) => !savedOnly || saved.includes(p.id))
      .filter((p) => {
        if (!term) return true
        const look = LOOKS.find((l) => l.number === p.look)
        return [p.name, p.category, look.name, look.palette].join(' ').toLowerCase().includes(term)
      })
      .sort(SORTS[sort].fn)
  }, [cat, sort, q, savedOnly, saved])

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-12 desk:px-12 desk:pt-16">
      <Reveal>
        <p className="eyebrow">Shop</p>
        <h1 className="wide mt-4 text-[26px] tracking-[.12em] desk:text-[38px]">{savedOnly ? 'Saved pieces' : 'The collection'}</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-mid">
          Every piece from Spring Summer 2027, made in small runs in our Lyon atelier. Complimentary shipping on orders over $1,500.
        </p>
      </Reveal>

      <div className="sticky top-[var(--header-h,0px)] z-20 -mx-5 mt-10 border-b border-line bg-white/90 px-5 py-4 backdrop-blur desk:-mx-12 desk:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* small screens: the first three categories as tabs, the rest in a dropdown */}
          <LayoutGroup id="cats-phone">
            <div className="flex w-full items-center gap-1 desk:hidden" role="tablist" aria-label="Categories">
              {CATEGORIES.slice(0, PHONE_TABS).map((c) => (
                <CategoryTab key={c} c={c} active={c === cat} onPick={pick} />
              ))}
              {CATEGORIES.length > PHONE_TABS && (
                <Dropdown
                  label={moreActive ? cat : 'More'}
                  listLabel="More categories"
                  options={CATEGORIES.slice(PHONE_TABS).map((c) => ({ value: c, label: c }))}
                  value={cat}
                  onPick={pick}
                  pill={moreActive}
                  className="ml-auto"
                />
              )}
            </div>
          </LayoutGroup>
          <LayoutGroup id="cats">
            <div className="scroll-quiet hidden gap-1 overflow-x-auto desk:flex" role="tablist" aria-label="Categories">
              {CATEGORIES.map((c) => (
                <CategoryTab key={c} c={c} active={c === cat} onPick={pick} />
              ))}
            </div>
          </LayoutGroup>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-pressed={savedOnly}
              onClick={() => update('saved', savedOnly ? '' : '1')}
              className="wide flex items-center gap-2 text-[10px] tracking-[.14em]"
            >
              <Heart strokeWidth={1.4} className={`h-4 w-4 ${savedOnly ? 'fill-blush stroke-rose' : ''}`} /> Saved ({saved.length})
            </button>
            <Dropdown
              label={SORTS[sort].label}
              listLabel="Sort"
              options={Object.entries(SORTS).map(([k, s]) => ({ value: k, label: s.label }))}
              value={sort}
              onPick={(k) => update('sort', k === 'featured' ? '' : k)}
            />
          </div>
        </div>
        {q && (
          <button type="button" onClick={() => update('q', '')} className="mt-3 inline-flex items-center gap-2 bg-rail px-3 py-1.5 text-[12px]">
            Results for “{q}” <X strokeWidth={1.5} className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <p className="mt-6 text-[13px] text-mid">{shown.length} {shown.length === 1 ? 'piece' : 'pieces'}</p>

      {shown.length === 0 ? (
        <div className="py-24 text-center">
          <p className="wide text-[13px] tracking-[.16em]">{savedOnly ? 'No saved pieces yet' : 'Nothing found'}</p>
          <p className="mt-3 text-[14px] text-mid">
            {savedOnly ? 'Tap the heart on any piece to keep it here.' : 'Try another category or search term.'}
          </p>
          <Link to="/shop" className="btn-line mt-8">See everything</Link>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 desk:grid-cols-4 desk:gap-x-6">
          <AnimatePresence mode="popLayout">
            {shown.map((piece) => (
              <motion.li
                key={piece.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-rail">
                  <Link to={`/lookbook/${piece.look}`} className="block h-full p-6 desk:p-8" aria-label={`${piece.name}, look ${lookLabel(piece.look)}`}>
                    <div className="h-full transition-transform duration-500 ease-soft group-hover:scale-105">
                      <PieceImage piece={piece} />
                    </div>
                  </Link>
                  <button
                    type="button"
                    aria-pressed={isSaved(piece.id)}
                    aria-label={`Save ${piece.name}`}
                    onClick={() => toggleSaved(piece.id)}
                    className="absolute left-3 top-3"
                  >
                    <motion.span whileTap={{ scale: 0.75 }} className="block">
                      <Heart strokeWidth={1.4} className={`h-5 w-5 transition-colors ${isSaved(piece.id) ? 'fill-blush stroke-rose' : ''}`} />
                    </motion.span>
                  </button>
                  <span className="wide absolute right-3 top-3 text-[9px] tracking-[.14em] text-mid">Look {lookLabel(piece.look)}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(piece.id)}
                    className="wide absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 bg-white py-3 text-[9.5px] tracking-[.14em] opacity-100 transition-all duration-300 desk:opacity-0 desk:group-hover:translate-y-0 desk:group-hover:opacity-100"
                  >
                    <Plus strokeWidth={1.5} className="h-3.5 w-3.5" /> Add to bag
                  </button>
                </div>
                <h2 className="wide mt-4 text-[10px] tracking-[.14em]">{piece.name}</h2>
                <p className="mt-1.5 text-[13px] text-mid">{formatPrice(piece.price)}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  )
}
