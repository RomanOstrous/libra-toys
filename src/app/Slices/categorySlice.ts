import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../../services/getCategory';
import { CategoryType } from '../../types/categoryType';

type ProductState = {
  categ: CategoryType[];
  load: boolean;
  error: string;
}

const initialState: ProductState = {
  categ: [],
  load: false,
  error: ''
}

export const initCategory = createAsyncThunk('category/load', () => getCategories());

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initCategory.pending, (state) => {
        state.load = true;
        state.error = '';
      })
      .addCase(initCategory.fulfilled, (state, action) => {
        state.load = false;
        state.categ = action.payload;
      })
      .addCase(initCategory.rejected, (state) => {
        state.load = false;
        state.error = 'Помилка завантаження';
      });
  },
});

export const { actions } = categorySlice;
export default categorySlice.reducer;
