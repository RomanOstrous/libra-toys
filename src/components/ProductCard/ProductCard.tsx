import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/ProductType';
import { Link, useNavigate } from 'react-router-dom';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { 
  addToWishlist, 
  removeFromWishlist, 
  updateWishlist 
} from "../../app/Slices/wishListSlice";

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({product}) => {
  const {title, images, category, slug} = product;
  const {categ} = useAppSelector(state => state.category);
  const {wishs} = useAppSelector(state => state.wishlist);
  const categoryTitle = categ.find(cat => cat.id === category)?.title || '';
  const dispatch = useAppDispatch();
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const ids = wishs.map(el => el.product);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (ids.includes(product.id)) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [ids, wishs]);

  console.log('fav',ids)

  const handleAddToWishlist = async (productId: number) => {
    try {
      await dispatch(addToWishlist(productId));
      dispatch(updateWishlist());
    } catch (error) {
      console.error('Помилка додавання до вішліста:', error);
    }
  };

  const handleRemoveToWishlist = async (productId: number) => {
    try {
      await dispatch(removeFromWishlist(productId));
      dispatch(updateWishlist());
    } catch (error) {
      console.error('Помилка додавання до вішліста:', error);
    }
  };

  const handleFav = (id: number) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      if (ids.includes(id)) {
        handleRemoveToWishlist(id);
      } else {
        handleAddToWishlist(id);
      }
  
      setTimeout(() => {
        dispatch(updateWishlist());
      }, 100);
    }
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
