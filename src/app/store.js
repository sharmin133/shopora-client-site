import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
// import cartReducer from "../features/cartSlice";

// Named export
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
  },
});