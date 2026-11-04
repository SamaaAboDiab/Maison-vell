import SpriteCrop from './SpriteCrop'
import { SHEETS } from '../data/collection'

// image = { href, sheet: [w, h], x0, y0, w, h } as resolved in collection.js
const Crop = ({ image, className, label }) => (
  <SpriteCrop
    href={image.href}
    x0={image.x0}
    y0={image.y0}
    w={image.w}
    h={image.h}
    sheet={image.sheet}
    className={className}
    label={label}
  />
)

export const ModelImage = ({ look, className, label }) => <Crop image={look.model} className={className} label={label} />
export const PieceImage = ({ piece, className, label }) => <Crop image={piece.image} className={className} label={label} />

// resolves once both shared sheets are decoded and the fonts are ready (shared across pages)
let sheetsReady
export function loadSheets() {
  sheetsReady ??= Promise.all(
    Object.values(SHEETS).map(({ href }) => {
      const img = new Image()
      img.src = href
      return img.decode().catch(() => {})
    }),
  ).then(() => document.fonts.ready)
  return sheetsReady
}
