import { SET_SPARK_DATA, SET_LANGUAGE } from '../actions'
import strings from '../helpers/localization'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SPARK_DATA: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SET_LANGUAGE: {
      strings.setLanguage(action.payload)
      return {
        ...state,
        languageCode: action.payload
      }
    }
    default: {
      return state
    }
  }
}
