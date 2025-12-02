// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,       // Automatically open the browser
  },
  build: {
    outDir: 'dist',   // Output folder
  },
  base: '/',          // VERY IMPORTANT for router to work correctly
});
