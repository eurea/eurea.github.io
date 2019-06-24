import React from 'react'
import { connect } from 'react-redux'
import { SET_LANGUAGE } from '../helpers/actions'
import { English, Japanese } from '../helpers/constants'

class Settings extends React.Component {
  handleCheckboxChange = () => {
    if (this.props.languageCode === English) {
      this.props.changeLanguage(Japanese)
    } else {
      this.props.changeLanguage(English)
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="languageSwitch">Language</label>
        <input
          type="checkbox"
          id="languageSwitch"
          onChange={this.handleCheckboxChange}
          checked={this.props.languageCode === Japanese} />
      </React.Fragment>
    )
  }
}

export default connect((state) => ({
  languageCode: state.languageCode
}), (dispatch) => ({
  changeLanguage: (language) => dispatch({ type: SET_LANGUAGE, payload: language })
}))(Settings)
