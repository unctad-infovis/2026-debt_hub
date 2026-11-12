import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import NavCard from './NavCard.jsx';
import './Hero.css';

const Hero = ({ meta }) => {
  const { title, description, background_image_url, cta, show_cta, show_nav_cards, nav_cards, pills } = meta.hero;

  return (
    <div className="hero_wrapper">
      <section className="hero" id="hero" style={background_image_url ? { backgroundImage: `url(${resolveAsset(background_image_url)})` } : undefined}>
        <div className="hero_content">
          <div className="hero_heading">
            <h1 className="hero_title">{title}</h1>
            <p className="hero_description">{description}</p>
          </div>
          {
            // CTA is disabled by default but kept wired up behind `show_cta` in meta.json so
            // it can come back without rework.
            show_cta && <ButtonAnchor className="hero_cta" text={cta.label} url={cta.target_selector} />
          }
        </div>
        {
          // Nav-cards/pills live inside `.hero` itself (not an overlapping sibling) so `.hero`'s
          // min-height grows to fit them when they wrap on narrow screens. Photo nav cards are
          // disabled by default (in favour of the pill row) but kept behind `show_nav_cards`.
          show_nav_cards ? (
            <div className="hero_nav_cards">
              {nav_cards.map(card => (
                <NavCard image_url={card.image_url} key={card.label} label={card.label} target_selector={card.target_selector} />
              ))}
            </div>
          ) : (
            <div className="hero_pills">
              {pills.map(pill => (
                <ButtonAnchor className={pill.url ? 'hero_link' : 'hero_pill'} key={pill.label} text={pill.label} url={pill.url ?? pill.target_selector} />
              ))}
            </div>
          )
        }
      </section>
    </div>
  );
};

export default Hero;
