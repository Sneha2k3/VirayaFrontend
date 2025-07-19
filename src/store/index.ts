import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { localStorageMiddleware } from './middleware/middleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;