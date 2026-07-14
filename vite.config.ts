import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

<<<<<<< HEAD
=======


>>>>>>> d4137d94b85346bbfcacf6e24df0a8a884b0c6d1
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
})
