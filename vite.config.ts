import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy': {
        target: process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
        headers: {
          'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON || ''}`,
        },
      },
    },
  },
})
