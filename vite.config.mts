import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000,
    proxy: {
      // with options
      '/api': {
        target: 'http://localhost:8009',
        changeOrigin: true,
      }
    }
  }
})
