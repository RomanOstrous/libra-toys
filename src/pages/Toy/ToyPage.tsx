import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { initProduct } from "../../app/Slices/productSlice";

export const ToyPage = () => {
  const dispatch = useAppDispatch();
  const {product, loading, error} = useAppSelector(state => state.product);

  useEffect(() => {
    dispatch(initProduct());
  }, [dispatch]);
  
  return (
    <>
      <h1> GalleryPage </h1>
      {loading && <div>Провірка загрузка</div>}
      {error && <div>Помилка {error}</div>}
      {console.log(product)}
      {product && product.map((item) => (
        <div key={item.id} style={{ width: '100px', height: '100px'}}>
          <h2>{item.title}</h2>
          <h2>{item.category}</h2>
          <img 
            src={item.images[0].image} 
            alt={item.title} 
            style={{ width: '100px', height: '100px'}} 
          />
        </div>
      ))}
    </>
  );
};