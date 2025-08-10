import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  success: false,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.userData = action.payload;
      state.success = true;
    },

    clearProfileData: (state) => {
      state.userData = {};
      state.success = false;
    },
  },
});

export const { setProfileData, clearProfileData } = userDataSlice.actions;
export default userDataSlice.reducer;
