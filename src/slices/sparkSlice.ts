/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDefaultState, isBookmarklet, parseQueryParams } from '../helpers';
import { strings } from '../helpers/localization';
import { SparkState } from '../types';

let initialState = getDefaultState();
const params = window.location.search;

if (isBookmarklet(params)) {
  initialState = parseQueryParams(params);
} else if ('reduxState' in localStorage) {
  const local = JSON.parse(localStorage.getItem('reduxState') ?? '');
  initialState = 'crystals' in local ? local : local?.spark;
}

export const sparkSlice = createSlice({
  name: 'spark',
  initialState,
  reducers: {
    setSparkData: (state, action: PayloadAction<Partial<Omit<SparkState, 'languageCode'>>>) => ({
      ...state,
      ...action.payload,
    }),
    setLanguage: (state, action: PayloadAction<string>) => {
      state.languageCode = action.payload;
      strings.setLanguage(action.payload);
    },
  },
});

export const { setSparkData, setLanguage } = sparkSlice.actions;
