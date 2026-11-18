import useCountUp from '@unctad-infovis/general-tools/helpers/UseCountUp.js';

import formatNumber from '../helpers/FormatNumber.js';
import './StatTile.css';

// Shared count-up figure tile, used by DmfasHighlight (DMFAS programme figures).
const StatTile = ({ delay, label, lead, prefix, suffix, decimals, numeric, text, url }) => {
  const [current, ref] = useCountUp(numeric ?? 0, { decimals });
  const content =
    text || numeric != null ? (
      <>
        <p className="stats_strip_value">
          {prefix && prefix.trim().length > 1 && <span className="stats_strip_unit stats_strip_prefix">{prefix}</span>}
          {text ?? (
            <span className="stats_strip_number">
              {prefix && prefix.trim().length <= 1 && prefix}
              {formatNumber(current, decimals)}
              {suffix?.trim() === '%' && suffix}
            </span>
          )}
          {suffix && suffix.trim() !== '%' && <span className="stats_strip_unit">{suffix}</span>}
        </p>
        {lead && <p className="stats_strip_lead">{lead}</p>}
        <p className="stats_strip_label">{label}</p>
      </>
    ) : lead ? (
      <>
        <p className="stats_strip_value stats_strip_value--lead">{lead}</p>
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
