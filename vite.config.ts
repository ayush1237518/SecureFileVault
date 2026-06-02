import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Never bake localhost into production JS (Netlify must not redirect OAuth to :5173).
  define:
    mode === 'production'
      ? {
          'import.meta.env.VITE_APP_URL': JSON.stringify(''),
        }
      : undefined,
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
}))
