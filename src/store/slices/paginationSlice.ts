import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PageNumber {
  value: number;
}

const initialState: PageNumber = {
  value: 1,
};

export const paginationSlice = createSlice({
  name: 'pageNumber',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 1) state.value -= 1;
    },
    reset: (state) => {
        state.value = 1;
      },
  },
});

export const { increment, decrement, reset } = paginationSlice.actions;

export const selectCount = (state: RootState) => state.pageNumber.value;

export default paginationSlice.reducer;
