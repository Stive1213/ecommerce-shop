import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/types/product";

interface ProductsState {
  items: Product[];
  total: number;
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip }: { limit: number; skip: number }) => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
