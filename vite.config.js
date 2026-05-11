import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: '/cbse-class-10-resources/',
  assetsInclude: ['**/*.md'],
})
