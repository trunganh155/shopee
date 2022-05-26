import { createSlice } from "@reduxjs/toolkit";

const initialState = { profile: [] };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { getProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
