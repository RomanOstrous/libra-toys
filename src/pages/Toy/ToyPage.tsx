import React, { useCallback, useEffect, useState } from "react";
import './ToyPage.scss';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { initProduct } from "../../app/Slices/productSlice";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { debounce } from 'lodash';
import end from '../../assets/images/End.png';
import { Filters } from "../../components/Filters/Filters";
import { useSearchParams } from "react-router-dom";

export const ToyPage = () => {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(state => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'idUp';
  const filter = searchParams.getAll('filter') || [];

  const [apliedQuery, setApliedQuery] = useState('');

  useEffect(() => {
    dispatch(initProduct());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const aplyQuery = useCallback(
    debounce(setApliedQuery, 1000),
    [],
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    aplyQuery(event.target.value);
    const params = new URLSearchParams(searchParams);
    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSearchParams(params);
  }

  const handleFilterChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    const newFilters = filter.includes(categoryId)
      ? filter.filter(fil => fil !== categoryId)
      : [...filter, categoryId];

      params.delete('filter');
      newFilters.forEach(filt => params.append('filter', filt));
      setSearchParams(params);
  };

  const copy = [...product];

  const sortedProducts = () => {
    switch (sort) {
      case 'idUp':
        return copy.sort((a, b) => a.id - b.id);
      case 'priceUp':
        return copy.sort((a, b) => a.price - b.price);
      case 'idDown':
        return copy.sort((a, b) => b.id - a.id);
      case 'priceDown':
        return copy.sort((a, b) => b.price - a.price);
      default:
        return copy;
    }
  };

  const filteredProducts = filter.length > 0
  ? sortedProducts().filter(item => filter.includes(item.category.toString())) 
  : sortedProducts();

  const visibleProducts = query
  ? filteredProducts.filter(item => item.title.toLowerCase().includes(apliedQuery.toLowerCase()))
  : filteredProducts;

  return (
    <>
      <div className="toy">
        <div className="toy__box container grid">
          <h1 className="toy__title grid__item--desktop-1-8 grid__item--tablet-1-6">Іграшки</h1>

          <div className="toy__params grid__item--desktop-1-8 grid__item--tablet-1-6">
            <Filters 
              handleSortChange={handleSortChange} 
              sort={sort}
              filter={filter}
              handleFilterChange={handleFilterChange}
              query={query}
              handleQueryChange={handleQueryChange}
            />
          </div>
          {loading && <div>Провірка загрузка</div>}
          {error && <div>Помилка {error}</div>}

          <div className="toy__toys grid__item--desktop-1-8 grid__item--tablet-1-6">
            {product && visibleProducts.map((item) => (
              <ProductCard key={item.id} product={item}/>
            ))}
          </div>

          <img className="toy__img grid__item--desktop-3-6 grid__item--tablet-2-5" src={end} alt="img" />
        </div>
      </div>
    </>
  );
};
