import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface WishlistState {
  wishs: number[];
  isLoading: boolean;
}

const initialState: WishlistState = {
  wishs: [],
  isLoading: false,
};

const token = Cookies.get('access_token');
const base = process.env.REACT_APP_BASE_URL;

const addToWishlistOnServer = (productId: number) => {
  return axios.post(base + `user/wishlist/`, { productId }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
      throw new Error('Failed to remove product from wishlist');
    }
  });
};

const fetchWishlistFromServer = (): Promise<number[]> => {
  return axios.get(base + 'user/wishlist/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.data.wishs;
  });
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.wishs.push(productId);
      addToWishlistOnServer(productId).catch(error => {
        console.error('вішліст помилка:', error);
      });
    },

    removeFromWishlist(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.wishs = state.wishs.filter(id => id !== productId);
      removeFromWishlistOnServer(productId).catch(error => {
        console.error('вішліст помилка:', error);
      });
    },

    setWishlistLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setWishlist(state, action: PayloadAction<number[]>) {
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
    console.error('Error fetching wishlist:', error);
  } finally {
    dispatch(setWishlistLoading(false));
  }
};

export default wishlistSlice.reducer;
