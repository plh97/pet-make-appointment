import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import {resolve} from 'path';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
      ]
    }),
  ],
  envDir: '../../.env',
  server: {
    port: +(process.env.FRONTEND_PORT ?? 80),
    proxy: { 
      '/api': {
        target: `http://localhost:3000`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
