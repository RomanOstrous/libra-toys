import { configureStore } from '@reduxjs/toolkit';
import authReduser from './Slices/authSlice';
import productReduser from './Slices/productSlice';
import cartReduser from './Slices/cartSlice';
import categoryReduser from './Slices/categorySlice';
import wishlistReduser from './Slices/wishListSlice';


const store = configureStore({
  reducer: {
    auth: authReduser,
    product: productReduser,
    category: categoryReduser,
    cart: cartReduser,
    wishlist: wishlistReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
