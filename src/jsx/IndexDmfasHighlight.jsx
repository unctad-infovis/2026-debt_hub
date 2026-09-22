import { createRoot } from 'react-dom/client';

import '@unctad-infovis/general-tools/styles/styles.css';

import meta from './../meta.json';
import DmfasHighlight from './components/DmfasHighlight.jsx';
import './theme.css';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}-dmfas-highlight`);
createRoot(container).render(
  <div className="app">
    <DmfasHighlight meta={meta.dmfas_highlight} />
  </div>
);
