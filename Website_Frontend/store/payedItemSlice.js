import { createSlice } from "@reduxjs/toolkit";

const payedItemSlice = createSlice({
  name: "payedItem",
  initialState: [],
  reducers: {
    setPayedItem: (state, action) => {
        return action.payload;
    }
  },
});

export const payedItemActions = payedItemSlice.actions;
export default payedItemSlice;