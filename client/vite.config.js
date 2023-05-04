import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  define: {
    'process.env.REACT_APP_SERVER_URL': `"${process.env.REACT_APP_SERVER_URL}"`
  }
})
