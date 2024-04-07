import React, { useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/ProductType';
import { Link } from 'react-router-dom';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { 
  addToWishlist, 
  removeFromWishlist, 
  setWishlistLoading, 
  setWishlist, 
  updateWishlist 
} from "../../app/Slices/wishListSlice";

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({product}) => {
  const {title, images, category, slug} = product;
  const {categ} = useAppSelector(state => state.category);
  const {fav} = useAppSelector(state => state.wishlist);
  const categoryTitle = categ.find(cat => cat.id === category)?.title || '';
  const dispatch = useAppDispatch();
  const [buttonActive, setButtonActive] = useState<boolean>(fav.includes(product.id));

  const handleFav = (id: number) => {
    if (fav.includes(id)) {
      setButtonActive(false);
      dispatch(removeFromWishlist(product.id));
      
    } else {
      setButtonActive(true);
      dispatch(addToWishlist(id));
    }

    dispatch(updateWishlist());
  };


  return (
    <>
      <div className='product-card'>
        <button className="product-card__fav" onClick={() => handleFav(product.id)}>
          {buttonActive === true
            ? <img className="product-card-fav-button" src={RedHeart} alt="favourite" />
            : <img className="product-card-fav-button" src={Heart} alt="favourite" />
          }
        </button>

        <Link to={`/toys/${slug}`} className='product-card__img'>
          <img 
            className='product-card__img'
            src={images[0].image} 
            alt={title} 
          />
          <p className='product-card__category'>{categoryTitle}</p>
          <p className='product-card__title'>{title}</p>
        </Link>
      </div>
    </>
  )
}
