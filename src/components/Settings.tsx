import type React from 'react';
import { Alert } from 'react-bootstrap';
import ReactGA from 'react-ga4';
import { Language } from '../helpers/constants';
import { strings } from '../helpers/localization';
import { setLanguage } from '../slices/sparkSlice';
import { useAppDispatch, useAppSelector } from '../store';
import '../styles/Settings.scss';

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector((state) => state.spark.languageCode);

  const handleCheckboxChange = () => {
    const newLanguage = languageCode === Language.English ? Language.Japanese : Language.English;

    dispatch(setLanguage(newLanguage));
    ReactGA.event({
      category: 'Settings change',
      action: 'Language change',
      label: newLanguage,
    });
  };

  return (
    <>
      <span className="language-label">
        {strings.english}
        &nbsp;
      </span>
      <label className="switch">
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
      <Alert variant="info" className="mb-0 mt-3">
        {strings.suggestionsWelcomed}
      </Alert>
    </>
  );
};
