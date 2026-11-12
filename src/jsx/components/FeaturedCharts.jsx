import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';

import CountryDeepLink from './CountryDeepLink.jsx';
import StatTile from './StatTile.jsx';
import './FeaturedCharts.css';

const FeaturedCharts = ({ meta }) => {
  // StatTile's fade-in only turns opaque once its parent carries `stat_tile_group--inview`.
  const [gridRef, inView] = useIsVisible(0.3);

  return (
    <section className="featured_charts featured-charts">
      <div className="featured_charts_content">
        <div className="featured_charts_heading">
          <h2 className="featured_charts_title">{meta.title}</h2>
          {meta.description && <p className="featured_charts_description">{meta.description}</p>}
        </div>
        <div className={`featured_charts_stats stat_tile_group${inView ? ' stat_tile_group--inview' : ''}`} ref={gridRef}>
          {meta.stats.map((stat, idx) => (
            <StatTile decimals={stat.decimals} delay={idx * 150} key={stat.label} label={stat.label} numeric={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          ))}
        </div>
        <div className="featured_charts_footer">
          {meta.country_deep_link?.enabled && <CountryDeepLink countries={meta.country_deep_link.countries} dashboard_url={meta.dashboard_url} label={meta.country_deep_link.label} param_name={meta.country_deep_link.param_name} />}
          <ButtonAnchor className="featured_charts_dashboard_cta" text={meta.dashboard_cta_label} url={meta.dashboard_url} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCharts;
