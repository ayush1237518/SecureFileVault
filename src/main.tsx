import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth'
import { SetupRequired } from './components/SetupRequired'
import { isSupabaseConfigured } from './services/supabaseClient'

const app = isSupabaseConfigured() ? (
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

createRoot(document.getElementById('root')!).render(<StrictMode>{app}</StrictMode>)
