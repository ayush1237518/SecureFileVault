import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Replace SecureFileVault with your repository name
  base: '/SecureFileVault/',

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