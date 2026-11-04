import { readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sharp from 'sharp'

const LOOKS_DIR = resolve('src/assets/looks')
const TRIMS_ID = 'virtual:look-trims'

// Measures the visible (non-transparent) box of every look image once, on the dev
// server or at build time, so the browser no longer downloads and scans all of them
// before the site can render. Exposed as { 'NN/name.webp': { sheet, x0, y0, w, h } }.
function lookTrims() {
  const cache = new Map()

  async function measure(file) {
    const mtime = statSync(file).mtimeMs
    const hit = cache.get(file)
    if (hit && hit.mtime === mtime) return hit.box
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const { width: W, height: H, channels } = info
    let x0 = W, y0 = H, x1 = -1, y1 = -1
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (data[(y * W + x) * channels + 3] > 12) {
          if (x < x0) x0 = x
          if (x > x1) x1 = x
          if (y < y0) y0 = y
          if (y > y1) y1 = y
        }
      }
    }
    const box = x1 < 0
      ? { sheet: [W, H], x0: 0, y0: 0, w: W, h: H }
      : (() => {
          const X0 = Math.max(0, x0 - 1), Y0 = Math.max(0, y0 - 1)
          const X1 = Math.min(W, x1 + 2), Y1 = Math.min(H, y1 + 2)
          return { sheet: [W, H], x0: X0, y0: Y0, w: X1 - X0, h: Y1 - Y0 }
        })()
    cache.set(file, { mtime, box })
    return box
  }

  async function all() {
    const out = {}
    for (const dir of readdirSync(LOOKS_DIR)) {
      const full = join(LOOKS_DIR, dir)
      if (!statSync(full).isDirectory()) continue
      for (const name of readdirSync(full)) {
        if (/\.(png|webp)$/i.test(name)) out[`${dir}/${name}`] = await measure(join(full, name))
      }
    }
    return out
  }

  return {
    name: 'look-trims',
    resolveId: (id) => (id === TRIMS_ID ? '\0' + TRIMS_ID : null),
    async load(id) {
      if (id !== '\0' + TRIMS_ID) return null
      return `export default ${JSON.stringify(await all())}`
    },
    configureServer(server) {
      // a new or replaced image re-measures and reloads, so dropping files in still just works
      const refresh = (file) => {
        if (!resolve(file).startsWith(LOOKS_DIR)) return
        const mod = server.moduleGraph.getModuleById('\0' + TRIMS_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('change', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), lookTrims()],
  // one fixed port: the cart and saved pieces live in localStorage, which is per address,
  // so a dev server that drifts to another port looks like an empty cart
  server: { port: 5179, strictPort: true, open: false },
})
