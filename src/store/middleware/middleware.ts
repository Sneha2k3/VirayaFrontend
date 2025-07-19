import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// Middleware to save cart state to localStorage
export const localStorageMiddleware: Middleware = (storeAPI) => (next) => (
  action
) => {
  const result = next(action);

  // Save state to localStorage after the action is dispatched
  const state: RootState = storeAPI.getState();
  try {
    const serializedState = JSON.stringify(state.cart.items);
    localStorage.setItem("cartItems", serializedState);
  } catch (e) {
    console.error("Could not save cart state:", e);
  }

  return result;
};
