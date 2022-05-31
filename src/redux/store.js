import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./_profile_slice";
import userReducer from './_user';

export default configureStore({
  reducer: {
    profileReducer,
    userReducer,
  },
});
