import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    manifest: true,
    lib: {
      entry: './src/OlStyleParser.ts',
      name: 'GeoStylerOpenlayersParser',
      formats: ['iife'],
      fileName: 'olStyleParser',
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: 'dist',
        exports: 'named',
        generatedCode: 'es5',
        format: 'iife',
      },
    }
  },
  define: {
    appName: 'GeoStyler'
  },
  server: {
    host: '0.0.0.0'
  }
});
