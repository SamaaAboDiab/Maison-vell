import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { firstName, useStore } from '../context/StoreContext'

const TABS = [
  { to: '/', label: 'Runway', end: true },
  { to: '/maison', label: 'The Maison' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/shop', label: 'Shop' },
]

const DEPARTMENTS = [
  { to: '/lookbook', label: 'Collections' },
  { to: '/shop', label: 'Clothing' },
  { to: '/lookbook', label: 'Lookbook' },
  { to: '/shop?cat=Accessories', label: 'Accessories' },
  { to: '/maison', label: 'Our World' },
]

export default function Header({ onSearch }) {
  const { count, openCart, user } = useStore()
  const [menu, setMenu] = useState(false)

  // the header stays pinned on every page; its height is shared as --header-h so the
  // sticky filter bars and in-page jumps land just below it instead of under it
  const headerRef = useRef(null)
  useEffect(() => {
    const el = headerRef.current
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-30 bg-white px-4 pb-3 pt-[14px] desk:px-u46 desk:pb-u15 desk:pt-u20">
      <div className="grid grid-cols-[1fr_auto] items-center desk:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="wide text-[14px] tracking-[.2em] desk:text-u15.5">
          Maison Vell
        </Link>

        <nav aria-label="Sections" className="wide hidden gap-u48 text-u14.5 tracking-[.14em] text-dim desk:flex">
          {TABS.map((t) => (
            <NavLink
              key={t.label}
              to={t.to}
              end={t.end}
              className={({ isActive }) => `relative transition-colors duration-200 hover:text-ink ${isActive ? 'text-ink' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {t.label}
                  {isActive && (
                    <motion.span layoutId="tab-dot" className="absolute -bottom-u8 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ink" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="wide flex items-center justify-self-end gap-4 text-[10px] tracking-[.12em] desk:gap-u22 desk:text-u9.5">
          <Link to="/account" title={user ? user.email : undefined} className="hidden max-w-[12em] truncate desk:inline">
            {user ? firstName(user) : 'Login'}
          </Link>
          <button type="button" aria-label="Search" onClick={onSearch} className="hidden desk:block">
            <Search strokeWidth={1.5} className="h-u17 w-u17" />
          </button>
          <Link to="/shop?saved=1" aria-label="Saved pieces" className="hidden desk:block">
            <Heart strokeWidth={1.5} className="h-u17 w-u17" />
          </Link>
          {/* the bag icon with the item count on it, on every screen size */}
          <button type="button" aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`} onClick={openCart} className="relative">
            <ShoppingBag strokeWidth={1.5} className="h-5 w-5 desk:h-u17 desk:w-u17" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] leading-none tracking-normal text-white desk:h-[15px] desk:min-w-[15px] desk:text-[8.5px]"
                >
                  {count > 99 ? '99+' : count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button type="button" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)} className="desk:hidden">
            <Menu strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav aria-label="Departments" className="wide mt-u17 hidden justify-center gap-u60 text-u9.5 tracking-[.14em] desk:flex">
        {DEPARTMENTS.map((d) => (
          <Link key={d.label} to={d.to} className="transition-colors duration-200 hover:text-mid">
            {d.label}
          </Link>
        ))}
      </nav>

      {/* The phone menu is two layers in the page root: its white sheet sits under the runway
          models (z 50-110) so they stay in view, and its text sits over them so it stays readable. */}
      {createPortal(
      <AnimatePresence>
        {menu && (
          <motion.div
            key="sheet"
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-white desk:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {menu && (
          <motion.div
            key="menu"
            role="dialog"
            aria-label="Menu"
            className="fixed inset-0 z-[150] flex flex-col overflow-y-auto px-4 pb-8 pt-[14px] [text-shadow:0_0_14px_#fff,0_0_6px_#fff,0_0_2px_#fff] desk:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="wide text-[14px] tracking-[.2em]">Maison Vell</span>
              <button type="button" aria-label="Close menu" onClick={() => setMenu(false)}>
                <X strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </div>
            <motion.ul
              className="mt-14 space-y-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {TABS.map((t) => (
                <motion.li key={t.label} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                  <NavLink to={t.to} end={t.end} onClick={() => setMenu(false)} className="wide text-[22px] tracking-[.12em]">
                    {t.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* shop shortcuts, then the personal links and search, at the foot of the menu;
                the other departments repeat the tabs above, so the phone menu leaves them out */}
            <motion.div
              className="mt-auto pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            >
              <ul className="space-y-6">
                {[
                  ...DEPARTMENTS.filter((d) => d.label === 'Clothing' || d.label === 'Accessories'),
                  { to: '/shop?saved=1', label: 'Saved pieces' },
                  { to: '/account', label: user ? firstName(user) : 'Login' },
                ].map((d) => (
                  <li key={d.label}>
                    <Link to={d.to} onClick={() => setMenu(false)} className="wide text-[22px] tracking-[.12em]">
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => { setMenu(false); onSearch() }}
                className="wide mt-8 flex w-full items-center gap-3 border border-ink/25 bg-white px-4 py-3.5 text-left text-[10.5px] tracking-[.16em] text-mid transition-colors hover:border-ink hover:text-ink"
              >
                <Search strokeWidth={1.5} className="h-4 w-4 shrink-0 text-ink" /> Search the collection
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </header>
  )
}
