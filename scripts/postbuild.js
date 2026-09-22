import fs from 'node:fs';
import path from 'node:path';

const distDir = 'dist';
const entries = ['hero', 'stats-strip', 'featured-charts', 'solutions', 'dmfas-highlight'];

// index.html isn't a Vite entry (see vite.config.js for why), so dist/index.html doesn't
// exist yet — assemble it from the project's root index.html template, using the exact
// <link>/<script> tags Vite already generated for each of the 5 real entries (never
// hand-typed/guessed, so it stays correct if chunking or filenames ever change).
const collectedTags = new Map();
for (const entry of entries) {
  const html = fs.readFileSync(path.join(distDir, `${entry}.html`), 'utf8');
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
  // <link> is a void element (self-closing); <script> is not — its regex must also
  // capture the closing tag, or the browser parses everything after it as inert text
  // inside one giant unclosed <script> (script content is raw text until a literal
  // </script>, unlike normal HTML elements).
  for (const tag of head.match(/<script[^>]*>[\s\S]*?<\/script>|<link[^>]*>/g) ?? []) {
    const attr = tag.match(/(?:href|src)="([^"]+)"/);
    if (attr) collectedTags.set(attr[1], tag);
  }
}

// The template's own <script type="module" src="/src/jsx/Index*.jsx"> tags only work
// under `vite`'s dev server (live JSX transform) — drop them; the collected tags above
// already include each entry's real, built <script> alongside its stylesheets/preloads.
const indexHtml = fs
  .readFileSync('index.html', 'utf8')
  .replace(/\s*<script type="module" src="\/src\/jsx\/Index\w*\.jsx"><\/script>\n/g, '\n')
  .replace('</head>', `    ${[...collectedTags.values()].join('\n    ')}\n  </head>`);

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

// Rewrite absolute asset paths to relative in every built HTML file (including the one
// just written above) so the site works when served from a subpath, e.g. GitHub Pages'
// https://unctad-infovis.github.io/2026-debt_hub/ rather than domain root.
for (const file of fs.readdirSync(distDir).filter(f => f.endsWith('.html'))) {
  const filePath = path.join(distDir, file);
  const html = fs
    .readFileSync(filePath, 'utf8')
    .replace(/href="\//g, 'href="./')
    .replace(/src="\//g, 'src="./');
  fs.writeFileSync(filePath, html);
}
