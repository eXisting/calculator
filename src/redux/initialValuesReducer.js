import { createSlice } from '@reduxjs/toolkit';

export const initialValuesSlice = createSlice({
  name: 'initialValues',
  initialState: {
    startingSavings: "5000",
    startingAge: 25,
  },
  reducers: {
    updateStartingSavings: (state, action) => {
      state.startingSavings = action.payload;
    },
    updateStartingAge: (state, action) => {
      state.startingAge = action.payload;
    },
  },
});

export const { updateStartingSavings, updateStartingAge } = initialValuesSlice.actions;

export default initialValuesSlice.reducer;
