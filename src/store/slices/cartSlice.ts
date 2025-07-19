import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  img: string[];
  quantity: number;
  description: string;
  faces: string;
  country: string;
  size: string;
}

interface CartState {
  items: CartItem[];
}

const loadCartState = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("cartItems");
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
      console.error("Could not load cart state:", e);
      return [];
    }
  }
  return [];
};

const initialState: CartState = {
  items: loadCartState(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;