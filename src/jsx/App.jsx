import { useRef } from 'react';

import '@unctad-infovis/general-tools/styles/styles.css';

import Hero from './components/Hero.jsx';
import './theme.css';

// Article.mdx is unused by this project — all copy for the hero, stats strip,
// featured-charts, solutions and dmfas-highlight entries lives in meta.json (short
// structured UI strings, not long-form narrative), see src/meta.json.

const App = ({ meta }) => {
  const appRef = useRef();

  window.appRef = appRef;

  return (
    <div className="app" ref={appRef}>
      <Hero meta={meta} />
    </div>
  );
};

export default App;
