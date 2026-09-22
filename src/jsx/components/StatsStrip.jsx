import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import { useEffect, useState } from 'react';

import parseLocaleNumber from '../helpers/ParseLocaleNumber.js';
import parseTsv from '../helpers/ParseTsv.js';
import StatTile from './StatTile.jsx';
import './StatsStrip.css';

const StatsStrip = ({ meta }) => {
  const [rows, setRows] = useState(null);
  const [gridRef, inView] = useIsVisible(0.3);

  useEffect(() => {
    if (!meta.csv_url) return;

    fetch(meta.csv_url)
      .then(response => response.text())
      .then(text => setRows(parseTsv(text)))
      .catch(error => console.error(error));
  }, [meta.csv_url]);

  // No Datawrapper dataset table exists yet for these headline figures (unlike a project
  // with a ready-made CSV) — falls back to the static `value` in meta.json until/unless one
  // gets published. Once `csv_url` is set, the fetched row takes over automatically.
  const stats = meta.stats.map(stat => {
    if (!meta.csv_url) return { ...stat, numeric: stat.value ?? null };
    const row = rows?.find(r => r[stat.match.column] === stat.match.value);
    const numeric = parseLocaleNumber(row?.[stat.value_column]);
    return { ...stat, numeric };
  });

  return (
    <div className={`stats_strip_grid stat_tile_group${inView ? ' stat_tile_group--inview' : ''}`} id="stats-strip" ref={gridRef}>
      {stats.map((stat, idx) => (
        // Keying on readiness (not just the label) forces a remount once the CSV fetch resolves —
        // useCountUp's animation starts on first visibility and never restarts, so if a tile scrolls
        // into view before `numeric` arrives, it must remount rather than reuse the stale instance.
        <StatTile decimals={stat.decimals} delay={idx * 150} key={`${stat.label}-${stat.numeric ?? 'pending'}`} label={stat.label} numeric={stat.numeric} prefix={stat.prefix} suffix={stat.suffix} url={stat.url} />
      ))}
    </div>
  );
};

export default StatsStrip;
