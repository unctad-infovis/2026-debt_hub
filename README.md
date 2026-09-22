# 2026-debt_hub

**Live demo** https://unctad-infovis.github.io/2026-debt_hub/

## Rights of usage

Contact Teemo Tebest.

## How to build and develop

This is a Vite + React project.

* `npm install`
* `npm run start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`

## Files and folders

All public assets go to folder `public`.

All source code goes to folder `src`.

## Packages

The following packages are used in this project by default.

### Shared UNCTAD packages

* **@unctad-infovis/general-tools** — shared React components (`ButtonAnchor`, `ButtonShare`, `ChartDataWrapper`, `Image`, `ProgressBar`, `Quote`, `Select`, `Tooltip`, `UNCTADSiteHeader`, `BackToTop`, …), helpers (`BasePath`, `LoadFile`, `CsvToJson`, `FormatNr`, `RoundNr`, `UseIsVisible`, …) and base design-token styles
* **@unctad-infovis/map-tools** — Highcharts map helpers (TopoJSON processing, disputed-territory colour resolution, mapline series, chrome styles), used to build the DMFAS country-usage map

These packages are published from the [`un-init-project`](https://github.com/unctad-infovis/un-init-project) monorepo to GitHub Packages, so installing needs an `.npmrc` with `@unctad-infovis:registry=https://npm.pkg.github.com` and a `GITHUB_PACKAGES_TOKEN` environment variable.

### Project specific

Debt Hub is UNCTAD's landing page bringing together its debt-related work — World of Debt (data & analysis), the Borrowers' Platform, and DMFAS (technical cooperation & debt-management software) — in one visual, data-driven place. It is **not** a single-page app: it is 5 independently embeddable Vite entries, each mounting its own React root, meant to be dropped onto a Drupal page as separate blocks alongside native Drupal content (publications, news):

* `hero.html` / `Hero.jsx` — title, strapline, full-bleed image, pill nav
* `stats-strip.html` / `StatsStrip.jsx` — headline "scale of the problem" figures
* `featured-charts.html` / `FeaturedCharts.jsx` — a small number of recurring World of Debt charts (Datawrapper embeds) + a link to the full interactive dashboard
* `solutions.html` / `Solutions.jsx` — the page's core router: 3 product cards linking to World of Debt, the Borrowers' Platform and DMFAS
* `dmfas-highlight.html` / `DmfasHighlight.jsx` — DMFAS stat tiles + a country-usage map + a link out

Root `index.html` is a **combined demo page** (built and deployed — it's the "Live demo" link above) stacking all 5 entries with dashed placeholder blocks standing in for native Drupal content, so the assembled page can be reviewed without a Drupal instance. It is a demo only: each entry also runs standalone at its own `.html` file, and that's how the real unctad.org page embeds them, never this combined file. See the implementation plan for the full architecture and open questions (Datawrapper chart IDs, DMFAS country dataset, dashboard country-deep-link support) still pending before launch.

### Build & Dev Server

* **vite** — development server with hot module replacement and production bundler, replaces webpack
* **@vitejs/plugin-react** — adds React and JSX support to Vite

### React

* **react** — UI component library
* **react-dom** — renders React components to the DOM

### Formatter & Linter

* **@biomejs/biome** — formats and lints JS, JSX and CSS files on save, replaces ESLint + Prettier

### Minification

* **terser** — minifies the production JavaScript bundle, removes console.logs in production builds

### MDX

* **@mdx-js/rollup** — Vite/Rollup plugin that compiles MDX files into React components
* **@mdx-js/react** — provides React context for MDX components