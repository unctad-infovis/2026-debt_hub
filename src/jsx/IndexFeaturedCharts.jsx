import { createRoot } from 'react-dom/client';

import '@unctad-infovis/general-tools/styles/styles.css';

import meta from './../meta.json';
import FeaturedCharts from './components/FeaturedCharts.jsx';
import './theme.css';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}-featured-charts`);
createRoot(container).render(
  <div className="app">
    <FeaturedCharts meta={meta.featured_charts} />
  </div>
);
