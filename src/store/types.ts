import { SET_SPARK_DATA, SET_LANGUAGE } from './actions'

interface SetSparkAction {
  type: typeof SET_SPARK_DATA
  payload: object
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE
  payload: string
}

export type ActionTypes = SetSparkAction | SetLanguageAction

export interface RootState {
  languageCode: string,
  crystals: string,
  singleTickets: string
  grandTickets: string
}
