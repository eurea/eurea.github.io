import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultState, isBookmarklet, parseQueryParams } from './helpers';
import { strings } from './helpers/localization';
import type { SparkState } from './types';

interface SparkActions {
  setSparkData: (data: Partial<Omit<SparkState, 'languageCode'>>) => void;
  setLanguage: (code: string) => void;
}

const getInitialState = (): SparkState => {
  const params = window.location.search;
  if (isBookmarklet(params)) {
    return { ...getDefaultState(), ...parseQueryParams(params) };
  }
  return getDefaultState();
};

export const useStore = create<SparkState & SparkActions>()(
  persist(
    (set) => ({
      ...getInitialState(),
      setSparkData: (data) => set((state) => ({ ...state, ...data })),
      setLanguage: (code) => {
        set({ languageCode: code });
        strings.setLanguage(code);
      },
    }),
    {
      name: 'reduxState',
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        // Handle old Redux format where state was nested under 'spark'
        const source = (persisted as Record<string, unknown>).spark ?? persisted;
        return {
          ...current,
          ...(source as Partial<typeof current>),
        };
      },
    },
  ),
);
