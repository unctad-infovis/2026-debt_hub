import { createRoot } from 'react-dom/client';

import '@unctad-infovis/general-tools/styles/styles.css';

import meta from './../meta.json';
import DebtConference from './components/DebtConference.jsx';
import './theme.css';

const container = document.getElementById(`app-root-${__PROJECT_NAME__}-debt-conference`);
createRoot(container).render(
  <div className="app">
    <DebtConference meta={meta.debt_conference} />
  </div>
);
