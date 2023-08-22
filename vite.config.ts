/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {

  },
  server: {
    proxy: {
      '/base-url': {
        target: 'http://localhost:8000', // Replace with your API endpoint
        changeOrigin: true,
        rewrite: path => path.replace(/^\/base-url/, '') // Remove the '/api' prefix when making requests
      }
    }
  }
})
