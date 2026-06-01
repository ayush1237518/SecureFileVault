import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth'
import { ErrorBoundary } from './components/ErrorBoundary'
import { FileProtocolWarning } from './components/FileProtocolWarning'
import { SetupRequired } from './components/SetupRequired'
import { isSupabaseConfigured } from './services/supabaseClient'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root element in index.html')
}

const app =
  window.location.protocol === 'file:' ? (
    <FileProtocolWarning />
  ) : isSupabaseConfigured() ? (
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(24,24,27,0.9)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  ) : (
    <SetupRequired />
  )

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>{app}</ErrorBoundary>
  </StrictMode>,
)
