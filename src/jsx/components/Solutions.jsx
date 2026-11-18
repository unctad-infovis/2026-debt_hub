import Quote from '@unctad-infovis/general-tools/components/Quote.jsx';

import ProductCard from './ProductCard.jsx';
import './Solutions.css';

// The page's core "sisäänheittotuote" section — a router to UNCTAD's three real debt
// destinations, not a place to replicate their content.
const Solutions = ({ meta, jump_label }) => (
  <section className="solutions_section solutions">
    <div className="solutions_content">
      <div className="solutions_header">
        <div className="solutions_heading">
          {meta.kicker && (
            <p className="section_kicker">
              <span aria-hidden="true" className="debt_arrow" />
              {meta.kicker}
            </p>
          )}
          <h2 className="solutions_title">{meta.title}</h2>
          {[meta.description].flat().map(
            paragraph =>
              paragraph && (
                <p className="solutions_description" key={paragraph}>
                  {paragraph}
                </p>
              )
          )}
          {meta.quote && (
            <div className="solutions_quote">
              <Quote name={meta.quote.name} text={meta.quote.text} title={meta.quote.title} variant="bar" />
            </div>
          )}
        </div>
      </div>
      <div className="solutions_grid">
        {meta.items.map(item => (
          <ProductCard kicker={item.kicker} cta_label={item.cta_label} description={item.description} image_url={item.image_url} jump_label={jump_label} key={item.id} stat_label={item.stat_label} pillar_target={item.pillar_target} stat_value={item.stat_value} title={item.title} url={item.url} />
        ))}
      </div>
    </div>
  </section>
);

export default Solutions;
