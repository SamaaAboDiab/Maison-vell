import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Toaster() {
  const { toast, openCart } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[220] flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.button
            type="button"
            key={toast.id}
            onClick={openCart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto flex items-center gap-3 bg-ink px-5 py-3 text-[13px] text-white shadow-lg"
          >
            <Check strokeWidth={1.5} className="h-4 w-4" />
            {toast.text}
            <span className="wide ml-2 text-[9.5px] tracking-[.14em] underline underline-offset-4">View bag</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
