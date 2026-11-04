import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import Toaster from './components/Toaster'
import Runway from './pages/Runway'

// the runway is the landing page; the rest are fetched the first time they are opened
const Maison = lazy(() => import('./pages/Maison'))
const Lookbook = lazy(() => import('./pages/Lookbook'))
const LookDetail = lazy(() => import('./pages/LookDetail'))
const Shop = lazy(() => import('./pages/Shop'))
const Account = lazy(() => import('./pages/Account'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait for the page transition to mount the target section
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 450)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  // the runway is a fixed, full-viewport stage; every other page scrolls
  const isRunway = location.pathname === '/'

  return (
    <div className={isRunway ? 'flex h-svh min-h-[520px] flex-col overflow-hidden' : 'flex min-h-svh flex-col'}>
      <ScrollManager />
      <Header onSearch={() => setSearchOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Suspense fallback={<div className="flex-1" />}>
            <Routes location={location}>
              <Route path="/" element={<Runway />} />
              <Route path="/maison" element={<Maison />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/lookbook/:look" element={<LookDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {!isRunway && <Footer />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
      <Toaster />
    </div>
  )
}
