import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import ChartDataWrapper from '@unctad-infovis/general-tools/components/ChartDataWrapper.jsx';
import { useState } from 'react';

import CountryDeepLink from './CountryDeepLink.jsx';
import TabSwitcher from './TabSwitcher.jsx';
import './FeaturedCharts.css';

const FeaturedCharts = ({ meta }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="featured_charts featured-charts">
      <div className="featured_charts_content">
        <div className="featured_charts_header">
          <div className="featured_charts_heading">
            <h2 className="featured_charts_title">{meta.title}</h2>
            {meta.description && <p className="featured_charts_description">{meta.description}</p>}
          </div>
          <TabSwitcher activeIndex={activeIndex} onChange={setActiveIndex} tabs={meta.tabs} />
        </div>
        {meta.tabs.map((tab, index) => (
          // All tabs mount once and stay mounted — toggling `hidden` instead of conditionally
          // rendering avoids unmount/remount on every switch, which briefly collapses this
          // area's height and makes the browser clamp scroll position back up the page.
          // ChartDataWrapper only starts loading once its own container is visible, so a
          // hidden tab's chart doesn't load until it's actually selected.
          // Keyed on label, not chart_id — several tabs can share the same chart_id (e.g.
          // while real per-tab charts are pending) and chart_id must stay unique as a key.
          <div className="featured_charts_chart" hidden={index !== activeIndex} key={tab.label}>
            <ChartDataWrapper chart_id={tab.chart_id} />
          </div>
        ))}
        <div className="featured_charts_footer">
          {meta.country_deep_link?.enabled && <CountryDeepLink countries={meta.country_deep_link.countries} dashboard_url={meta.dashboard_url} label={meta.country_deep_link.label} param_name={meta.country_deep_link.param_name} />}
          <ButtonAnchor className="featured_charts_dashboard_cta" text={meta.dashboard_cta_label} url={meta.dashboard_url} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCharts;
