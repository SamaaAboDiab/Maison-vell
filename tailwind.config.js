/** @type {import('tailwindcss').Config} */

// "u" is the page's fluid unit (see --u in index.css): 1u = 1px on a 1600 x 900 screen.
// It gives classes like px-u46, gap-u48 and text-u15.5 that scale with the viewport.
const u = (n) => `calc(${n}*var(--u))`
const scale = (values) => Object.fromEntries(values.map((n) => [`u${n}`, u(n)]))
const range = Array.from({ length: 100 }, (_, i) => i + 1)

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16191f',
        mid: '#737b86',
        dim: '#a4adb8',
        line: '#e6ebf0',
        rail: '#f3f6fa',
        haze: '#f1f5fa',
        blush: '#d8a7a0',
        rose: '#b98179',
      },
      fontFamily: {
        // one typeface across the site; `wide` adds nothing but is kept as the name the headings use
        sans: ['Michroma', 'sans-serif'],
        wide: ['Michroma', 'sans-serif'],
      },
      screens: {
        // the runway switches to its phone layout at 820px and below
        desk: '821px',
      },
      spacing: scale([...range, 2.5, 372, 390]),
      fontSize: scale([9.5, 12.5, 14, 14.5, 15.5, 22, 29]),
      lineHeight: scale([38]),
      borderWidth: scale([2.5]),
      transitionTimingFunction: {
        soft: 'cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
}
