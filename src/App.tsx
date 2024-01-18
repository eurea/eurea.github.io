import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import GithubCorner from 'react-github-corner';
import { ExperienceCalculator } from './components/ExperienceCalculator';
import { Settings } from './components/Settings';
import { SparkCalculator } from './components/SparkCalculator';
import { Language } from './helpers/constants';
import { strings } from './helpers/localization';

import './styles/App.scss';
import { setLanguage } from './slices/sparkSlice';
import { useAppDispatch, useAppSelector } from './store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector((state) => state.spark.languageCode);

  if (languageCode === Language.Japanese) {
    dispatch(setLanguage(Language.Japanese));
  }

  return (
    <div className="container mt-md-3">
      <Tabs id="menu-tabs" defaultActiveKey="spark" unmountOnExit>
        <Tab eventKey="spark" title={strings.SparkCalc}>
          <SparkCalculator />
        </Tab>
        <Tab eventKey="exp" title={strings.ExpRpCalc}>
          <ExperienceCalculator />
        </Tab>
        <Tab eventKey="settings" title="Settings/設定">
          <Settings />
        </Tab>
      </Tabs>
      <GithubCorner
        href="https://github.com/eurea/eurea.github.io"
        bannerColor="#0288D1"
        target="_blank"
        rel="noreferrer"
      />
    </div>
  );
};
