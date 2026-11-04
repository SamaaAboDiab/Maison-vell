import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Maison Vell` : 'Maison Vell'
  }, [title])
}
