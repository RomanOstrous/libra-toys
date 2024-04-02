import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/ProductType';
import { getProduct } from '../../services/getProduct';

type ProductState = {
  product: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  product: [],
  loading: false,
  error: ''
}

export const initProduct = createAsyncThunk('product/load', () => getProduct());

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initProduct.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(initProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(initProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Помилка завантаження';
      });
  },
});

export const { actions } = productSlice;
export default productSlice.reducer;
