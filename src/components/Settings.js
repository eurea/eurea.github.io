import React from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import '../styles/Settings.scss'
import strings from '../helpers/localization'
import { SET_LANGUAGE } from '../helpers/actions'
import { English, Japanese } from '../helpers/constants'

class Settings extends React.Component {
  handleCheckboxChange = () => {
    const { changeLanguage, languageCode } = this.props
    const newLanguage = languageCode === English ? Japanese : English

    changeLanguage(newLanguage)
    ReactGA.event({
      category: 'Settings change',
      action: 'Language change',
      label: newLanguage
    })
  }

  render() {
    return (
      <React.Fragment>
        <label className="language-label">{strings.english}&nbsp;</label>
        <label className="switch">
          <input
            type="checkbox"
            id="languageSwitch"
            onChange={this.handleCheckboxChange}
            checked={this.props.languageCode === Japanese} />
          <span className="slider" />
        </label>
        <label className="language-label">&nbsp;{strings.japanese}</label>
        <Alert variant="info" className="mb-0 mt-3">
          {strings.suggestionsWelcomed}
        </Alert>
      </React.Fragment>
    )
  }
}

export default connect((state) => ({
  languageCode: state.languageCode
}), (dispatch) => ({
  changeLanguage: (language) => dispatch({ type: SET_LANGUAGE, payload: language })
}))(Settings)
