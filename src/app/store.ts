import { configureStore } from '@reduxjs/toolkit';
import authReduser from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
