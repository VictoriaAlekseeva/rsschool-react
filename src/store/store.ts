import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/paginationSlice';
import searchReduser from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    pageNumber: counterReducer,
    search: searchReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
