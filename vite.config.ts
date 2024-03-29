import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // with options
      '/api': {
        target: 'http://localhost:8009',
        changeOrigin: true,
      }
    }
  }
})
