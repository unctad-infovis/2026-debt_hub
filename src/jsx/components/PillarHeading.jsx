import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import scrollToSelector from '../helpers/ScrollTo.js';
import useTargetExists from '../helpers/UseTargetExists.js';
import './PillarHeading.css';

const NavLink = ({ label, target_selector, up }) => {
  const exists = useTargetExists(target_selector);

  return (
    exists && (
      <li>
        <button className="pillar_nav_link" onClick={() => scrollToSelector(target_selector)} type="button">
          {up && <span aria-hidden="true">↑ </span>}
          {label}
        </button>
      </li>
    )
  );
};

// Heading shared by the three pillar sections: kicker, cross-links to the other pillars and
// back to the overview, title, description, and a chevron-clipped photo (empty = placeholder).
const PillarHeading = ({ description, kicker, pillar_id, pillars, title, title_class }) => {
  const others = pillars?.items.filter(item => item.id !== pillar_id) ?? [];
  const current = pillars?.items.find(item => item.id === pillar_id);

  return (
    <div className="pillar_heading">
      <div className="pillar_heading_text">
        <div className="pillar_nav">
          {kicker && (
            <p className="section_kicker">
              <span aria-hidden="true" className="debt_arrow" />
              {kicker}
            </p>
          )}
          {pillars && (
            <ul aria-label="Related sections" className="pillar_nav_list">
              {others.map(item => (
                <NavLink key={item.id} label={item.label} target_selector={item.target_selector} />
              ))}
              <NavLink label={pillars.overview.label} target_selector={pillars.overview.target_selector} up />
            </ul>
          )}
        </div>
        <h2 className={title_class}>{title}</h2>
        {description && <p className="pillar_description">{description}</p>}
      </div>
      <figure className="pillar_photo">
        <div className="pillar_photo_image" style={current?.image_url ? { backgroundImage: `url(${resolveAsset(current.image_url)})` } : undefined} />
        {current?.image_credit && <figcaption className="pillar_photo_credit">{current.image_credit}</figcaption>}
      </figure>
    </div>
  );
};

export default PillarHeading;
