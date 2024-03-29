import React, { useEffect, useState } from 'react';
import './ToyDetalPage.scss';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';
import ButtonBack from '../../assets/icons/buttonBack.svg';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { actions } from '../../app/Slices/cartSlice';

export default function ToyDetalPage() {
  const [info, setInfo] = useState<ProductDetalType>();
  const [buttonActive, setButtonActive] = useState<boolean>();
  const { productId } = useParams();

  const { cart } = useAppSelector(state => state.cart);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId !== undefined) {
      client.get<ProductDetalType>(`shop/products/${productId}`)
        .then(response => {
          setInfo(response);
        })
        .catch(error => console.log(error));
    }

    console.log("рендер", cart);
  }, [productId, cart]);

  const handleCartButton = () => {
    if (productId && cart.includes(+productId)) {
      dispatch(actions.take(+productId));

    } else if (productId) {
      dispatch(actions.add(+productId));
    }
  };
  
  console.log("korzuha", cart);
  return (
    <>
      {info && (
        <div className='info container'>
          <div className="info__top">
            <Link to=".." className="info__back">
              <img src={ButtonBack} alt="back"/>
            </Link>
            <p className="info__title">{info.title}</p>
          </div>

          <div className="info__container">
            <div className="info__imgs grid__item--desktop-1-5">
              <img className="info__img" src={info.images[0].image} alt={info.title} />
              <div className="info__imgs-container">
                <img className="info__img-duo" src={info.images[1].image} alt={info.title} />
                <img className="info__img-duo" src={info.images[2].image} alt={info.title} />
              </div>
            </div>

            <div className="info__right grid__item--desktop-6-8">
              <div className="info__right-container">
                <p className="info__right-title">Про {info.category.title}</p>
                <p className="info__right-description">{info.description}</p>
                <div className="info__right-count">
                  <p className="info__right-title">Ціна:</p>
                  <p className="info__right-title">{info.price}₴</p>
                </div>
              </div>
              <div className="info__right-buttons">
                <button className="info__right-cart" onClick={()=> handleCartButton()}>
                  {productId && cart.includes(+productId)
                    ? <p className="info__right-fav-text">Додано в кошик</p>
                    : <p className="info__right-fav-text">Додати в кошик</p>
                  }
                </button>

                <button className="info__right-fav" onClick={() => setButtonActive(!buttonActive)}>
                  {buttonActive
                    ? <p className="info__right-fav-text">Додано в обране</p>
                    : <p className="info__right-fav-text">Додати в обране</p>
                  }
                  {buttonActive
                    ? <img className="info__right-fav-button" src={RedHeart} alt="favourite" />
                    : <img className="info__right-fav-button" src={Heart} alt="favourite" />
                  }
                </button>
              </div>
            </div>
          </div>

          <div className="info__bottom">
            <p className="info__title-list">Зріст негідника:</p>
            <ul className="info__list">
              <li className="info__list-text">{info.size} сантиметрів</li>
            </ul>
    
            <p className="info__title-list">Матеріали:</p>
            <ul className="info__list">
              {info.materials.map(item => (
                <li className="info__list-text" key={item.name}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
