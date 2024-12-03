import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'node18',
    outDir: 'dist/preload',
    lib: {
      entry: 'src/preload.ts',
      formats: ['cjs'],
      fileName: () => 'preload.js'
    },
    rollupOptions: {
      external: ['electron']
    },
    sourcemap: true,
    emptyOutDir: true
  }
}) 