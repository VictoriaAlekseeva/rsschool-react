import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/paginationSlice';
import searchReducer from './slices/searchSlice';
import { beerAPI } from './services/apiServices';
import { createWrapper } from 'next-redux-wrapper';

export const createStore = () =>
  configureStore({
    reducer: {
      pageNumber: counterReducer,
      search: searchReducer,
      [beerAPI.reducerPath]: beerAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerAPI.middleware),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(createStore, { debug: true });
