import React, { FC, useEffect, useState } from 'react';
import './OrderCard.scss';
import { Product } from '../../types/ProductType';
import { ProductDetalType } from '../../types/ProductDetalsType';
import { client } from '../../services/httpClient';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

type Props = {
  toy: Product | undefined,
}

const OrderCard: FC<Props> = ({toy}) => {
  const [materials, setMaterials] = useState<ProductDetalType | null >(null)

  useEffect(() => {
    client.get<ProductDetalType>(`shop/products/${toy?.id}`)
    .then(response => {
      setMaterials(response);
    })
    .catch(error => console.log(error))
  }, [toy?.id]);
  
  return (
    <div className='order'>
      <p className='order__title'>{toy?.title}</p>

      <div className='order__container'>
        <Link to={`/toys/${toy?.slug}`} className='order__link'>
          <img className='order__img' src={toy?.images[0].image} alt={toy?.title}/>
        </Link>
        
        <div className='order__box'>
          <p className='order__info'>Доставляється</p>
          <div className='order__materials'>
            {materials 
              ? materials.materials.map(el => 
                <p className='order__materials-item' key={el.name}>• {el.name}</p>
              ) : (
              <Loader/>
            )}
          </div>
          <div className='order__count'>
            <p className='order__count-text'>Ціна:</p>
            <p className='order__count-text'>{toy?.price}₴</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard;
