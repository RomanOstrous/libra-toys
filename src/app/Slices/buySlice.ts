import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  npValidate: true,
};

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    valid: (state) => {state.npValidate = false},
    notValid: (state) => {state.npValidate = true},
  },
});

export default buySlice.reducer;
export const { actions } = buySlice;