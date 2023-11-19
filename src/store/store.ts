import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    pageNumber: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
