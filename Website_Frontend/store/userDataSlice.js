import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  success: false,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.user = action.payload;
      state.success = action.payload.success;
    },
    clearProfileData: (state, action) => {
      state.userData = null;
      state.success = false;
    },
  },
});

export const userDataAction = userDataSlice.actions;
export default userDataSlice;
