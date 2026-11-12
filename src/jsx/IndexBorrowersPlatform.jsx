import { createRoot } from 'react-dom/client';

import '@unctad-infovis/general-tools/styles/styles.css';

import meta from './../meta.json';
import BorrowersPlatform from './components/BorrowersPlatform.jsx';
import './theme.css';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}-borrowers-platform`);
createRoot(container).render(
  <div className="app">
    <BorrowersPlatform meta={meta.borrowers_platform} />
  </div>
);
