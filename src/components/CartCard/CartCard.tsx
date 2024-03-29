import React, { useEffect, useState } from 'react'
import { Product } from '../../types/ProductType'
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';
import { actions } from '../../app/Slices/cartSlice';
import { useAppDispatch } from '../../app/hook';
import './CartCard.scss';

type Props = {
  toy: Product,
}

const CartCard: React.FC<Props> = ({toy}) => {
  const [materials, setMaterials] = useState<ProductDetalType>()

  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(actions.take(toy.id));
  }


  useEffect(() => {
    client.get<ProductDetalType>(`shop/products/${toy.id}`)
    .then(response => {
      setMaterials(response);
    })
    .catch(error => console.log(error))
  }, [toy.id]);
  return (
    <div className='cart'>
      <div className='cart__top'>
        <p className='cart__title'>{toy.title}</p>
        <button className='cart__button' onClick={() => handleRemove()}>X</button>
      </div>
      <div className='cart__container'>
        <img className='cart__img' src={toy.images[0].image} alt={toy.title}/>

        <div>
          <div>
            {materials?.materials.map(el => 
              <p key={el.name}>{el.name}</p>
            )}
          </div>
          <div>
            <p>Ціна:</p>
            <p>{toy.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard;
