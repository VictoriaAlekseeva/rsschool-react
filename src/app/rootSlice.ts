import { createSlice } from '@reduxjs/toolkit';
import { IFormInput } from '../utils/types';

const rootSlice = createSlice({
  name: 'root',
  initialState: [] as IFormInput[],
  reducers: {
    submitControlledForm: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const rootReducer = rootSlice.reducer;
export const { submitControlledForm } = rootSlice.actions;
export default rootSlice.reducer;
