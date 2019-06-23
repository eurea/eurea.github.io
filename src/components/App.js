import React from 'react'
import '../styles/App.scss'
import strings from '../helpers/localization'
import SparkCalculator from './SparkCalculator'
import { SET_LANGUAGE } from '../helpers/actions'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import GithubCorner from 'react-github-corner'

class App extends React.Component {
  componentWillMount() {
    if (this.props.languageCode === 'jp') {
      this.props.changeLanguage('jp')
    }
  }

  swapLang = (e) => {
    e.preventDefault()
    if (this.props.languageCode === 'en') {
      this.props.changeLanguage('jp')
    } else {
      this.props.changeLanguage('en')
    }
  }

  render() {
    return (
      <div className="container mt-md-3">
        <Tabs>
          <Tab eventKey="spark" title={strings.SparkCalc}>
            <SparkCalculator />
          </Tab>
          <Tab eventKey="exp" title={strings.RpCalc}>
            2
          </Tab>
          <Tab eventKey="settings" title="Settings/設定">
            3
          </Tab>
        </Tabs>
        <GithubCorner
          href="https://github.com/IAmVisco/gbf-calculator"
          bannerColor="#0288D1"
          target="_blank" />
      </div>
    )
  }
}

export default connect((state) => ({
  languageCode: state.languageCode
}), (dispatch) => ({
  changeLanguage: (language) => dispatch({ type: SET_LANGUAGE, payload: language })
}))(App)
