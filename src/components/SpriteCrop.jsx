import { memo } from 'react'

// Shows one box of a sprite sheet. The nested <svg> clips to the box,
// so nothing outside it can ever show, and the outer viewBox scales it.
function SpriteCrop({ href, x0, y0, w, h, sheet, className = '', label }) {
  const box = `${x0} ${y0} ${w} ${h}`
  return (
    <svg
      viewBox={box}
      className={`block h-full w-full ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <svg x={x0} y={y0} width={w} height={h} viewBox={box}>
        <image href={href} width={sheet[0]} height={sheet[1]} />
      </svg>
    </svg>
  )
}

export default memo(SpriteCrop)
