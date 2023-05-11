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
    rollupOptions: {
      output: {
        dir: 'browser',
        exports: 'named',
        generatedCode: 'es5',
        format: 'iife',
        sourcemap: true
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
