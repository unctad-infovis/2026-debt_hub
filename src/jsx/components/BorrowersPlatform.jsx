import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';

import './BorrowersPlatform.css';

// Mockup block: copy in meta.json is placeholder text until the real content is provided.
const BorrowersPlatform = ({ meta }) => (
  <section className="borrowers_platform_section borrowers-platform">
    <div className="borrowers_platform_content">
      <div className="borrowers_platform_heading">
        <h2 className="borrowers_platform_title">{meta.title}</h2>
        {meta.description && <p className="borrowers_platform_description">{meta.description}</p>}
      </div>
      <div className="borrowers_platform_items">
        {meta.items.map(item => (
          <div className="borrowers_platform_item" key={item.title}>
            <h3 className="borrowers_platform_item_title">{item.title}</h3>
            <p className="borrowers_platform_item_description">{item.description}</p>
          </div>
        ))}
      </div>
      <ButtonAnchor className="borrowers_platform_cta" text={meta.cta.label} url={meta.cta.url} />
    </div>
  </section>
);

export default BorrowersPlatform;
