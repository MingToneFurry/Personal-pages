import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 3287,
    strictPort: true
  },
  preview: {
    port: 3287,
    strictPort: true
  }
})
