import { createSlice } from '@reduxjs/toolkit';

export const graphSlice = createSlice({
  name: 'graph',
  initialState: {
    monthlySavings: 100,
  },
  reducers: {
    updateTotalSavings: (state, action) => {
      state.totalSavings = action.payload;
    },
  },
});

export const {
  updateTotalSavings,
} = graphSlice.actions;

export default graphSlice.reducer;