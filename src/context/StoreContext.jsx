import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { findPiece } from '../data/collection'

const StoreContext = createContext(null)

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage can be blocked (private mode); the store still works in memory
  }
}

// the name shown in the header: the first word of the account name, or a guess from the
// email's local part ("sara.ahmed@…" → "Sara") for accounts that never gave one
export function firstName(user) {
  if (!user) return ''
  const fromName = user.name?.trim().split(/\s+/)[0]
  if (fromName) return fromName
  const word = user.email.split('@')[0].split(/[._\-+\d]+/).find(Boolean) || user.email.split('@')[0]
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function StoreProvider({ children }) {
  // cart is { pieceId: quantity }, saved is a list of piece ids
  const [cart, setCart] = useState(() => readStored('mv-cart', {}))
  const [saved, setSaved] = useState(() => readStored('mv-saved', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState(() => readStored('mv-user', null))
  const [toast, setToast] = useState(null)

  useEffect(() => writeStored('mv-cart', cart), [cart])
  useEffect(() => writeStored('mv-saved', saved), [saved])
  useEffect(() => writeStored('mv-user', user), [user])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const notify = useCallback((text) => setToast({ id: Date.now(), text }), [])

  const addToCart = useCallback((id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }))
    const piece = findPiece(id)
    if (piece) notify(`${piece.name} added to your bag`)
  }, [notify])

  const setQuantity = useCallback((id, qty) => {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }, [])

  const toggleSaved = useCallback((id) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }, [])

  const value = useMemo(() => {
    const lines = Object.entries(cart)
      .map(([id, qty]) => ({ piece: findPiece(id), qty }))
      .filter((l) => l.piece)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.piece.price, 0),
      addToCart,
      setQuantity,
      clearCart: () => setCart({}),
      saved,
      isSaved: (id) => saved.includes(id),
      toggleSaved,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      user,
      // demo accounts: the name given at sign-up is remembered per email in this browser,
      // so signing in again later still greets the person by name
      signIn: (email, name) => {
        const accounts = readStored('mv-accounts', {})
        const key = email.toLowerCase()
        if (name) writeStored('mv-accounts', { ...accounts, [key]: name })
        setUser({ email, name: name || accounts[key] || '' })
      },
      signOut: () => setUser(null),
      toast,
      notify,
    }
  }, [cart, saved, cartOpen, user, toast, addToCart, setQuantity, toggleSaved, notify])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
