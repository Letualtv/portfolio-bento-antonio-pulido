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
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    target: 'es2015',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  css: {
    devSourcemap: false
  },
  // Optimización adicional para imágenes y assets
  assetsInclude: ['**/*.webp', '**/*.avif']
})
