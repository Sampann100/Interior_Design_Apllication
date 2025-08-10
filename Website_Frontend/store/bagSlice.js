import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    addToBag: (state, action) => {
      return action.payload;
    },
    removeFromBag: (state, action) => {
      const idToRemove = action.payload;
      return state.filter((item) => item._id !== idToRemove);
    },
    clearBag: () => {
      return [];
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice;
