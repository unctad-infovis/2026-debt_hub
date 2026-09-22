import { createRoot } from 'react-dom/client';

import '@unctad-infovis/general-tools/styles/styles.css';

import meta from './../meta.json';
import Solutions from './components/Solutions.jsx';
import './theme.css';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}-solutions`);
createRoot(container).render(
  <div className="app">
    <Solutions meta={meta.solutions} />
  </div>
);
