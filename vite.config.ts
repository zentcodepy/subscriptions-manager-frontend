/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
        test: {
    environment: 'happy-dom'
  },
    server: {
      proxy: {
        '/base-url': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/base-url/, '') // Remove the '/api' prefix when making requests
        }
      }
    }
  }
})
