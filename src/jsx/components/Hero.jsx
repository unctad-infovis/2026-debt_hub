import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import NavCard from './NavCard.jsx';
import './Hero.css';

const Hero = ({ meta }) => {
  const conference = meta.debt_conference;
  const { title, description, background_image_url, background_position, cta, show_cta, show_nav_cards, nav_cards, pills } = meta.hero;

  return (
    <div className="hero_wrapper">
      <section className="hero" id="hero" style={background_image_url ? { backgroundImage: `url(${resolveAsset(background_image_url)})`, backgroundPosition: background_position } : undefined}>
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
                <ButtonAnchor className={pill.url ? 'hero_link' : `hero_pill${pill.highlight ? ' hero_pill--event' : ''}`} key={pill.label} text={pill.label} url={pill.url ?? pill.target_selector} />
              ))}
            </div>
          )
        }
      </section>
      {conference?.banner?.enabled && (
        <aside className="hero_event">
          <div className="hero_event_inner">
            <div aria-hidden="true" className="hero_event_date">
              <span className="hero_event_days">{conference.date.days}</span>
              <span className="hero_event_month">
                {conference.date.month} {conference.date.year}
              </span>
            </div>
            <div className="hero_event_text">
              <p className="hero_event_kicker">{conference.banner.kicker}</p>
              <p className="hero_event_title">{conference.title}</p>
              <p className="hero_event_venue">{conference.banner.venue}</p>
            </div>
            <a className="hero_event_cta" href={conference.cta.url} rel="noreferrer" target="_blank">
              {conference.banner.cta_label}
              <span aria-hidden="true" className="debt_arrow" />
            </a>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Hero;
