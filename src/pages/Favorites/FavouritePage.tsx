import React, { useEffect } from "react";
import './FavouritePage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { 
  addToWishlist, 
  removeFromWishlist, 
  setWishlistLoading, 
  setWishlist, 
  updateWishlist 
} from "../../app/Slices/wishListSlice";

export const FavouritePage = () => {
  const {product} = useAppSelector(state => state.product);
  const {wishs} = useAppSelector(state => state.wishlist);
  const dispatch = useAppDispatch();


  console.log(wishs);

  useEffect(() => {
    dispatch(updateWishlist());
  }, [dispatch]);

  return (
    <div className="favorit">
      <div className="favorit__head">
        <button></button>
        <p>Вподобайки</p>
      </div>

      <div className="favorit__container">

      </div>
    </div>
  );
};