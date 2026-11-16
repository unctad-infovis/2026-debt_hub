import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import scrollToSelector from '../helpers/ScrollTo.js';
import useTargetExists from '../helpers/UseTargetExists.js';
import './ProductCard.css';

// Splits "3.7 billion people" into a big value and a smaller unit.
const splitStat = value => {
  const match = /^([^\s]+)\s+(.*)$/.exec(value ?? '');
  return match ? { number: match[1], unit: match[2] } : { number: value, unit: '' };
};

const ProductCard = ({ title, description, image_url, stat_label, stat_value, cta_label, url, jump_label, pillar_target }) => {
  const canJump = useTargetExists(pillar_target ?? '#none');
  const { number, unit } = splitStat(stat_value);

  return (
    <div className={`product_card${canJump ? ' product_card--jump' : ''}`}>
      <div className="product_card_photo" style={image_url ? { backgroundImage: `url(${resolveAsset(image_url)})` } : undefined}>
        <a className="product_card_link" href={url} rel="noreferrer" target="_blank">
          {cta_label}{' '}
          <span aria-hidden="true" className="product_card_link_icon">
            ↗
          </span>
        </a>
      </div>
      <div className="product_card_body">
        <h3 className="product_card_title">
          <span aria-hidden="true" className="debt_arrow" />
          {title}
        </h3>
        <p className="product_card_description">{description}</p>
        {stat_value && (
          <p className="product_card_stat">
            <span className="product_card_stat_value">
              {number}
              {unit && <span className="product_card_stat_unit"> {unit}</span>}
            </span>
            <span className="product_card_stat_label">{stat_label}</span>
          </p>
        )}
        <div className="product_card_actions">
          {canJump && (
            <button className="product_card_jump" onClick={() => scrollToSelector(pillar_target)} type="button">
              <span aria-hidden="true" className="product_card_jump_icon">
                <span className="debt_arrow debt_arrow--down" />
              </span>
              {jump_label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
