import React, { useEffect, useState } from "react";
import './ToyPage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { initProduct } from "../../app/Slices/productSlice";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import end from '../../assets/images/End.png';
import { Filters } from "../../components/Filters/Filters";

export const ToyPage = () => {
  const dispatch = useAppDispatch();
  const {product, loading, error} = useAppSelector(state => state.product);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    dispatch(initProduct());
  }, [dispatch]);
  
  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const copy = [...product];

  const sortedProducts = () => {
    switch (sortBy) {
      case 'name':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
        case 'name-rev':
          return copy.sort((a, b) => b.title.localeCompare(a.title));
        case 'price-rev':
          return copy.sort((a, b) => b.price - a.price);
      default:
        return copy;
    }
  };

  return (
    <>
      <div className="toy">
        <div className="toy__box container grid">
          <h1 className="toy__title">Іграшки</h1>

          <div className="toy__params grid__item--desktop-1-8 grid__item--tablet-1-6">
            <Filters onChange={handleSortChange}/>
          </div>
          {loading && <div>Провірка загрузка</div>}
          {error && <div>Помилка {error}</div>}

          <div className="toy__toys grid__item--desktop-1-8 grid__item--tablet-1-6">
            {product && sortedProducts().map((item) => (
              <ProductCard key={item.id} product={item}/>
            ))}
          </div>

          <img className="toy__img grid__item--desktop-3-6 grid__item--tablet-2-5" src={end} alt="img" />
        </div>
      </div>
    </>
  );
};
