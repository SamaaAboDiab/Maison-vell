import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { ModelImage, PieceImage } from '../components/Sprites'
import { LOOKS, findLook, formatPrice, lookLabel, modelAspect, piecesForLook } from '../data/collection'
import { GROUPS } from '../data/catalog'
import { useStore } from '../context/StoreContext'
import { usePageTitle } from '../hooks/usePageTitle'
import NotFound from './NotFound'

const ease = [0.2, 0.8, 0.2, 1]

export default function LookDetail() {
  const { look: param } = useParams()
  const look = findLook(param)
  usePageTitle(look ? `Look ${lookLabel(look.number)}` : 'Look not found')
  const { addToCart, isSaved, toggleSaved } = useStore()

  if (!look) return <NotFound />

  const pieces = piecesForLook(look.number)
  const index = LOOKS.indexOf(look)
  const prev = LOOKS[(index + LOOKS.length - 1) % LOOKS.length]
  const next = LOOKS[(index + 1) % LOOKS.length]
  const total = pieces.reduce((n, p) => n + p.price, 0)

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-8 desk:px-12 desk:pt-12">
      <Link to="/lookbook" className="wide inline-flex items-center gap-2 text-[10px] tracking-[.16em] text-mid hover:text-ink">
        <ArrowLeft strokeWidth={1.5} className="h-4 w-4" /> All looks
      </Link>

      <div className="mt-6 grid gap-10 desk:grid-cols-[1.1fr_1fr] desk:gap-16">
        <motion.div
          key={look.number}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="stage-bg flex aspect-[4/5] items-end justify-center overflow-hidden pt-10 desk:sticky desk:top-[calc(var(--header-h,0px)+24px)] desk:max-h-[calc(100svh-var(--header-h,0px)-48px)]"
        >
          <div className="floor-shadow relative h-[90%]" style={{ aspectRatio: modelAspect(look) }}>
            <ModelImage look={look} className="relative" label={`Look ${look.number}, ${look.name}`} />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="desk:py-6"
        >
          {[
            <p key="n" className="eyebrow">Look {lookLabel(look.number)} · {GROUPS.find((g) => g.id === look.group)?.title ?? 'Spring Summer 2027'}</p>,
            <h1 key="h" className="wide mt-4 text-[26px] tracking-[.12em] desk:text-[34px]">{look.name}</h1>,
            <p key="s" className="mt-5 text-[16px] leading-[1.75] text-mid">{look.story}</p>,
            <dl key="d" className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 text-[14px]">
              <div><dt className="eyebrow">Fabric</dt><dd className="mt-2">{look.fabric}</dd></div>
              <div><dt className="eyebrow">Palette</dt><dd className="mt-2">{look.palette}</dd></div>
            </dl>,
          ].map((node) => (
            <motion.div key={node.key} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
              {node}
            </motion.div>
          ))}

          <h2 className="wide mt-10 text-[11px] tracking-[.18em]">Pieces in this look</h2>
          {pieces.length === 0 && <p className="mt-4 text-[14px] text-mid">The pieces from this look arrive in the shop soon.</p>}
          <ul className="mt-5 space-y-4">
            {pieces.map((piece, i) => (
              <motion.li
                key={piece.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
                className="group flex gap-5 bg-rail p-4"
              >
                <div className="h-[120px] w-[100px] shrink-0 bg-white p-3">
                  <PieceImage piece={piece} label={piece.name} />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="wide text-[11px] tracking-[.14em]">{piece.name}</h3>
                      <p className="mt-1 text-[13px] text-mid">{piece.category}</p>
                    </div>
                    <button type="button" aria-pressed={isSaved(piece.id)} aria-label={`Save ${piece.name}`} onClick={() => toggleSaved(piece.id)}>
                      <Heart strokeWidth={1.4} className={`h-5 w-5 transition-colors ${isSaved(piece.id) ? 'fill-blush stroke-rose' : ''}`} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[14px]">{formatPrice(piece.price)}</span>
                    <button type="button" onClick={() => addToCart(piece.id)} className="wide text-[10px] tracking-[.16em] underline underline-offset-4 hover:text-mid">
                      Add to bag
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {pieces.length > 0 && (
              <motion.button whileTap={{ scale: 0.98 }} type="button" onClick={() => pieces.forEach((p) => addToCart(p.id))} className="btn-ink flex-1">
                {pieces.length > 1 ? 'Add the full look' : 'Add to bag'} · {formatPrice(total)}
              </motion.button>
            )}
            <Link to={`/?look=${look.number}`} className="btn-line">View on the runway</Link>
          </div>

          <nav className="mt-12 flex justify-between border-t border-line pt-6" aria-label="Other looks">
            <Link to={`/lookbook/${prev.number}`} className="group flex items-center gap-3">
              <ArrowLeft strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span><span className="eyebrow block">Look {lookLabel(prev.number)}</span><span className="text-[14px]">{prev.name}</span></span>
            </Link>
            <Link to={`/lookbook/${next.number}`} className="group flex items-center gap-3 text-right">
              <span><span className="eyebrow block">Look {lookLabel(next.number)}</span><span className="text-[14px]">{next.name}</span></span>
              <ArrowRight strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </motion.div>
      </div>
    </div>
  )
}
