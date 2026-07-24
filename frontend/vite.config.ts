import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  base: '/static/complaints/submit_complaint/',
  build: {
    outDir: path.resolve(__dirname, '../complaints/static/complaints/submit_complaint'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: '[name][extname]'
      }
    }
  }
});
