import { useEffect, useRef } from 'react'
import { DEPTH, LOOKS, railPieces } from '../data/collection'

const wrap = (x, n) => ((x % n) + n) % n
const clamp = (x, a, b) => Math.min(b, Math.max(a, x))
const PHONE = 820

/**
 * Drives the whole runway from one number, `p` (the current look as a float).
 * Models, product cards and the rolling look number are all painted from `p`
 * straight to the DOM, so React never re-renders while the line is moving.
 */
export function useRunwayEngine({ stageRef, ringRef, rollRef, modelRefs, cardRefs, startIndex = 0, onTravel }) {
  const api = useRef({ currentLook: () => LOOKS[startIndex].number, go: () => {} })

  useEffect(() => {
    const N = LOOKS.length
    const stage = stageRef.current
    const ring = ringRef.current
    const roll = rollRef.current
    const calm = matchMedia('(prefers-reduced-motion:reduce)').matches
    const people = LOOKS.map((look, i) => ({
      e: modelRefs.current[i],
      r: look.model.w / look.model.h,
      f: '',
      o: '',
    }))
    // copied: React empties the ref arrays on unmount, before this effect's cleanup
    // stops the resize observer and the frame loop
    const cards = [...cardRefs.current]
    // index of each look's first card on the rail track (plus the track length at the end),
    // so the rail lands on the right card whatever the number of pieces per look
    const starts = [0]
    LOOKS.forEach((l) => starts.push(starts[starts.length - 1] + railPieces(l).length))
    const railPos = () => {
      const w = wrap(p, N), k = Math.floor(w), t = w - k
      return starts[k] + (starts[k + 1] - starts[k]) * t
    }

    let W = 0, H = 0, base = 0, cardS = 0, side = false, dirty = true
    let p = startIndex, target = startIndex, last = 0, raf = 0
    let mx = 0, my = 0, cx = 0, cy = 0, down = false, sx = 0, st = 0, moved = 0, wheelT = 0
    let travelled = false

    api.current = {
      currentLook: () => LOOKS[wrap(Math.round(target), N)].number,
      go: (index) => { target = Math.round(target) + wrap(index - Math.round(target), N) },
    }

    function size() {
      if (!stage.isConnected) return
      W = stage.clientWidth
      H = stage.clientHeight
      // models are laid out once at 1.2 x stage height; only transform changes afterwards
      base = H * 1.2
      side = innerWidth <= PHONE
      people.forEach((m) => {
        m.e.style.width = base * m.r + 'px'
        m.e.style.height = base + 'px'
      })
      const rail = cards[0].parentElement
      cardS = side ? 160 : rail.clientHeight / 3
      cards.forEach((c) => (c.style.height = side ? '100%' : cardS + 'px'))
      dirty = true
    }

    function paint() {
      people.forEach((m, i) => {
        let d = wrap(i - p, N)
        if (d > N - 1) d -= N
        const k = clamp(d + 1, 0, 6), a = Math.floor(k), b = Math.min(6, a + 1), t = k - a
        const mix = (A, A0 = A[a]) => A0 + (A[b] - A0) * t
        const h = mix(DEPTH.height) * H, s = h / base, w = h * m.r
        // the leaving stop must clear the stage edge entirely, or a wide model's arm stays in view
        const exit = a === 0 ? Math.max(DEPTH.x[0], (W + w / 2 + 8) / W) : DEPTH.x[a]
        const x = mix(DEPTH.x, exit) * W - w / 2, y = mix(DEPTH.feet) * H - h
        m.e.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`
        // blur is divided by the scale so it looks the same on screen at any depth
        const f = mix(DEPTH.blur) / s
        const fs = f < 0.2 ? 'none' : `blur(${f.toFixed(1)}px)`
        const o = mix(DEPTH.opacity).toFixed(3)
        if (fs !== m.f) { m.f = fs; m.e.style.filter = fs }
        if (o !== m.o) {
          m.o = o
          m.e.style.opacity = o
          // models waiting at the back of a long line are fully transparent; skip painting them
          m.e.style.visibility = +o === 0 ? 'hidden' : ''
        }
        m.e.style.zIndex = 100 - Math.round(d * 10)
      })
      const all = cardS * cards.length
      const pos = railPos()
      cards.forEach((c, i) => {
        let y = wrap((i - pos) * cardS, all)
        if (y > all - cardS) y -= all
        c.style.transform = side ? `translate3d(${y.toFixed(1)}px,0,0)` : `translate3d(0,${y.toFixed(1)}px,0)`
      })
      roll.style.transform = `translate3d(0,${(-wrap(p, N) * roll.firstChild.offsetHeight).toFixed(1)}px,0)`
    }

    function frame(now) {
      const dt = Math.min(50, now - last) || 16
      last = now
      const was = p
      if (calm) p = target
      else p += (target - p) * (1 - Math.exp(-dt * 0.0072))
      if (Math.abs(target - p) < 0.0004) p = target
      if (p !== was || dirty) { dirty = false; paint() }
      // told once, the first time the visitor moves the line on to another look
      if (!travelled && Math.abs(target - startIndex) > 0.5) { travelled = true; onTravel?.() }
      cx += (mx - cx) * 0.32
      cy += (my - cy) * 0.32
      ring.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`
      raf = requestAnimationFrame(frame)
    }

    const pull = () => Math.max(150, W * 0.2)

    const onEnter = (e) => { if (e.pointerType === 'mouse') ring.dataset.show = 'true' }
    const onLeave = () => { ring.dataset.show = 'false' }
    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
      if (!down) return
      const dx = e.clientX - sx
      moved = Math.max(moved, Math.abs(dx))
      target = st + dx / pull()
    }
    const onDown = (e) => {
      if (e.target.closest('a,button')) return
      down = true
      sx = e.clientX
      st = target
      moved = 0
      stage.setPointerCapture(e.pointerId)
      ring.dataset.drag = 'true'
    }
    const onUp = (e) => {
      if (!down) return
      down = false
      ring.dataset.drag = 'false'
      if (moved < 6) {
        // a click on a model in the line jumps to that look
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find((x) => x.dataset && x.dataset.model)
        if (hit) {
          const d = Math.round(wrap(+hit.dataset.model - target, N))
          if (d > 0 && d < N) target = Math.round(target) + d
        }
      } else target = Math.round(target)
    }
    const onWheel = (e) => {
      e.preventDefault()
      target += clamp(e.deltaY + e.deltaX, -120, 120) / 420
      clearTimeout(wheelT)
      wheelT = setTimeout(() => { target = Math.round(target) }, 150)
    }
    const onKey = (e) => {
      if (e.target.closest && e.target.closest('input,textarea,select,[role=dialog]')) return
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); target = Math.round(target) + 1 }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); target = Math.round(target) - 1 }
    }

    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('wheel', onWheel, { passive: false })
    addEventListener('keydown', onKey)
    const ro = new ResizeObserver(size)
    ro.observe(stage)
    ro.observe(cards[0].parentElement)

    size()
    paint()
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(wheelT)
      ro.disconnect()
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('wheel', onWheel)
      removeEventListener('keydown', onKey)
    }
    // the engine is set up once per mount; startIndex is only the starting look
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return api
}
