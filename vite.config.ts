import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Em produção (GitHub Pages) o site fica em /baadv-web/. Defina VITE_BASE=/ para domínio próprio.
export default defineConfig({
  base: process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/baadv-web/' : '/'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
