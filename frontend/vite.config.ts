import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/showflix/',
  server: {
    host: "0.0.0.0",
    allowedHosts: ["prayudahlah"],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'chart-vendor': ['recharts'],

          // Feature chunks
          'dashboard-executive': [
            './src/components/dashboard/Executive.tsx',
            './src/components/chart/executive/ExecChart1.tsx',
            './src/components/chart/executive/ExecChart2.tsx',
            './src/components/chart/executive/ExecChart3.tsx',
            './src/components/chart/executive/ExecChart4.tsx',
            './src/components/chart/executive/ExecChart5.tsx',
          ],
        },

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    chunkSizeWarningLimit: 1000,

    sourcemap: false,

    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'recharts',
    ],
  },
})
