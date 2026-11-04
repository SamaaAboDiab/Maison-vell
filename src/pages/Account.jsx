import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { firstName, useStore } from '../context/StoreContext'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Account() {
  usePageTitle('Account')
  const { user, signIn, signOut, saved, count, openCart } = useStore()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (mode === 'register' && !form.name.trim()) next.name = 'Please enter your name.'
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    setErrors(next)
    if (Object.keys(next).length === 0) signIn(form.email.trim(), mode === 'register' ? form.name.trim() : '')
  }

  // signing out starts the next person on a clean sign-in form, not the last sign-up's name
  const leave = () => {
    signOut()
    setMode('login')
    setForm({ name: '', email: '', password: '' })
    setErrors({})
  }

  if (user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pt-16 desk:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow">Account</p>
          <h1 className="wide mt-4 text-[24px] tracking-[.12em] desk:text-[32px]">Welcome back, {firstName(user)}</h1>
          <p className="mt-3 text-[15px] text-mid">Signed in as {user.email}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link to="/shop?saved=1" className="bg-rail p-6 transition-colors hover:bg-line">
              <p className="wide text-[24px]">{saved.length}</p>
              <p className="eyebrow mt-2">Saved pieces</p>
            </Link>
            <button type="button" onClick={openCart} className="bg-rail p-6 text-left transition-colors hover:bg-line">
              <p className="wide text-[24px]">{count}</p>
              <p className="eyebrow mt-2">In your bag</p>
            </button>
          </div>
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="wide text-[12px] tracking-[.16em]">Private appointments</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-mid">
              Book a fitting with our atelier in Lyon or Paris. Every appointment includes alterations at no charge.
            </p>
          </div>
          <button type="button" onClick={leave} className="btn-line mt-10">Sign out</button>
        </motion.div>
      </div>
    )
  }

  const field = (key, label, type = 'text', autoComplete) => (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        autoComplete={autoComplete}
        aria-invalid={!!errors[key]}
        className={`field ${errors[key] ? 'border-rose' : ''}`}
      />
      <AnimatePresence>
        {errors[key] && (
          <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 block text-[12px] text-rose">
            {errors[key]}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )

  return (
    <div className="mx-auto w-full max-w-md px-5 pt-16 desk:pt-24">
      <p className="eyebrow">Account</p>
      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
          <h1 className="wide mt-4 text-[24px] tracking-[.12em]">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
          <p className="mt-3 text-[14px] text-mid">
            {mode === 'login'
              ? 'Access your saved pieces, orders and private appointments.'
              : 'Join Maison Vell for early access to new collections and complimentary repairs.'}
          </p>
          <form onSubmit={submit} noValidate className="mt-10 space-y-7">
            {mode === 'register' && field('name', 'Full name', 'text', 'name')}
            {field('email', 'Email', 'email', 'email')}
            {field('password', 'Password', 'password', mode === 'login' ? 'current-password' : 'new-password')}
            <button type="submit" className="btn-ink w-full">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
          </form>
        </motion.div>
      </AnimatePresence>
      <p className="mt-8 text-center text-[14px] text-mid">
        {mode === 'login' ? 'New to Maison Vell?' : 'Already have an account?'}{' '}
        <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}) }} className="text-ink underline underline-offset-4">
          {mode === 'login' ? 'Create an account' : 'Sign in'}
        </button>
      </p>
      <p className="mt-6 text-center text-[12px] text-dim">Demo only — nothing is sent to a server.</p>
    </div>
  )
}
