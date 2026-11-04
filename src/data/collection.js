import TRIMS from 'virtual:look-trims'
import { CATALOG, CATEGORY_ORDER } from './catalog'

// depth stops from d = -1 (leaving past the rail) to d = 5 (arriving out of the haze)
export const DEPTH = {
  x: [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085],
  feet: [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59],
  height: [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19],
  blur: [0, 0, 1.5, 4, 8, 12, 17],
  opacity: [1, 1, 1, 1, 0.86, 0.5, 0],
}

// both shared sheets are served locally from public/images (preloaded in index.html)
export const SHEETS = {
  models: { href: '/images/models.webp', size: [960, 540] },
  pieces: { href: '/images/pieces.webp', size: [960, 720] },
}

export const lookLabel = (n) => String(n).padStart(2, '0')

// one-file images for looks 07+: src/assets/looks/<NN>/model.png and <piece-id>.png
const files = import.meta.glob('../assets/looks/*/*.{png,webp}', { eager: true, query: '?url', import: 'default' })
// the visible box of each file, measured once by the look-trims plugin in vite.config.js
const fileFor = (number, name) => {
  const base = `${lookLabel(number)}/${name}.`
  const key = files[`../assets/looks/${base}webp`] ? base + 'webp' : files[`../assets/looks/${base}png`] ? base + 'png' : null
  return key && { href: files[`../assets/looks/${key}`], trim: TRIMS[key] }
}

// Filled by prepareCollection() before the app renders. Only looks whose images
// exist are included, so dropping a look's files into its folder adds it everywhere.
export let LOOKS = []
export let PIECES = []
export let CATEGORIES = ['All']

function fromSheet(sheet, [x0, x1, y0, y1]) {
  const s = SHEETS[sheet]
  return { href: s.href, sheet: s.size, x0, y0, w: x1 - x0, h: y1 - y0 }
}

// a standalone image cropped to its visible (non-transparent) pixels, so generated
// images with empty margins still stand on the floor correctly. The box normally
// comes from the build; measuring in the browser is only a fallback.
function fromFile({ href, trim }) {
  return trim ? { href, ...trim } : measureFile(href)
}

async function measureFile(href) {
  const img = new Image()
  img.src = href
  await img.decode()
  const W = img.naturalWidth, H = img.naturalHeight
  const k = Math.min(1, 400 / Math.max(W, H))
  const cw = Math.max(1, Math.round(W * k)), ch = Math.max(1, Math.round(H * k))
  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, cw, ch)
  const a = ctx.getImageData(0, 0, cw, ch).data
  let x0 = cw, y0 = ch, x1 = -1, y1 = -1
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (a[(y * cw + x) * 4 + 3] > 12) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  if (x1 < 0) return { href, sheet: [W, H], x0: 0, y0: 0, w: W, h: H }
  const X0 = Math.max(0, (x0 - 1) / k), Y0 = Math.max(0, (y0 - 1) / k)
  const X1 = Math.min(W, (x1 + 2) / k), Y1 = Math.min(H, (y1 + 2) / k)
  return { href, sheet: [W, H], x0: X0, y0: Y0, w: X1 - X0, h: Y1 - Y0 }
}

// display order: clothes from the outer layer in, then shoes, then accessories
// (bags, belts and scarves before jewellery and watches)
const ACCESSORY_ORDER = [/bag|tote|clutch/, /belt|sash/, /scarf|stole|gloves/, /necklace|pendant|collar/, /earrings/, /bracelet|cuff/, /watch/]
const categoryRank = (c) => (CATEGORY_ORDER.includes(c) ? CATEGORY_ORDER.indexOf(c) : CATEGORY_ORDER.length)
const accessoryRank = (id) => {
  const i = ACCESSORY_ORDER.findIndex((re) => re.test(id))
  return i < 0 ? ACCESSORY_ORDER.length : i
}
const byDisplayOrder = (a, b) => categoryRank(a.category) - categoryRank(b.category) || accessoryRank(a.id) - accessoryRank(b.id)

async function resolveLook(entry) {
  const modelFile = !entry.model && fileFor(entry.number, 'model')
  const model = entry.model ? fromSheet('models', entry.model) : modelFile ? await fromFile(modelFile) : null
  if (!model) return null
  // a piece is only sold once it has a product shot of its own; until then it stays hidden
  const pieces = (await Promise.all(
    entry.pieces.map(async (p) => {
      if (p.box) return { ...p, look: entry.number, image: fromSheet('pieces', p.box) }
      const file = fileFor(entry.number, p.id)
      return file ? { ...p, look: entry.number, image: await fromFile(file) } : null
    }),
  )).filter(Boolean).sort(byDisplayOrder)
  return { ...entry, model, pieces }
}

export async function prepareCollection() {
  const looks = await Promise.all(
    CATALOG.map((entry) =>
      resolveLook(entry).catch((err) => {
        console.warn(`Look ${entry.number} skipped:`, err)
        return null
      }),
    ),
  )
  LOOKS = looks.filter(Boolean).sort((a, b) => a.number - b.number)
  // the shop lists pieces by type (same order as its filters), then by look
  PIECES = LOOKS.flatMap((l) => l.pieces).sort((a, b) => byDisplayOrder(a, b) || a.look - b.look)
  const used = new Set(PIECES.map((p) => p.category))
  CATEGORIES = ['All', ...CATEGORY_ORDER.filter((c) => used.has(c)), ...[...used].filter((c) => !CATEGORY_ORDER.includes(c))]
}

export const piecesForLook = (number) => findLook(number)?.pieces ?? []
// the runway rail shows two cards per look, so the third card is always the next look's first;
// the full list stays on the look's own page
export const railPieces = (look) => look.pieces.slice(0, 2)
export const findLook = (number) => LOOKS.find((l) => l.number === Number(number))
export const findPiece = (id) => PIECES.find((p) => p.id === id)
export const modelAspect = (look) => `${look.model.w} / ${look.model.h}`

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
export const formatPrice = (n) => money.format(n)
