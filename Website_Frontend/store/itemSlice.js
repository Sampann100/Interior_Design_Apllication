import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialState: (state, action) => {
      return action.payload;
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      console.log("Removing item with ID:", idToRemove);
      const itemArray = JSON.parse(JSON.stringify(state));
      return state.filter((item) => item.itemId._id !== idToRemove);
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice;