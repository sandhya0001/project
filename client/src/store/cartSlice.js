import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const event = action.payload;
      state.push(event);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const newState = state.filter(
        (event) => event._id !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
