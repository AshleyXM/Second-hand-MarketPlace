import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "user",
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
  },
});

const { setProductList } = productSlice.actions;

export { setProductList };

export default productSlice.reducer;
