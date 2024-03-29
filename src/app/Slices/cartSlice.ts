import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CartState = {
  cart: number[];
}

const initialState: CartState = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state.cart.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    take: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(toy => toy !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export default cartSlice.reducer;
export const { actions } = cartSlice;
