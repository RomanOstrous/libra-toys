import React, { useState } from 'react';
import './ProductCard.scss';
import { Product } from '../../types/ProductType';
import { Link } from 'react-router-dom';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';
import { useAppSelector } from '../../app/hook';

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({product}) => {
  const {title, images, category, slug} = product;
  const [buttonActive, setButtonActive] = useState(false);
  const {categ} = useAppSelector(state => state.category);
  const categoryTitle = categ.find(cat => cat.id === category)?.title || '';

  return (
    <>
      <div className='product-card'>
        <button className="product-card__fav" onClick={() => setButtonActive(!buttonActive)}>
          {buttonActive
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
