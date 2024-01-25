import { configureStore } from "@reduxjs/toolkit";

// reducers
import cartReducer from "../features/cart/CartSlice.js";
import productReducer from "../features/product/ProductSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
