import Quote from '@unctad-infovis/general-tools/components/Quote.jsx';
import useCountUp from '@unctad-infovis/general-tools/helpers/UseCountUp.js';

import formatNumber from '../helpers/FormatNumber.js';
import ProductCard from './ProductCard.jsx';
import './Solutions.css';

// The page's core "sisäänheittotuote" section — a router to UNCTAD's three real debt
// destinations, not a place to replicate their content.
const Highlight = ({ highlight }) => {
  const [current, ref] = useCountUp(highlight.value, { decimals: highlight.decimals });

  return (
    <div className="solutions_highlight" ref={ref}>
      <p className="solutions_highlight_value">
        {highlight.prefix}
        {formatNumber(current, highlight.decimals)}
        {highlight.suffix}
      </p>
      <p className="solutions_highlight_label">{highlight.label}</p>
    </div>
  );
};

const Solutions = ({ meta }) => (
  <section className="solutions_section solutions">
    <div className="solutions_content">
      <div className="solutions_header">
        <div className="solutions_heading">
          <h2 className="solutions_title">{meta.title}</h2>
          {meta.description && <p className="solutions_description">{meta.description}</p>}
          {meta.quote && (
            <div className="solutions_quote">
              <Quote name={meta.quote.name} text={meta.quote.text} title={meta.quote.title} variant="bar" />
            </div>
          )}
        </div>
        {meta.highlight && <Highlight highlight={meta.highlight} />}
      </div>
      <div className="solutions_grid">
        {meta.items.map(item => (
          <ProductCard cta_label={item.cta_label} description={item.description} image_url={item.image_url} key={item.id} stat_label={item.stat_label} stat_value={item.stat_value} title={item.title} url={item.url} />
        ))}
      </div>
    </div>
  </section>
);

export default Solutions;
