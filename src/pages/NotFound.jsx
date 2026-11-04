import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-28 text-center">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="wide text-[64px] tracking-[.1em] text-line">404</motion.p>
      <h1 className="wide mt-4 text-[16px] tracking-[.16em]">This page has left the runway</h1>
      <p className="mt-3 text-[15px] text-mid">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn-ink mt-8">Back to the runway</Link>
    </div>
  )
}
