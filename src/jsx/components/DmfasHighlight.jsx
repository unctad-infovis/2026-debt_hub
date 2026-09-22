import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';

import DmfasMap from './DmfasMap.jsx';
import StatTile from './StatTile.jsx';
import './DmfasHighlight.css';

const DmfasHighlight = ({ meta }) => {
  // StatTile's fade-in (StatTile.css) only turns opaque once its parent carries
  // `stat_tile_group--inview` — the same hook StatsStrip.jsx sets via useIsVisible. Reused
  // here so a second StatTile consumer doesn't end up with permanently-invisible tiles.
  const [gridRef, inView] = useIsVisible(0.3);

  return (
    <section className="dmfas_highlight_section dmfas-highlight">
      <div className="dmfas_highlight_content">
        <div className="dmfas_highlight_heading">
          <h2 className="dmfas_highlight_title">{meta.title}</h2>
          {meta.description && <p className="dmfas_highlight_description">{meta.description}</p>}
        </div>
        <div className={`dmfas_highlight_stats stat_tile_group${inView ? ' stat_tile_group--inview' : ''}`} ref={gridRef}>
          {meta.stats.map((stat, idx) => (
            <StatTile decimals={stat.decimals} delay={idx * 150} key={stat.label} label={stat.label} numeric={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          ))}
        </div>
        {meta.visual?.type === 'map' && <DmfasMap countries_csv_url={meta.visual.countries_csv_url} />}
        <ButtonAnchor className="dmfas_highlight_cta" text={meta.cta.label} url={meta.cta.url} />
      </div>
    </section>
  );
};

export default DmfasHighlight;
