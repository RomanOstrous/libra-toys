import React, { FC } from 'react';
import './ButtonBack.scss';
import Back from '../../assets/icons/buttonBack.svg';
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  text: string,
}

const ButtonBack:FC<Props> = ({text}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === "/account") {
      navigate('/')
    } else navigate(-1);
  }

  return (
    <div className="button-back">
      <button className="button-back__back" onClick={handleBack}>
        <img src={Back} alt="back"/>
      </button>
      <p className="button-back__title">{text}</p>
    </div>
  )
}

export default ButtonBack
