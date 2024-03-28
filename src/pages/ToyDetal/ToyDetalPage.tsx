import React, { useEffect, useState } from 'react';
import './ToyDetalPage.scss';
import { useParams } from 'react-router-dom';
import { client } from '../../services/httpClient';
import { ProductDetalType } from '../../types/ProductDetalsType';
import ButtonBack from '../../assets/icons/buttonBack.svg';
import Heart from '../../assets/icons/heart.svg';
import RedHeart from '../../assets/icons/heartfilled.svg';

export default function ToyDetalPage() {
  const [info, setInfo] = useState<ProductDetalType>();
  const [buttonActive, setButtonActive] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    client.get<ProductDetalType>(`shop/products/${productId}`)
    .then(response => setInfo(response))
    .catch(error => console.log(error))
    .finally()
  }, [productId]);

  console.log(info)

  return (
    <>
      {info && (
        <div className='info container'>
          <p className="info__title">{info.title}</p>

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
                <p className="info__right-title">Ціна: {info.price}₴</p>
              </div>
              <div className="info__right-buttons">
                <button className="info__right-cart">Додати в кошик</button>
                <button className="info__right-fav" onClick={() => setButtonActive(!buttonActive)}>
                  <p className="info__right-fav-text">Додати в обране</p>
                  {buttonActive
                    ? <img className="info__right-fav-button" src={RedHeart} alt="favourite" />
                    : <img className="info__right-fav-button" src={Heart} alt="favourite" />
                  }
                </button>
              </div>
            </div>
          </div>

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
      )
        
      }
    </>
  )
}
