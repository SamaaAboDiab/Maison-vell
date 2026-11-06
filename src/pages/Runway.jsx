import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react'
import { LOOKS, formatPrice, lookLabel, railPieces } from '../data/collection'
import { ModelImage, PieceImage, loadSheets } from '../components/Sprites'
import { useRunwayEngine } from '../hooks/useRunwayEngine'
import { useStore } from '../context/StoreContext'
import { usePageTitle } from '../hooks/usePageTitle'

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] } }),
}

const HINT_KEY = 'mv-runway-hint'
function hintSeen() {
  try {
    return localStorage.getItem(HINT_KEY) === 'seen'
  } catch {
    return false
  }
}
function markHintSeen() {
  try {
    localStorage.setItem(HINT_KEY, 'seen')
  } catch {
    // storage can be blocked (private mode); the hint then shows again next visit
  }
}

export default function Runway() {
  usePageTitle()
  const [params] = useSearchParams()
  const requested = Number(params.get('look'))
  const startIndex = Math.max(0, LOOKS.findIndex((l) => l.number === requested))

  const stageRef = useRef(null)
  const ringRef = useRef(null)
  const rollRef = useRef(null)
  const modelRefs = useRef([])
  const cardRefs = useRef([])
  // first-time visitors get a hint on how to walk the line; it leaves once they move to another look
  const [hint, setHint] = useState(() => !hintSeen())
  const onTravel = () => {
    setHint(false)
    markHintSeen()
  }
  const engine = useRunwayEngine({ stageRef, ringRef, rollRef, modelRefs, cardRefs, startIndex, onTravel })

  const [ready, setReady] = useState(false)
  useEffect(() => {
    let live = true
    loadSheets().then(() => live && setReady(true))
    return () => { live = false }
  }, [])
  const calm = useReducedMotion()

  // the rail runs look by look (not in shop order) so the engine can land on each look's first card
  const RAIL = LOOKS.flatMap(railPieces)

  const navigate = useNavigate()
  const { addToCart, isSaved, toggleSaved } = useStore()

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[1fr_190px] desk:grid-cols-[1fr_calc(372*var(--u))] desk:grid-rows-1">
      <section
        ref={stageRef}
        tabIndex={0}
        aria-label="Runway looks. Drag, scroll or use the arrow keys to change look."
        className="stage-bg relative min-w-0 touch-pan-y select-none overflow-hidden desk:cursor-none"
      >
        <div className="absolute inset-0">
          {LOOKS.map((look, i) => (
            <div
              key={look.number}
              ref={(el) => (modelRefs.current[i] = el)}
              data-model={i}
              className="floor-shadow absolute left-0 top-0 origin-top-left will-change-[transform,filter] desk:cursor-none"
            >
              <ModelImage look={look} className="relative" />
            </div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="pointer-events-none absolute left-4 top-[18px] z-[2] w-[calc(100%-32px)] desk:left-u46 desk:top-u36 desk:w-u390"
        >
          <motion.h2 variants={rise} custom={0} className="wide whitespace-nowrap text-[17px] font-normal leading-[1.2] tracking-[.16em] desk:text-u22">
            Spring Summer 2027
          </motion.h2>
          <motion.p variants={rise} custom={1} className="mt-u16 hidden text-u14 leading-[1.62] tracking-[.012em] text-mid desk:block">
            A study in softness and strength. The new season collection from Maison Vell blends delicate textures and
            modern silhouettes, crafted for a more beautiful tomorrow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          variants={rise}
          custom={2}
          className="absolute bottom-[18px] left-4 z-[2] desk:bottom-u44 desk:left-u46"
        >
          <div className="wide pointer-events-none flex gap-[.5em] text-[22px] leading-[30px] tracking-[.14em] desk:text-u29 desk:leading-u38" aria-live="polite">
            <span>Look</span>
            <span className="h-[30px] overflow-hidden desk:h-u38">
              <span ref={rollRef} className="block will-change-transform">
                {[...LOOKS, LOOKS[0]].map((l, i) => (
                  <b key={i} className="block h-[30px] font-normal desk:h-u38">{lookLabel(l.number)}</b>
                ))}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/lookbook/${engine.current.currentLook()}`)}
            className="wide link-underline mt-u13 text-u9.5"
          >
            Shop the look
          </button>
        </motion.div>

        {/* phones: bottom right, across from the look number; desktop: centred under the line */}
        <div className="pointer-events-none absolute bottom-[22px] right-4 z-[110] desk:bottom-u44 desk:left-1/2 desk:right-auto desk:-translate-x-1/2">
        <AnimatePresence>
          {ready && hint && (
            <motion.div
              key="hint"
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1.2, ease: [0.2, 0.8, 0.2, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="flex flex-col items-end gap-[10px] whitespace-nowrap text-right desk:items-center desk:gap-u14 desk:text-center"
            >
              {/* a dot gliding along a hairline between two chevrons: the line moves sideways */}
              <span aria-hidden="true" className="flex items-center gap-[6px] desk:gap-u8">
                <ChevronLeft strokeWidth={1.2} className="h-3 w-3 desk:h-u14 desk:w-u14" />
                <span className="relative block h-[7px] w-[44px] desk:h-u8 desk:w-u64">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-ink/25" />
                  <motion.span
                    className="absolute left-1/2 top-0 -ml-[3.5px] block h-[7px] w-[7px] rounded-full bg-ink desk:-ml-u4 desk:h-u8 desk:w-u8"
                    animate={calm ? undefined : { x: ['0%', '-260%', '260%', '0%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                  />
                </span>
                <ChevronRight strokeWidth={1.2} className="h-3 w-3 desk:h-u14 desk:w-u14" />
              </span>
              <span className="wide text-[9.5px] tracking-[.24em] desk:text-u14">
                <span className="desk:hidden">Swipe to explore</span>
                <span className="hidden desk:inline">Drag to explore</span>
              </span>
              <span className="hidden text-u12.5 tracking-[.02em] text-mid desk:block">
                Scroll, use the arrow keys or select a model
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        <div
          ref={ringRef}
          data-show="false"
          data-drag="false"
          className="pointer-events-none absolute left-0 top-0 z-[4] -ml-u23 -mt-u23 hidden h-u46 w-u46 rounded-full border-u2.5 border-solid border-ink opacity-0 transition-[width,height,margin,opacity] duration-[220ms] ease-soft data-[show=true]:opacity-100 data-[drag=true]:-ml-u42 data-[drag=true]:-mt-u17 data-[drag=true]:h-u34 data-[drag=true]:w-u84 desk:block"
        />
      </section>

      <aside className="relative min-h-0 overflow-hidden bg-rail" aria-label="Pieces in this look">
        {RAIL.map((piece, i) => (
          <article
            key={piece.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`group absolute left-0 top-0 flex h-full w-[160px] flex-col p-3 will-change-transform desk:w-full desk:px-u24 desk:py-u18 ${i % 2 ? 'bg-white' : 'bg-rail'}`}
          >
            <button
              type="button"
              aria-pressed={isSaved(piece.id)}
              aria-label={`Save ${piece.name}`}
              onClick={() => toggleSaved(piece.id)}
              className="absolute left-[10px] top-[10px] z-[1] h-u22 w-u22 desk:left-u22 desk:top-u18"
            >
              <motion.span whileTap={{ scale: 0.8 }} className="block h-full w-full">
                <Heart
                  strokeWidth={1.4}
                  className={`h-full w-full transition-colors duration-200 ${isSaved(piece.id) ? 'fill-blush stroke-rose' : 'fill-transparent'}`}
                />
              </motion.span>
            </button>
            <span className="block min-h-0 flex-1">
              <PieceImage piece={piece} />
            </span>
            <div className="mt-u8 grid grid-cols-[1fr_auto] items-end">
              <h3 className="wide text-u9.5 font-normal tracking-[.14em]">{piece.name}</h3>
              <span className="col-start-1 mt-u6 block text-u12.5 tracking-[.03em] text-mid">{formatPrice(piece.price)}</span>
              <button
                type="button"
                aria-label={`Add ${piece.name} to cart`}
                onClick={() => addToCart(piece.id)}
                className="col-start-2 row-span-2 row-start-1 grid h-u26 w-u26 place-items-center transition-transform duration-200 hover:rotate-90"
              >
                <Plus strokeWidth={1.5} className="h-u18 w-u18" />
              </button>
            </div>
          </article>
        ))}
      </aside>

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="wait"
            className="pointer-events-none fixed inset-0 z-[60] bg-haze"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
