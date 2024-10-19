import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const myEventSlice = createSlice({
  name: "myEvents",
  initialState,
  reducers: {
    addMyEvents: (state, action) => {
      return action.payload;
    },
    removeMyEvents: (state, action) => {
      return [];
    },
  },
});

export const { addMyEvents, removeMyEvents } = myEventSlice.actions;
export default myEventSlice.reducer;
