import queryString from 'query-string';
import { SparkState } from '../types';

export const isBookmarklet = (params: string): boolean =>
  params.includes('crystals') || params.includes('singleTickets') || params.includes('grandTickets');

export const parseQueryParams = (params: string): SparkState => {
  const { crystals, singleTickets, grandTickets } = queryString.parse(params) as Record<string, string | null>;
  const newState = {
    languageCode: localStorage.getItem('lang') ?? 'en',
    crystals: crystals ? parseInt(crystals, 10) : 0,
    singleTickets: singleTickets ? parseInt(singleTickets, 10) : 0,
    grandTickets: grandTickets ? parseInt(grandTickets, 10) : 0,
  };

  localStorage.clear();

  return newState;
};

export const getDefaultState = (): SparkState => {
  const newState = {
    languageCode: localStorage.getItem('lang') ?? 'en',
    crystals: parseInt(localStorage.getItem('crystals') as string, 10) || 0,
    singleTickets: parseInt(localStorage.getItem('singleTickets') as string, 10) || 0,
    grandTickets: parseInt(localStorage.getItem('grandTickets') as string, 10) || 0,
  };

  return newState;
};
