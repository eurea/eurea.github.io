import React from 'react'
import ReactGA from 'react-ga'
import { Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/Settings.scss'
import { SET_LANGUAGE } from '../actions'
import strings from '../helpers/localization'
import { English, Japanese } from '../helpers/constants'

const Settings = () => {
  const dispatch = useDispatch()
  const languageCode = useSelector(state => state.languageCode)

  const handleCheckboxChange = () => {
    const newLanguage = languageCode === English ? Japanese : English

    dispatch({ type: SET_LANGUAGE, payload: newLanguage })
    ReactGA.event({
      category: 'Settings change',
      action: 'Language change',
      label: newLanguage
    })
  }

  return (
    <>
      <label className='language-label'>{strings.english}&nbsp;</label>
      <label className='switch'>
        <input
          type='checkbox'
          id='languageSwitch'
          onChange={handleCheckboxChange}
          checked={languageCode === Japanese}
        />
        <span className='slider' />
      </label>
      <label className='language-label'>&nbsp;{strings.japanese}</label>
      <Alert variant='info' className='mb-0 mt-3'>
        {strings.suggestionsWelcomed}
      </Alert>
    </>
  )
}

export default Settings
