import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Group heavy charting libraries
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            // Group React core and its mandatory inter-dependent libraries
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/') ||
              id.includes('node_modules/react-is/') ||
              id.includes('node_modules/react-router/') ||
              id.includes('node_modules/@remix-run/')
            ) {
              return 'vendor-react-core';
            }
            // Animation engine isolation
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // Everything else in node_modules goes to a generic shared vendor 
            // for efficient long-term caching of smaller utilities.
            return 'vendor-shared';
          }
        },
      },
    },
  },
})
