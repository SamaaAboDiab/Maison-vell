import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import { ModelImage } from '../components/Sprites'
import { LOOKS, modelAspect } from '../data/collection'
import { usePageTitle } from '../hooks/usePageTitle'

const STATS = [
  ['2009', 'Founded in Lyon'],
  ['42', 'Artisans in the atelier'],
  ['310', 'Hours in a finale gown'],
  ['100%', 'Traceable silk'],
]

const VALUES = [
  {
    title: 'Softness',
    text: 'Feathers, organza and satin chosen for how they move, not only how they look. Every piece is fitted on a walking model before it is approved.',
  },
  {
    title: 'Strength',
    text: 'Tailoring cut with the precision of menswear and the ease of couture: structured shoulders, sharp lines and seams that last for decades.',
  },
  {
    title: 'Tomorrow',
    text: 'Small runs, mills we can visit and a repair service for life. We would rather make fewer pieces than make anything twice.',
  },
]

const ATELIER = [
  ['Drawing', 'Each season starts with a single sketchbook passed between the studio team, page by page, until a line emerges.'],
  ['Toile', 'Silhouettes are built in calico first and adjusted on the body — sometimes a dozen times — until the movement feels right.'],
  ['Hand finishing', 'Pleats are set by hand, feathers are sewn one by one, and every hem is finished invisibly in the Lyon workroom.'],
  ['The runway', 'Only then does a look walk. What you see in the lookbook is exactly what leaves the atelier.'],
]

export default function Maison() {
  usePageTitle('The Maison')
  const hero = useRef(null)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div>
      <section ref={hero} className="stage-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 pt-16 desk:grid-cols-2 desk:px-12 desk:pt-24">
          <motion.div style={{ opacity: fade }} className="pb-16 desk:pb-28">
            <p className="eyebrow">The Maison</p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="wide mt-5 text-[28px] leading-[1.25] tracking-[.12em] desk:text-[44px]"
            >
              Softness, <br />made to last
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-6 max-w-md text-[15px] leading-[1.7] text-mid"
            >
              Maison Vell began in a two-room studio above a silk mill in Lyon. Fifteen years later we still cut, pleat and
              finish every piece in the same city, for people who want clothes that feel as good in ten years as they do today.
            </motion.p>
          </motion.div>
          <motion.div style={{ y: lift }} className="flex h-[360px] items-end justify-center gap-2 desk:h-[560px]">
            {LOOKS.slice(0, 3).map((look, i) => (
              <motion.div
                key={look.number}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ height: `${100 - i * 14}%`, aspectRatio: modelAspect(look) }}
              >
                <ModelImage look={look} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 desk:px-12 desk:py-28">
        <div className="grid gap-10 desk:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="wide mt-4 text-[20px] leading-snug tracking-[.12em] desk:text-[26px]">A study in softness and strength</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[16px] leading-[1.75] text-mid">
            <p>
              Our founder, Élise Vell, trained as a pattern cutter for the great Paris houses before returning home to Lyon.
              She wanted to make clothes that looked delicate but behaved like a favourite coat — garments you could live in.
            </p>
            <p>
              That idea still shapes everything we do. We work with three family-run mills within a day’s drive of the studio,
              buy silk we can trace back to the cocoon, and keep every collection small enough to be finished by hand.
            </p>
            <p>
              Spring Summer 2027 is our most personal season yet: {LOOKS.length} looks in blush, sage, champagne and powder blue,
              inspired by the morning light over the Saône.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-px bg-line desk:grid-cols-4">
          {STATS.map(([n, label], i) => (
            <Reveal as="li" key={label} delay={i * 0.08} className="bg-white px-2 py-8 text-center">
              <p className="wide text-[26px] tracking-[.08em] desk:text-[34px]">{n}</p>
              <p className="mt-2 text-[13px] text-mid">{label}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-rail">
        <div className="mx-auto max-w-7xl px-5 py-20 desk:px-12 desk:py-28">
          <Reveal>
            <p className="eyebrow">What we believe</p>
          </Reveal>
          <div className="mt-10 grid gap-10 desk:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <p className="wide text-[11px] tracking-[.2em] text-dim">0{i + 1}</p>
                <h3 className="wide mt-4 text-[17px] tracking-[.14em]">{v.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-mid">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="atelier" className="mx-auto max-w-7xl scroll-mt-[calc(var(--header-h,0px)+24px)] px-5 py-20 desk:px-12 desk:py-28">
        <Reveal>
          <p className="eyebrow">The atelier</p>
          <h2 className="wide mt-4 text-[20px] tracking-[.12em] desk:text-[26px]">From sketch to runway</h2>
        </Reveal>
        <ol className="mt-12 border-l border-line">
          {ATELIER.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 0.06} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border border-ink bg-white" />
              <h3 className="wide text-[13px] tracking-[.16em]">{title}</h3>
              <p className="mt-2 max-w-xl text-[15px] leading-[1.7] text-mid">{text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* follows the atelier directly: the atelier's padding sets the gap above, the footer's margin the gap below,
          and each column's rule marks the start */}
      <section id="care" className="mx-auto max-w-7xl scroll-mt-[calc(var(--header-h,0px)+24px)] px-5 desk:px-12">
        <div className="grid gap-10 desk:grid-cols-3">
          {[
            ['Shipping', 'Complimentary express shipping on orders over $1,500, wrapped by hand in recycled tissue.'],
            ['Returns', 'Thirty days to decide. Returns are collected from your door at no cost.'],
            ['Repairs for life', 'Send any Maison Vell piece back to Lyon and our atelier will mend it, for as long as you own it.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="border-t border-ink pt-6">
              <h3 className="wide text-[12px] tracking-[.16em]">{t}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-mid">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
