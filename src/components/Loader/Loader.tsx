import React from "react";
import './Loader.scss';

import Load from '../../assets/icons/Loader.png';

export const Loader = () => {
  return (
    <>
      <div className="loader">
        <img src={Load} alt="" className="loader__img" />
      </div>
    </>
  );
};