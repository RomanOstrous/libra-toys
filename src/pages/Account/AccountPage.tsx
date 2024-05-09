import React, { useEffect, useState } from "react";
import LogOut from "../../components/LogOut/LogOut";
import UserInfo from "../../components/UserInfo/UserInfo";
import './Account.scss';
import Cookies from "js-cookie";
import axios from "axios";
import { OrderType } from "../../types/orderType";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useAppSelector } from "../../app/hook";
import arrow from '../../assets/icons/arrow.svg';
import classNames from "classnames";
import PasswordReset from "../../components/PasswordReset/PasswordReset";

export const AccountPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [button, setButton] = useState(false);
  const { product } = useAppSelector(state => state.product);
  const isGoogle = useAppSelector((state) => state.auth.isGoogle);
  const token = Cookies.get('access_token');
  const base = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(base + 'user/orders/',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setOrders(response.data)
    });
  },[base, token]);console.log(orders);

  return (
    <>
      <div className="account container grid">
        <ButtonBack text="Акаунт"/>
        <div className="account__container grid__item--desktop-1-4 grid__item--tablet-1-4">
          <UserInfo />
          <LogOut />

          {isGoogle === false && (
            <PasswordReset />
          )}

          <button className="account__select" onClick={() => setButton(!button)}>
            <p className="account__title">Закази</p>
            <img 
              src={arrow} alt=""
              className={classNames("account__arrow", {
                  "account__arrow-active": button === false 
                })} />
          </button>

          <div className={`account__info ${button === true ? 'account__info--visible' : ''}`}>
            {orders.length < 0 && (
              <p className="account__empty">
                Ой... А ти ще нічого( <br />
                не заказав(
              </p>
            )}
            
            {orders.map(el => (
              <div key={el.id} className="account__card">
                <p className="account__order">Заказ № {el.id}</p>
                {el.order_items.map(item => (
                  <OrderCard key={item.id} toy={product.find(el => el.id === item.product)}/>
                ))}

                <div className="account__box">
                  <p className="account__text">Номер відстеження:</p>
                  <p className="account__text" style={{color: '#196EE5'}}>{el.track_number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
