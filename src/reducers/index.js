import { SET_SPARK_DATA, SET_LANGUAGE } from '../helpers/actions'
import strings from '../helpers/localization'

const initialState = {
  languageCode: 'en',
  crystals: 0,
  singleTicketCount: 0,
  grandTicketCount: 0
}

export default function (state = initialState, action) {
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
