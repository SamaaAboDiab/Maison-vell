import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const COLUMNS = [
  { title: 'Collection', links: [['Runway', '/'], ['Lookbook', '/lookbook'], ['Shop all', '/shop'], ['Accessories', '/shop?cat=Accessories']] },
  { title: 'The Maison', links: [['Our story', '/maison'], ['The atelier', '/maison#atelier']] },
  { title: 'Client care', links: [['Account', '/account'], ['Saved pieces', '/shop?saved=1'], ['Shipping & returns', '/maison#care']] },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="mt-24 border-t border-line bg-rail">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 desk:grid-cols-[1.4fr_repeat(3,1fr)] desk:px-12">
        <div>
          <p className="wide text-[15px] tracking-[.2em]">Maison Vell</p>
          <p className="mt-4 max-w-sm font-wide text-[10.5px] leading-[1.9] tracking-[.04em] text-mid">
            Letters from the atelier: new collections, private appointments and the stories behind each piece.
          </p>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 font-wide text-[10.5px] leading-[1.9] tracking-[.04em]">
                Thank you — the first letter arrives with the next season.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setSent(true) }}
                className="mt-6 flex max-w-sm items-end gap-4"
              >
                <label className="flex-1">
                  <span className="sr-only">Email address</span>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="field font-wide text-[11px] tracking-[.06em]" />
                </label>
                <button type="submit" className="wide pb-3 text-[10px] tracking-[.16em]">Subscribe</button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-5 space-y-4">
              {col.links.map(([label, to]) => (
                <li key={label}><Link to={to} className="wide text-[10px] tracking-[.14em] transition-colors hover:text-mid">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-5 py-6 text-center font-wide text-[9.5px] tracking-[.08em] text-dim desk:px-12">
          <span>© 2027 Maison Vell. All rights reserved.</span>
          <span>Paris · Lyon · Milano</span>
        </div>
      </div>
    </footer>
  )
}
