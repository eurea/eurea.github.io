import type React from 'react';
import { Alert } from 'react-bootstrap';
import ReactGA from 'react-ga4';
import { Language } from '../helpers/constants';
import { strings } from '../helpers/localization';
import { useStore } from '../store';
import '../styles/Settings.scss';

export const Settings: React.FC = () => {
  const languageCode = useStore((s) => s.languageCode);
  const setLanguage = useStore((s) => s.setLanguage);

  const handleCheckboxChange = () => {
    const newLanguage = languageCode === Language.English ? Language.Japanese : Language.English;

    setLanguage(newLanguage);
    ReactGA.event({
      category: 'Settings change',
      action: 'Language change',
      label: newLanguage
    });
  };

  return (
    <>
      <div className="d-flex">
      <span className="language-label">
        {strings.english}
        &nbsp;
      </span>
        <label className="switch mx-1" style={{ marginTop: '2px' }} htmlFor="languageSwitch">
          <input
            type="checkbox"
            id="languageSwitch"
            onChange={handleCheckboxChange}
            checked={languageCode === Language.Japanese}
          />
          <span className="slider" />
        </label>
        <span className="language-label">
        &nbsp;
          {strings.japanese}
      </span>
      </div>
      <Alert variant="info" className="mb-0 mt-3">
        {strings.suggestionsWelcomed}
      </Alert>
    </>
  );
};
