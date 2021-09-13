import React from 'react';
import { Alert } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { English, Japanese } from '../helpers/constants';
import strings from '../helpers/localization';
import { SET_LANGUAGE } from '../store/actions';
import { RootState } from '../store/types';
import '../styles/Settings.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const languageCode = useSelector((state: RootState) => state.languageCode);

  const handleCheckboxChange = () => {
    const newLanguage = languageCode === English ? Japanese : English;

    dispatch({ type: SET_LANGUAGE, payload: newLanguage });
    ReactGA.event({
      category: 'Settings change',
      action: 'Language change',
      label: newLanguage,
    });
  };

  return (
    <>
      <label className="language-label">
        {strings.english}
        &nbsp;
      </label>
      <label className="switch">
        <input
          type="checkbox"
          id="languageSwitch"
          onChange={handleCheckboxChange}
          checked={languageCode === Japanese}
        />
        <span className="slider" />
      </label>
      <label className="language-label">
        &nbsp;
        {strings.japanese}
      </label>
      <Alert variant="info" className="mb-0 mt-3">
        {strings.suggestionsWelcomed}
      </Alert>
    </>
  );
};

export default Settings;
