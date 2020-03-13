import React from 'react'
import ReactGA from 'react-ga'
import { Tab, Tabs } from 'react-bootstrap'
import GithubCorner from 'react-github-corner'
import { useSelector, useDispatch } from 'react-redux'
import './styles/App.scss'
import { RootState } from './store/types'
import { SET_LANGUAGE } from './store/actions'
import Settings from './components/Settings'
import strings from './helpers/localization'
import { Japanese } from './helpers/constants'
import SparkCalculator from './components/SparkCalculator'
import ExperienceCalculator from './components/ExperienceCalculator'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const languageCode = useSelector((state: RootState) => state.languageCode)

  if (languageCode === Japanese) {
    dispatch({ type: SET_LANGUAGE, payload: Japanese })
  }

  const handleTabSelect = (tabKey: string) => {
    ReactGA.modalview(tabKey)
  }

  return (
    <div className='container mt-md-3'>
      <Tabs id='menu-tabs' defaultActiveKey='spark' onSelect={handleTabSelect}>
        <Tab eventKey='spark' title={strings.SparkCalc}>
          <SparkCalculator language={languageCode} />
        </Tab>
        <Tab eventKey='exp' title={strings.ExpRpCalc}>
          <ExperienceCalculator language={languageCode} />
        </Tab>
        <Tab eventKey='settings' title='Settings/設定'>
          <Settings />
        </Tab>
      </Tabs>
      <GithubCorner
        href='https://github.com/eurea/eurea.github.io'
        bannerColor='#0288D1'
        // @ts-ignore
        target='_blank'
        rel='noreferrer'
      />
    </div>
  )
}

export default App
