import { getDefaultState } from '../helpers';
import strings from '../helpers/localization';
import { SET_LANGUAGE, SET_SPARK_DATA } from './actions';
import { ActionTypes, RootState } from './types';

export default function (state: RootState = getDefaultState(), action: ActionTypes) {
  switch (action.type) {
    case SET_SPARK_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_LANGUAGE: {
      strings.setLanguage(action.payload);
      return {
        ...state,
        languageCode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
