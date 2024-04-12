import React, { useState } from 'react';
import './BuyPage.scss';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import NewPochta from '../../components/NewPochta/NewPochta';
import { useAppSelector } from '../../app/hook';
import Cookies from 'js-cookie';
import axios from 'axios';


const BuyPage = () => {
  const { product } = useAppSelector(state => state.product);
  const { cart } = useAppSelector(state => state.cart);
  const last = sessionStorage.getItem('last');
  const first = sessionStorage.getItem('first');
  const midle = sessionStorage.getItem('midle');
  const phone = sessionStorage.getItem('phone');
  const city = sessionStorage.getItem('city');
  const warehouse = sessionStorage.getItem('warehouse');
  const token = Cookies.get('access_token');
  const base = process.env.REACT_APP_BASE_URL;

  const [disable, setDisable] = useState(false);

  const visibleToys = product.filter(item => cart.includes(item.id));
  console.log("korzuha", cart);

  const infoObj = visibleToys.map(el => ({
    "product": el.id,
    "price": el.price,
  }));

  console.log(infoObj);

  const handleBuy = () => {
    axios.post(base + 'user/orders/', {
      "order_items": infoObj,
      "first_name": first,
      "last_name": last,
      "middle_name": midle,
      "phone_number": phone,
      "delivery_city": city,
      "delivery_warehouse": warehouse,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('все чотко', response)
    });
  }

  return (
    <div className="buy">
      <div className="buy__container container grid">
        <div className="grid__item--desktop-1-4 grid__item--tablet-1-4">
          <ButtonBack text='Придбати'/>
        </div>
        
        <div className="grid__item--desktop-1-4 grid__item--tablet-1-4">
          <NewPochta />

          <button 
            className="buy__button grid__item--desktop-1-4 grid__item--tablet-1-4"
            onClick={() => handleBuy()}
            disabled={disable}
          >
            Придбати
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyPage;
