import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import Select from '@unctad-infovis/general-tools/components/Select.jsx';
import { useState } from 'react';

import './CountryDeepLink.css';

// Gated behind meta.featured_charts.country_deep_link.enabled until it's confirmed the
// World of Debt dashboard actually supports a preselect-via-URL-param — see the open
// question in the project plan. Renders nothing while disabled or while `countries` is
// still an empty placeholder list.
const CountryDeepLink = ({ dashboard_url, param_name, label, countries }) => {
  const [country, setCountry] = useState(null);

  if (!countries?.length) return null;

  const options = countries.map(({ iso, label: countryLabel }) => ({ value: iso, label: countryLabel }));

  return (
    <div className="country_deep_link">
      <Select ariaLabel={label} clearable onChange={setCountry} options={options} placeholder={label} value={country} />
      {country && <ButtonAnchor className="country_deep_link_cta" text={`Explore ${country.label} in the full dashboard`} url={`${dashboard_url}?${param_name}=${country.value}`} />}
    </div>
  );
};

export default CountryDeepLink;
