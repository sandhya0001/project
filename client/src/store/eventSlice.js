import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    addEvents: (state, action) => {
      return action.payload;
    },
    removeEvent: (state, action) => {
      state = state.filter((event) => event.id !== action.payload);
    },
  },
});

export const { addEvent, removeEvent, addEvents } = eventSlice.actions;
export default eventSlice.reducer;
