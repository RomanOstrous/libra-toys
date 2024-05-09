import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  isGoogle: localStorage.getItem("isGoogle") === "true",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginGoogle: (state) => {
      state.isGoogle = true;
      localStorage.setItem("isGoogle", "true");
    },
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isGoogle = false;
      localStorage.setItem("isGoogle", "false");
      localStorage.setItem("isLoggedIn", "false");
    },
  },
});

export default authSlice.reducer;
export const { actions } = authSlice;
