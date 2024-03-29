import { configureStore } from '@reduxjs/toolkit';
import authReduser from './Slices/authSlice';
import productReduser from './Slices/productSlice';
import cartReduser from './Slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReduser,
    product: productReduser,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
