import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import './ProductCard.css';

// No card/product-grid component exists in @unctad-infovis/general-tools or minisite-tools
// (confirmed by grep) — minisite-tools' Header.jsx chapter-nav tiles are hardcoded to
// in-page PDF-chapter anchors, not a fit for external product links, so this is new.
const ProductCard = ({ title, description, image_url, stat_label, stat_value, cta_label, url }) => (
  <div className="product_card">
    <div className="product_card_photo" style={image_url ? { backgroundImage: `url(${resolveAsset(image_url)})` } : undefined} />
    <div className="product_card_body">
      <h3 className="product_card_title">{title}</h3>
      <p className="product_card_description">{description}</p>
      {stat_value && (
        <p className="product_card_stat">
          <span className="product_card_stat_value">{stat_value}</span>
          <span className="product_card_stat_label">{stat_label}</span>
        </p>
      )}
      <ButtonAnchor className="product_card_cta" text={cta_label} url={url} />
    </div>
  </div>
);

export default ProductCard;
