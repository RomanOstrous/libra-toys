import React, { useEffect } from "react";
import './CartPage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import CartCard from "../../components/CartCard/CartCard";
import { initProduct } from "../../app/Slices/productSlice";

export const CartPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initProduct());
  }, [dispatch]);

  const { product } = useAppSelector(state => state.product);
  const {cart} = useAppSelector(state => state.cart);

  const visibleToys = product.filter(item => cart.includes(item.id));
  console.log("korzuha", cart);
  
  return (
    <div className="cart-page">
      <div className="container cart-page__container">
        {visibleToys.map(el => (
          <CartCard key={el.id} toy={el}/>
        ))}
      </div>
    </div>
  );
};
