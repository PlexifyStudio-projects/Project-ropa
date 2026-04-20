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
});
