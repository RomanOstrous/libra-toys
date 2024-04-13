import { configureStore } from '@reduxjs/toolkit';
import authReduser from './Slices/authSlice';
import productReduser from './Slices/productSlice';
import cartReduser from './Slices/cartSlice';
import categoryReduser from './Slices/categorySlice';
import wishlistReduser from './Slices/wishListSlice';
import buyReduser from './Slices/buySlice';


const store = configureStore({
  reducer: {
    auth: authReduser,
    product: productReduser,
    category: categoryReduser,
    cart: cartReduser,
    wishlist: wishlistReduser,
    buy: buyReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
