import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { WishType } from '../../types/wishType';

interface WishlistState {
  wishs: WishType[];
  isLoading: boolean;
}

const initialState: WishlistState = {
  wishs: [],
  isLoading: false,
};

const token = Cookies.get('access_token');
const base = process.env.REACT_APP_BASE_URL;

const addToWishlistOnServer = (productId: number) => {
  return axios.post(base + `user/wishlist/`, {"product": productId}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(response => response.data);
};

const removeFromWishlistOnServer = (productId: number) => {
  return axios.delete(base + `user/wishlist/${productId}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    if (!response.data.ok) {
      throw new Error('Не видалилось');
    }
  });
};

const fetchWishlistFromServer = (): Promise<WishType[]> => {
  return axios.get(base + 'user/wishlist/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.data;
  });
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (productId) {
        addToWishlistOnServer(productId)
        .catch(error => {
          console.error('вішліст помилка:', error);
        });
      }
    },

    removeFromWishlist(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (productId) {
        removeFromWishlistOnServer(productId)
        .catch(error => {
          console.error('вішліст помилка:', error);
        });
      }
    },

    setWishlistLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setWishlist(state, action: PayloadAction<WishType[]>) {
      state.wishs = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlistLoading, setWishlist } = wishlistSlice.actions;

export const updateWishlist = () => async (dispatch: Dispatch) => {
  dispatch(setWishlistLoading(true));
  try {
    const wishlist = await fetchWishlistFromServer();
    dispatch(setWishlist(wishlist));
  } catch (error) {
    console.error('Помилка загрузки вішліста:', error);
  } finally {
    dispatch(setWishlistLoading(false));
  }
};

export default wishlistSlice.reducer;
