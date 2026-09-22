import useCountUp from '@unctad-infovis/general-tools/helpers/UseCountUp.js';

import formatNumber from '../helpers/FormatNumber.js';
import './StatTile.css';

// Shared count-up figure tile, used by both StatsStrip (global headline figures) and
// DmfasHighlight (DMFAS programme figures) — extracted once a second consumer appeared.
const StatTile = ({ delay, label, prefix, suffix, decimals, numeric, url }) => {
  const [current, ref] = useCountUp(numeric ?? 0, { decimals });
  const content =
    numeric != null ? (
      <>
        <p className="stats_strip_value">
          {prefix}
          {formatNumber(current, decimals)}
          {suffix}
        </p>
        <p className="stats_strip_label">{label}</p>
      </>
    ) : (
      <>
        <p className="stats_strip_unavailable">Data not available</p>
        <p className="stats_strip_label">{label}</p>
      </>
    );

  return url ? (
    <a className="stats_strip_tile stats_strip_tile--link" href={url} ref={ref} rel="noreferrer" style={{ transitionDelay: `${delay}ms` }} target="_blank">
      {content}
    </a>
  ) : (
    <div className="stats_strip_tile" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {content}
    </div>
  );
};

export default StatTile;
