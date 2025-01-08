import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shopping-cart",
  build: {
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    fs: {
      strict: false,
    },
  }
})
