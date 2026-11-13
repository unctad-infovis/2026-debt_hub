import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';

import './DebtConference.css';

// Placeholder block: copy in meta.json is placeholder text until the real content is provided.
const DebtConference = ({ meta }) => (
  <section className="debt_conference_section debt-conference">
    <div className="debt_conference_content">
      <div className="debt_conference_heading">
        <h2 className="debt_conference_title">{meta.title}</h2>
        {meta.description && <p className="debt_conference_description">{meta.description}</p>}
      </div>
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
  </section>
);

export default DebtConference;
