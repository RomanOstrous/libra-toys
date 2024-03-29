import React from "react";
import { useAppSelector } from "../../app/hook";
import CartCard from "../../components/CartCard/CartCard";

export const CartPage = () => {
  const { product } = useAppSelector(state => state.product);
  const {cart} = useAppSelector(state => state.cart);

  const visibleToys = product.filter(item => cart.includes(item.id));
  console.log("korzuha", cart)
  return (
    <>
      {visibleToys.map(el => (
        <CartCard key={el.id} toy={el}/>
      ))}
    </>
  );
};
