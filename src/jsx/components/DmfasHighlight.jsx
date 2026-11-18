import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';

import DmfasMap from './DmfasMap.jsx';
import PillarHeading from './PillarHeading.jsx';
import StatTile from './StatTile.jsx';
import './DmfasHighlight.css';

const DmfasHighlight = ({ meta, pillars }) => {
  // StatTile's fade-in (StatTile.css) only turns opaque once its parent carries
  // `stat_tile_group--inview` — set here via useIsVisible so the tiles
  // don't end up permanently invisible.
  const [gridRef, inView] = useIsVisible(0.3);

  return (
    <section className="dmfas_highlight_section dmfas-highlight">
      <div className="dmfas_highlight_content">
        <PillarHeading description={meta.description} kicker={meta.kicker} pillar_id={meta.pillar_id} pillars={pillars} quote={meta.quote} title={meta.title} title_class="dmfas_highlight_title" />
        <div className={`dmfas_highlight_stats stat_tile_group${inView ? ' stat_tile_group--inview' : ''}`} ref={gridRef}>
          {meta.stats.map((stat, idx) => (
            <StatTile decimals={stat.decimals} delay={idx * 150} key={stat.label} label={stat.label} numeric={stat.value} prefix={stat.prefix} suffix={stat.suffix} text={stat.text} />
          ))}
        </div>
        {meta.visual?.type === 'map' && meta.visual.countries_csv_url && <DmfasMap caption={meta.visual.caption} countries_csv_url={meta.visual.countries_csv_url} />}
        <ButtonAnchor className="dmfas_highlight_cta" text={meta.cta.label} url={meta.cta.url} />
      </div>
    </section>
  );
};

export default DmfasHighlight;
