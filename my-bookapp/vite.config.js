import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ① インポートを追加

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ② プラグインを追加
  ],
})