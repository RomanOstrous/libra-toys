import React from "react";
import './CartPage.scss';
import { useAppSelector } from "../../app/hook";
import CartCard from "../../components/CartCard/CartCard";

import ButtonBack from '../../assets/icons/buttonBack.svg';
import { useNavigate } from "react-router-dom";
import { SwipeToSlide } from "../../components/Slider/Slider";
import Button from '../../assets/icons/buttonBack.svg';

export const CartPage = () => {
  const { product } = useAppSelector(state => state.product);
  const { cart } = useAppSelector(state => state.cart);

  const visibleToys = product.filter(item => cart.includes(item.id));
  console.log("korzuha", cart);

  const count = visibleToys.map(item => item.price);
  const total = count.reduce((acc, item) => acc + item, 0);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
        <div className="container cart-page__container">
          <div className="cart-page__top">
            <button className="cart-page__back" onClick={() => navigate(-1)}>
              <img src={ButtonBack} alt="back"/>
            </button>
            <p className="cart-page__title">Кошик</p>
          </div>

          {cart.length > 0 ? ( 
            <>
              {visibleToys.map(el => (
                <CartCard key={el.id} toy={el}/>
              ))}

              <div className="cart-page__pay">
                <div className="cart-page__count">
                  <p className="cart-page__text">Всього:</p>
                  <p className="cart-page__text">{total}₴</p>
                </div>
                <button className="cart-page__button" onClick={() => navigate('/buy')}>
                  Придбати
                </button>
              </div>
            </>
          ) : (
        <p className="cart-page__empty">
          А тут ще нічого <br />
          не має(
        </p>
      )}
    </div>


    <div className="cart-page__slider container">
      <div className="cart-page__slider-container">
        <p className="cart-page__slider-title">
          Тобі також сподобаеться
        </p>
        <button onClick={() => navigate('/toys')} className="cart-page__slider-button">
          <img src={Button} alt="back"/>
        </button>
      </div>

        <SwipeToSlide />
      </div>
    </div>
  );
};
