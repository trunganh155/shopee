import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./_profile_slice";

export default configureStore({
  reducer: {
    profileReducer,
  },
});
