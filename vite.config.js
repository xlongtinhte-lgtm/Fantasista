import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel deploy tại thư mục gốc, nên để 'base' là '/'
  base: '/', 
})