import React from "react";
import './NotFound.scss';
import nf from '../../assets/images/notfound.png';
import shadow from '../../assets/images/shadow.png';
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (

      <div className="not-found">
        <div className="not-found__imgs">
          <img src={shadow} alt="not found" className="not-found__shadow"/>
          <img src={nf} alt="not found" className="not-found__img"/>
        </div>

        <div className="not-found__info">
          <p className="not-found__title">
            Дідько... Сторінку 
            <br /> 
            не знайдено
          </p>

          <div className="not-found__box">
            <p className="not-found__text">Повернутись</p>
            <Link to="/" className="not-found__link not-found__text">на головну</Link>
          </div>
        </div>
      </div>
  );
};