import React from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import GithubCorner from 'react-github-corner'
import '../styles/App.scss'
import Settings from './Settings'
import strings from '../helpers/localization'
import SparkCalculator from './SparkCalculator'
import { Japanese } from '../helpers/constants'
import { SET_LANGUAGE } from '../helpers/actions'

class App extends React.Component {
  componentWillMount() {
    if (this.props.languageCode === Japanese) {
      this.props.changeLanguage(Japanese)
    }
  }

  render() {
    return (
      <div className="container mt-md-3">
        <Tabs>
          <Tab eventKey="spark" title={strings.SparkCalc}>
            <SparkCalculator language={this.props.languageCode} />
          </Tab>
          <Tab eventKey="exp" title={strings.ExpRpCalc}>
            2
          </Tab>
          <Tab eventKey="settings" title="Settings/設定">
            <Settings />
          </Tab>
        </Tabs>
        <GithubCorner
          href="https://github.com/IAmVisco/gbf-calculator"
          bannerColor="#0288D1"
          target="_blank"
          rel="noreferrer" />
      </div>
    )
  }
}

export default connect((state) => ({
  languageCode: state.languageCode
}), (dispatch) => ({
  changeLanguage: (language) => dispatch({ type: SET_LANGUAGE, payload: language })
}))(App)
