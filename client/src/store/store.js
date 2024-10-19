import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";
import loggedInSlice from "./loginSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import myEventSlice from "./myEventSlice";
const store = configureStore({
  reducer: {
    events: eventSlice,
    loggedIn: loggedInSlice,
    loggedInUser: userSlice,
    cart: cartSlice,
    myEvents:myEventSlice
  },
});
export default store;
