import ProductCard from './ProductCard.jsx';
import './Solutions.css';

// The page's core "sisäänheittotuote" section — a router to UNCTAD's three real debt
// destinations, not a place to replicate their content.
const Solutions = ({ meta }) => (
  <section className="solutions_section solutions">
    <div className="solutions_content">
      <div className="solutions_heading">
        <h2 className="solutions_title">{meta.title}</h2>
        {meta.description && <p className="solutions_description">{meta.description}</p>}
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
