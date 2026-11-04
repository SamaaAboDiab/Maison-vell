import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { PieceImage } from './Sprites'
import { formatPrice, lookLabel } from '../data/collection'

const FREE_SHIPPING = 1500

export default function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, setQuantity, clearCart, count } = useStore()
  const [placed, setPlaced] = useState(false)

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [cartOpen, closeCart])

  useEffect(() => {
    if (!cartOpen) setPlaced(false)
  }, [cartOpen])

  const checkout = () => {
    clearCart()
    setPlaced(true)
  }

  const left = Math.max(0, FREE_SHIPPING - subtotal)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Your bag"
            className="fixed bottom-0 right-0 top-0 z-[210] flex w-full max-w-[420px] flex-col bg-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="wide text-[12px] tracking-[.18em]">Your bag ({count})</h2>
              <button type="button" aria-label="Close bag" onClick={closeCart}>
                <X strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </div>

            {placed ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="wide text-[15px] tracking-[.16em]">
                  Thank you
                </motion.p>
                <p className="mt-4 text-[14px] leading-relaxed text-mid">
                  Your order has been placed. A confirmation and a hand-written note from the atelier are on their way.
                </p>
                <button type="button" onClick={closeCart} className="btn-line mt-8">Continue browsing</button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="wide text-[13px] tracking-[.16em]">Your bag is empty</p>
                <p className="mt-3 text-[14px] text-mid">Walk the runway and add the pieces you love.</p>
                <Link to="/shop" onClick={closeCart} className="btn-ink mt-8">Shop the collection</Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <p className="text-[12px] text-mid">
                    {left > 0 ? <>You are {formatPrice(left)} away from complimentary shipping.</> : <>Complimentary shipping is included.</>}
                  </p>
                  <div className="mt-2 h-[2px] bg-line">
                    <motion.div className="h-full bg-ink" animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
                  </div>
                </div>
                <ul className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map(({ piece, qty }) => (
                      <motion.li
                        key={piece.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 border-b border-line py-5">
                          <div className="h-[92px] w-[76px] shrink-0 bg-rail p-2">
                            <PieceImage piece={piece} />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <p className="wide text-[10px] tracking-[.14em]">{piece.name}</p>
                              <button
                                type="button"
                                aria-label={`Remove ${piece.name} from bag`}
                                onClick={() => setQuantity(piece.id, 0)}
                                className="-mr-1 -mt-1 shrink-0 p-1 text-mid transition-colors hover:text-ink"
                              >
                                <Trash2 strokeWidth={1.4} className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="mt-1 text-[12px] text-mid">Look {lookLabel(piece.look)} · {piece.category}</p>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-3 border border-line px-2 py-1">
                                <button type="button" aria-label="Remove one" onClick={() => setQuantity(piece.id, qty - 1)}>
                                  <Minus strokeWidth={1.5} className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-4 text-center text-[13px]">{qty}</span>
                                <button type="button" aria-label="Add one" onClick={() => setQuantity(piece.id, qty + 1)}>
                                  <Plus strokeWidth={1.5} className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-[13px]">{formatPrice(piece.price * qty)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-line px-6 py-6">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-mid">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-dim">Taxes and duties calculated at checkout.</p>
                  <button type="button" onClick={checkout} className="btn-ink mt-5 w-full">Checkout</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
