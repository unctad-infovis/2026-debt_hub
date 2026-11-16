import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';

import './DebtConference.css';

const DebtConference = ({ meta }) => (
  <section className="debt_conference_section debt-conference">
    <div className="debt_conference_content">
      <div className="debt_conference_text">
        {meta.kicker && (
          <p className="section_kicker">
            <span aria-hidden="true" className="debt_arrow" />
            {meta.kicker}
          </p>
        )}
        <h2 className="debt_conference_title">{meta.title}</h2>
        {meta.description && <p className="debt_conference_description">{meta.description}</p>}
        <dl className="debt_conference_details">
          {meta.details.map(detail => (
            <div className="debt_conference_detail" key={detail.label}>
              <dt className="debt_conference_detail_label">{detail.label}</dt>
              <dd className="debt_conference_detail_value">{detail.value}</dd>
            </div>
          ))}
        </dl>
        <ButtonAnchor className="debt_conference_cta" text={meta.cta.label} url={meta.cta.url} />
      </div>
      {meta.image_url && <img alt={meta.image_alt ?? ''} className="debt_conference_visual" src={resolveAsset(meta.image_url)} />}
    </div>
  </section>
);

export default DebtConference;
