import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./_user";
import cartReducer from "./_cart";

export default configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
});
