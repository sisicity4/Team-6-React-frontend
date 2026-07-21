import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const staticAppRedirect = () => ({
  name: 'static-app-redirect',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/static/app' || req.url === '/static/app/') {
        req.url = '/'
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  return {
    base: isDev ? '/' : '/static/app/',
    plugins: [react(), staticAppRedirect()],
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:8000',
      },
    },
  }
})
