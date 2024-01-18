import { configureStore, createSelector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sparkSlice } from './slices/sparkSlice';

export const store = configureStore({
  reducer: { spark: sparkSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const selectCrystals = (state: RootState) => state.spark.crystals;
const selectSingleTickets = (state: RootState) => state.spark.singleTickets;
const selectGrandTickets = (state: RootState) => state.spark.grandTickets;

export const selectSparkState = createSelector(
  [selectCrystals, selectSingleTickets, selectGrandTickets],
  (crystals, singleTickets, grandTickets) => ({
    crystals,
    singleTickets,
    grandTickets,
  }),
);
