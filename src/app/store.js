
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";
import cartReducer from "../features/cartSlice"; 
import { orderApi } from "./api/orderApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // cart state
    [authApi.reducerPath]: authApi.reducer, // auth API
    [productApi.reducerPath]: productApi.reducer, // product API
    [orderApi.reducerPath]: orderApi.reducer, // order API
    [userApi.reducerPath]: userApi.reducer, // user API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware) 
      .concat(productApi.middleware) 
      .concat(orderApi.middleware)
      .concat(userApi.middleware), 
});
