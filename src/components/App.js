import React from 'react'
import '../styles/App.scss'
import strings from '../helpers/localization'
import { SET_LANGUAGE } from '../helpers/actions'
import { connect } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'
import GithubCorner from 'react-github-corner'

class App extends React.Component {
  componentWillMount() {
    if (this.props.languageCode === 'jp') {
      this.props.dispatch({ type: SET_LANGUAGE, payload: 'jp' })
    }
  }

  swapLang = (e) => {
    e.preventDefault()
    if (this.props.languageCode === 'en') {
      this.props.dispatch({ type: SET_LANGUAGE, payload: 'jp' })
    } else {
      this.props.dispatch({ type: SET_LANGUAGE, payload: 'en' })
    }
  }

  render() {
    return (
      <div className="container">
        <Tabs>
          <Tab eventKey="spark" title={strings.SparkCalc}>
            1 <button onClick={this.swapLang}>Swap langs</button>
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
}))(App)
