import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.38.8:8000', // Replace with your API endpoint
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // Remove the '/api' prefix when making requests
      }
    }
  }
})
