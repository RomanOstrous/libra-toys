import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './Filters.scss';
import { client } from '../../services/httpClient';
import { CategoryType } from '../../types/categoryType';
import filterIco from "../../assets/icons/filter.svg";
import arrowIco from "../../assets/icons/arrow.svg";
import classNames from 'classnames';

interface Props {
  onSort: (value: string) => void;
  setSelectedFilters: React.Dispatch<React.SetStateAction<number[]>>;
  selectedFilters: number[];
}

export const Filters: React.FC<Props> = ({ onSort, setSelectedFilters, selectedFilters }) => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [filterActive, setFilterActive] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.get<CategoryType[]>('shop/categories/')
      .then(response => setCategory(response));
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value);
  };

  const handleFilterClick = (categoryId: number) => {
    setSelectedFilters((prev) => { 
      const index = prev.indexOf(categoryId);
      if (index !== -1) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setFilterActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="filters grid">
      <div className="filters__serch grid__item--desktop-1-4 grid__item--tablet-1-3">
        <input type="text" />
      </div>

      <div className="filters__sort grid__item--desktop-5-6 grid__item--tablet-4-5">
        <select name="Sort" onChange={handleSortChange}>
          <option value="">Сортувати за...</option>
          <option value="name">Назвою</option>
          <option value="name-rev">Назвою навпаки</option>
          <option value="price">Ціною</option>
          <option value="price-rev">Ціною навпаки</option>
        </select>
      </div>

      <div className="filters__category grid__item--desktop-7-8 grid__item--tablet-5-6" ref={filterRef}>
        <button 
          className="filters__category-header"
          onClick={() => setFilterActive(!filterActive)}
        >
          <div className="filters__category-left">
            <img src={filterIco} alt="filter" />
            <p className="filters__category-title">Фільтер</p>
          </div>
          <img src={arrowIco} alt="" className={classNames("filters__category-arrow", { "filters__category-arrow-active": filterActive === false })} />
        </button>

        {filterActive === true && (
          <div className="filters__category-list">
            {category.map(el =>
              <button key={el.id} onClick={() => handleFilterClick(el.id)} className={classNames('filters__category-item', { "filters__category-item--active": selectedFilters.includes(el.id) })}>
                {el.title}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
