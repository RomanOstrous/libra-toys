import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  npValidate: false,
  pay: false,
};

export const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    valid: (state) => {state.npValidate = false},
    notValid: (state) => {state.npValidate = true},
    payOk: (state) => {state.pay = true},
    payNot: (state) => {state.pay = false},
  },
});

export default buySlice.reducer;
export const { actions } = buySlice;