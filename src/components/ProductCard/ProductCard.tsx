import React from 'react';
import './ProductCard.scss';
import { Product } from '../../types/ProductType';

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({product}) => {
  const {title,category,images,price} = product;
  return (
    <>
      <div className='product-card'>
        <p className='product-card__category'>{category}</p>
        <img 
          className='product-card__img'
          src={images[0].image} 
          alt={title} 
        />
        <p className='product-card__title'>{title}</p>

        <p className='product-card__title'>{price}</p>
      </div>
    </>
  )
}
