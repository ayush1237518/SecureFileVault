import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Keep OAuth redirect URL on 5173 (Supabase allows http://localhost:5173/auth/callback).
    strictPort: true,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
})
