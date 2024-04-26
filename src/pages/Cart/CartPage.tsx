import React from "react";
import './CartPage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import CartCard from "../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";
import { SwipeToSlide } from "../../components/Slider/Slider";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import Back from '../../assets/icons/buttonBack.svg';
import { actions } from "../../app/Slices/cartSlice";

export const CartPage = () => {
  const { product } = useAppSelector(state => state.product);
  const { cart } = useAppSelector(state => state.cart);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const visibleToys = product.filter(item => cart.includes(item.id));
  const count = visibleToys.map(item => item.price);
  const total = count.reduce((acc, item) => acc + item, 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(actions.clear());
  }

  return (
    <div className="cart-page">
        <div className="container cart-page__container">
          <ButtonBack text={'Кошик'}/>

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

                <div className="cart-page__buttons">
                  <button 
                    className="cart-page__button--red cart-page__button"
                    onClick={handleRemove} 
                  >
                    Очистити
                  </button>

                  <button 
                    className="cart-page__button" 
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate('/buy')
                      } else {navigate('/login')}
                    }}
                  >
                    Придбати
                  </button>
                </div>
              </div>
            </>
          ) : (
        <p className="cart-page__empty">
          А тут ще нічого <br />
          немає(
        </p>
      )}
    </div>

    <div className="cart-page__slider container">
      <div className="cart-page__slider-container">
        <p className="cart-page__slider-title">
          Тобі також сподобається
        </p>
        <button onClick={() => navigate('/toys')} className="cart-page__slider-button">
          <img src={Back} alt="back"/>
        </button>
      </div>

        <SwipeToSlide />
      </div>
    </div>
  );
};
