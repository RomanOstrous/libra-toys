import React, { useEffect } from "react";
import './FavouritePage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { updateWishlist } from "../../app/Slices/wishListSlice";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

export const FavouritePage = () => {
  const {product} = useAppSelector(state => state.product);
  const {wishs} = useAppSelector(state => state.wishlist);
  const dispatch = useAppDispatch();

  const ids = wishs.map(el => el.product);
  const visibleFav = product.filter(el => ids.includes(el.id));

  useEffect(() => {
    dispatch(updateWishlist());
  }, [dispatch]);
  
  console.log('віш', wishs);
  console.log('прод', product);

  return (
    <div className="favorit container">
      <ButtonBack text="Вподобайки"/>

      {wishs.length > 0 ? (
        <div className="favorit__container">
          {visibleFav.map(el =>
            <ProductCard key={el.id} product={el}/>
          )}
        </div>
      ):(
        <p className="cart-page__empty">
          А тут ще нічого <br />
          немає(
        </p>
      )}
    </div>
  );
};