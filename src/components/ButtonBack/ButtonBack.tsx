import React, { FC } from 'react';
import './ButtonBack.scss';
import Back from '../../assets/icons/buttonBack.svg';
import { useNavigate } from "react-router-dom";

type Props = {
  text: string,
}

const ButtonBack:FC<Props> = ({text}) => {
  const navigate = useNavigate();

  return (
    <div className="button-back">
      <button className="button-back__back" onClick={() => navigate(-1)}>
        <img src={Back} alt="back"/>
      </button>
      <p className="button-back__title">{text}</p>
    </div>
  )
}

export default ButtonBack
