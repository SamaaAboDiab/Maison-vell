import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ModelImage } from '../components/Sprites'
import Reveal from '../components/Reveal'
import { LOOKS, PIECES, formatPrice, lookLabel, modelAspect, piecesForLook } from '../data/collection'
import { GROUPS } from '../data/catalog'
import { usePageTitle } from '../hooks/usePageTitle'
import Dropdown from '../components/Dropdown'

const SECTION_BUTTON = 'wide shrink-0 items-center gap-1.5 border border-line px-3 py-2 text-[10px] desk:px-4 tracking-[.14em] transition-colors hover:border-ink'

export default function Lookbook() {
  usePageTitle('Lookbook')
  // only sections that have looks with images
  const groups = GROUPS.map((g) => ({ ...g, looks: LOOKS.filter((l) => l.group === g.id) })).filter((g) => g.looks.length)
  const [picked, setPicked] = useState(null)

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-12 desk:px-12 desk:pt-16">
      <div className="grid gap-6 desk:grid-cols-[1fr_auto] desk:items-end">
        <Reveal>
          <p className="eyebrow">Lookbook</p>
          <h1 className="wide mt-4 text-[26px] tracking-[.12em] desk:text-[38px]">Spring Summer 2027</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-mid">
            {LOOKS.length} looks, {PIECES.length} pieces. Shown in Lyon in September, worn in the soft light of the
            morning. Open any look to see the pieces, the fabrics and the story behind it.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/" className="btn-line">Walk the runway</Link>
        </Reveal>
      </div>

      <nav aria-label="Lookbook sections" className="sticky top-[var(--header-h,0px)] z-20 -mx-5 mt-10 flex gap-2 border-b border-line bg-white/90 px-5 py-4 backdrop-blur desk:-mx-12 desk:px-12">
        {/* small screens: the first section as a button, the rest in a dropdown, so the bar never scrolls sideways */}
        {groups.map((g, i) => (
          <a key={g.id} href={`#${g.id}`} className={`${SECTION_BUTTON} ${i === 0 ? 'flex' : 'hidden desk:flex'}`}>
            {g.title} <span className="hidden text-dim desk:inline">({g.looks.length})</span>
          </a>
        ))}
        {groups.length > 1 && (
          <Dropdown
            className="min-w-0 flex-1 desk:hidden"
            buttonClassName={`${SECTION_BUTTON} flex w-full justify-center outline-none focus-visible:border-ink`}
            label="More"
            listLabel="More sections"
            options={groups.slice(1).map((g) => ({ value: g.id, label: `${g.title} (${g.looks.length})` }))}
            value={picked}
            onPick={(id) => {
              setPicked(id)
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        )}
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="scroll-mt-[calc(var(--header-h,0px)+80px)] pt-14">
          <Reveal className="flex flex-col justify-between gap-2 border-b border-ink pb-4 desk:flex-row desk:items-end">
            <div>
              <p className="eyebrow">
                Looks {lookLabel(g.looks[0].number)}–{lookLabel(g.looks[g.looks.length - 1].number)}
              </p>
              <h2 className="wide mt-3 text-[18px] tracking-[.14em] desk:text-[22px]">{g.title}</h2>
            </div>
            <p className="max-w-md text-[14px] text-mid desk:text-right">{g.text}</p>
          </Reveal>
          <motion.ul
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {g.looks.map((look) => (
              <LookCard key={look.number} look={look} />
            ))}
          </motion.ul>
        </section>
      ))}
    </div>
  )
}

function LookCard({ look }) {
  const pieces = piecesForLook(look.number)
  const total = pieces.reduce((n, p) => n + p.price, 0)
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } } }}
    >
      <Link to={`/lookbook/${look.number}`} className="group block">
        <div className="stage-bg relative flex aspect-[4/5] items-end justify-center overflow-hidden pt-8">
          <span className="wide absolute left-5 top-5 text-[11px] tracking-[.18em] text-mid">Look {lookLabel(look.number)}</span>
          <ArrowUpRight strokeWidth={1.25} className="absolute right-5 top-5 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div
            className="floor-shadow relative h-[88%] max-w-[92%] transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
            style={{ aspectRatio: modelAspect(look) }}
          >
            <ModelImage look={look} className="relative" label={`Look ${lookLabel(look.number)}, ${look.name}`} />
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="wide text-[12px] tracking-[.16em]">{look.name}</h3>
          {total > 0 && <span className="text-[13px] text-mid">{formatPrice(total)}</span>}
        </div>
        <p className="mt-1 text-[13px] text-mid">{pieces.map((p) => p.name).join(' · ')}</p>
      </Link>
    </motion.li>
  )
}
