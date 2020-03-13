import queryString from 'query-string'
import { RootState } from '../store/types'

export const isBookmarklet = (params: string): boolean =>
  params.includes('crystals') || params.includes('singleTickets') || params.includes('grandTickets')

// TODO: query string parses arrays, and I have no idea how to pass type check here
export const parseQueryParams = (params: string): any => {
  const { crystals, singleTickets, grandTickets } = queryString.parse(params)
  const newState = {
    languageCode: localStorage.getItem('lang') || 'en',
    crystals: crystals || '0',
    singleTickets: singleTickets || '0',
    grandTickets: grandTickets || '0'
  }

  localStorage.clear()

  return newState
}

export const getDefaultState = (): RootState => {
  const newState = {
    languageCode: localStorage.getItem('lang') || 'en',
    crystals: localStorage.getItem('crystals') || '0',
    singleTickets: localStorage.getItem('singles') || '0',
    grandTickets: localStorage.getItem('tens') || '0'
  }

  localStorage.clear()

  return newState
}
