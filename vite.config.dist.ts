import { defineConfig } from 'vite';
import path from 'path';
import type { Plugin } from 'vite';

// Plugin to add .js extensions to ol/* imports for Node.js ESM compatibility
function addJsExtensionsToOlImports(): Plugin {
  return {
    name: 'add-js-extensions-to-ol-imports',
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && fileName.endsWith('.js')) {
          // Replace: from "ol/..." or from 'ol/...' (without .js)
          // With: from "ol/....js" or from 'ol/....js'
          chunk.code = chunk.code.replace(
            /from (['"](ol(?:\/[^'"]*)?)['"]);/g,
            (match, fullMatch, olPath) => {
              // Only add .js if it doesn't already end with .js
              if (olPath.endsWith('.js')) {
                return match;
              }
              return `from ${fullMatch.replace(olPath, olPath + '.js')};`;
            }
          );
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: {
        OlStyleParser: path.resolve(__dirname, 'src/OlStyleParser.ts'),
        OlFlatStyleParser: path.resolve(__dirname, 'src/OlFlatStyleParser.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['geostyler-style', 'css-font-parser', /^ol(\/|$)/],
      output: {
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        externalLiveBindings: false,
        plugins: [addJsExtensionsToOlImports()],
      },
    },
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
