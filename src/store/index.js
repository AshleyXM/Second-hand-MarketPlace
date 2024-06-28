import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/user";
import productReducer from "./modules/product";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
