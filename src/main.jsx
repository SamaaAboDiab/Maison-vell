import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { StoreProvider } from './context/StoreContext'
import { prepareCollection } from './data/collection'
import '@fontsource/michroma/latin-400.css'
import './index.css'

// looks are resolved first (images for looks 07+ are measured and trimmed),
// so every page can read LOOKS / PIECES synchronously
prepareCollection().then(() => createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StoreProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
))
