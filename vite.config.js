import { createRequire } from 'node:module';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const { name } = require('./package.json');

export default defineConfig(({ command }) => ({
  build: {
    emptyOutDir: true,
    minify: 'terser',
    outDir: 'dist',
    rollupOptions: {
      // index.html (the combined demo page, see README's "Local preview" section) is
      // deliberately NOT a Rollup entry here — if the same Index*.jsx scripts are entered
      // from two HTML files, Vite/Rollup stops deduping and stable-naming them as one
      // shared entry per script and instead mints a second, differently content-hashed copy
      // of every entry (doubling ~700KB of JS) while breaking the stable `js/[name].min.js`
      // filenames Drupal editors hardcode. Instead, scripts/postbuild.js assembles
      // dist/index.html afterwards from the tags these 5 real entries already produce.
      input: {
        hero: './hero.html',
        'stats-strip': './stats-strip.html',
        'featured-charts': './featured-charts.html',
        solutions: './solutions.html',
        'dmfas-highlight': './dmfas-highlight.html'
      },
      output: {
        // Entry files keep stable, predictable names (Drupal editors hardcode these in
        // embed snippets and manually bump a `?v=` query param to bust caches on deploy).
        // Shared chunks (e.g. the "styles" chunk holding react/general-tools/meta.json,
        // deduplicated across all 5 entries) must instead get a content hash: each entry's
        // own `import` statement pointing at a shared chunk carries NO query string at all
        // (Rollup emits a bare relative path), so a manual `?v=` bump on the outer <script>
        // tag can never bust a shared chunk's cache — only a genuinely new URL can, which a
        // content hash provides automatically and correctly on every content change.
        entryFileNames: `js/${name}.[name].min.js`,
        chunkFileNames: `js/${name}.[name]-[hash].js`,
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.css')) return `css/${name}_${assetInfo.name.replace('.css', '').replaceAll('-', '_')}.min.css`;
          return `assets/[name][extname]`;
        }
      }
    },
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: command === 'build'
      }
    }
  },
  define: {
    __PROJECT_NAME__: JSON.stringify(name)
  },
  plugins: [{ enforce: 'pre', ...mdx() }, react()],
  server: {
    hot: true,
    open: true,
    port: 8080,
    strictPort: false
  }
}));
