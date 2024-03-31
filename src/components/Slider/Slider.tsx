import React from "react";
import Slider from "react-slick";

import { ProductCard } from "../ProductCard/ProductCard";
import './Slider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  useAppSelector } from "../../app/hook";


export const SwipeToSlide = () => {

  const { product} = useAppSelector(state => state.product);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    slidesToScroll: 1,
    infinite: true,
    cssEase: "linear",
    variableWidth: true, 
  };

  return (
    <>
      { product.length > 0 && (
        <Slider {...settings}>
          {product.map((el) => 
            <div className="slider-card" key={el.id}>
              <ProductCard product={el} />
            </div>
          )}
        </Slider>
      )}
    </>
  );
};
