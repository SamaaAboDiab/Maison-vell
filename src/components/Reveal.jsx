import { motion } from 'framer-motion'

// fades and lifts its content in once it scrolls into view
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Tag>
  )
}
