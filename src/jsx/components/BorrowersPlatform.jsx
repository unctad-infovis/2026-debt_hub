import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';

import StatTile from './StatTile.jsx';
import './BorrowersPlatform.css';

const BorrowersPlatform = ({ meta }) => {
  // StatTile's fade-in only turns opaque once its parent carries `stat_tile_group--inview`.
  const [gridRef, inView] = useIsVisible(0.3);

  return (
    <section className="borrowers_platform_section borrowers-platform">
      <div className="borrowers_platform_content">
        <div className="borrowers_platform_heading">
          <h2 className="borrowers_platform_title">{meta.title}</h2>
          {meta.description && <p className="borrowers_platform_description">{meta.description}</p>}
        </div>
        <div className={`borrowers_platform_stats stat_tile_group${inView ? ' stat_tile_group--inview' : ''}`} ref={gridRef}>
          {meta.stats.map((stat, idx) => (
            <StatTile decimals={stat.decimals} delay={idx * 150} key={stat.label} label={stat.label} numeric={stat.value} prefix={stat.prefix} suffix={stat.suffix} text={stat.text} />
          ))}
        </div>
        <ButtonAnchor className="borrowers_platform_cta" text={meta.cta.label} url={meta.cta.url} />
      </div>
    </section>
  );
};

export default BorrowersPlatform;
