import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Base path matches the GitHub Pages sub-path (repo name).
// Change if the repo is renamed.
export default defineConfig({
  base: '/Project-ropa/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.resolve(import.meta.dirname, 'src/styles')],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || /[\\/]node_modules[\\/]react[\\/]/.test(id) || id.includes('scheduler')) {
              return 'react';
            }
            if (id.includes('gsap') || id.includes('@gsap/react')) {
              return 'gsap';
            }
          }
        },
      },
    },
  },
});
