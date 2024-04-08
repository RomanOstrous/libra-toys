import React from 'react';
import arrow from '../../assets/icons/arrow.svg';

const BuyPage = () => {
  return (
    <div className="buy">
      <div className="buy__head">
        <button className="buy__head-button">ctrilka</button>
        <p className="buy__head-title">Придбати</p>
      </div>

      <div className="buy__newp">
        <button className="buy-form__np-select">
          <p>Доставка Новою Поштою</p>
          <img src={arrow} alt="" />
        </button>

        <p>Номер телефону*</p>
        <input type="text" name="телефон" />

        <div>
          <p>Місто*</p>
          <input type="text" name="місто" />

          <p>Відділення пошти*</p>
          <input type="text" name="відділення" />
        </div>
      </div>
    </div>
  )
}

export default BuyPage
