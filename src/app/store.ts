import { configureStore } from '@reduxjs/toolkit';
import authReduser from './Slices/authSlice';
import productReduser from './Slices/productSlice';

const store = configureStore({
  reducer: {
    auth: authReduser,
    product: productReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
