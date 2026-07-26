import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },

  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false, // faster builds
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react'
          if (id.includes('node_modules/react-router-dom')) return 'vendor-react'
          if (id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer'
          if (id.includes('node_modules/gsap')) return 'vendor-gsap'
          if (id.includes('node_modules/lenis')) return 'vendor-lenis'
          if (id.includes('node_modules/swiper')) return 'vendor-swiper'
          if (id.includes('node_modules/react-player')) return 'vendor-player'
          if (id.includes('node_modules/react-countup') || id.includes('node_modules/countup')) return 'vendor-countup'
          if (id.includes('node_modules/react-icons')) return 'vendor-icons'
          if (id.includes('node_modules/aos')) return 'vendor-aos'
        },
        // Asset naming
        assetFileNames: (asset) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(asset.name)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.(mp4|webm|ogg)$/i.test(asset.name)) {
            return 'assets/video/[name]-[hash][extname]'
          }
          if (/\.css$/i.test(asset.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Warn on chunks > 500KB
    chunkSizeWarningLimit: 500,
  },

  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
  },

  // Preview server
  preview: {
    port: 4173,
    strictPort: true,
  },
})
