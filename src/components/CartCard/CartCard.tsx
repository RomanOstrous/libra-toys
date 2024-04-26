import React, { useEffect, useState } from 'react'
import { Product } from '../../types/ProductType'
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';
import { actions } from '../../app/Slices/cartSlice';
import { useAppDispatch } from '../../app/hook';
import './CartCard.scss';
import { Link } from 'react-router-dom';
import Close from "../../assets/icons/cross.svg";
import { Loader } from '../Loader/Loader';

type Props = {
  toy: Product,
}

const CartCard: React.FC<Props> = ({toy}) => {
  const [materials, setMaterials] = useState<ProductDetalType | null >(null)
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
      <div className='cart__top-mob'>
        <p className='cart__title'>{toy.title}</p>
        <button className='cart__button' onClick={() => handleRemove()}>
          <img src={Close} alt="" />
        </button>
      </div>
      <div className='cart__container'>
        <Link to={`/toys/${toy.slug}`} className='cart__link'>
          <img className='cart__img' src={toy.images[0].image} alt={toy.title}/>
        </Link>
        

        <div className='cart__box'>
          <div className='cart__top-pc'>
            <p className='cart__title'>{toy.title}</p>
            <button className='cart__button' onClick={() => handleRemove()}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div className='cart__materials'>
            {materials 
              ? materials.materials.map(el => 
                <p className='cart__materials-item' key={el.name}>• {el.name}</p>
              ) : (
              <Loader/>
            )}
          </div>
          <div className='cart__count'>
            <p className='cart__count-text'>Ціна:</p>
            <p className='cart__count-text'>{toy.price}₴</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard;
