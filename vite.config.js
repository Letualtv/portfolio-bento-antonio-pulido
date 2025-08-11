import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          bootstrap: ['bootstrap/dist/js/bootstrap.bundle.min.js'],
          icons: ['bootstrap-icons/font/bootstrap-icons.css']
        }
      }
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  css: {
    devSourcemap: false
  }
})
