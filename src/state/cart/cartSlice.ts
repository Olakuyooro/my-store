import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  image: string;
  price: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      } 
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state)=>{
      state.items.splice(0, state.items.length);
    }
  },
});

export const { addToCart, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
