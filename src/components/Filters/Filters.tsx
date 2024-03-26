import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './Filters.scss';
import { client } from '../../services/httpClient';
import { CategoryType } from '../../types/categoryType';
import filterIco from "../../assets/icons/filter.svg";
import arrowIco from "../../assets/icons/arrow.svg";
import sortIco from "../../assets/icons/sort.svg";
import searchIco from "../../assets/icons/search.svg";
import classNames from 'classnames';


interface Props {
  handleSortChange: (value: string) => void;
  handleFilterChange: (value: string) => void;
  sort: string;
  handleQueryChange:(event: ChangeEvent<HTMLInputElement>) => void;
  query: string;
  filter: string[];
}

const sortVaribles = [
  {
    "title": "Старе до нового",
    "id": 1,
    "value": "idUp"
  },
  {
    "title": "Нове до старого",
    "id": 2,
    "value": "idDown"
  },
  {
    "title": "Ціна: Низька в високу",
    "id": 3,
    "value": "priceUp"
  },
  {
    "title": "Ціна: Висока в низьку",
    "id": 4,
    "value": "priceDown"
  }
]

export const Filters: React.FC<Props> = ({

  handleFilterChange,
  handleSortChange,
  handleQueryChange,
  query,
  sort, 
  filter,
}) => {

  const [category, setCategory] = useState<CategoryType[]>([]);
  const [filterActive, setFilterActive] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const [placeholder, setPlaceholder] = useState('Старе до нового');
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.get<CategoryType[]>('shop/categories/')
      .then(response => setCategory(response));
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setFilterActive(false);
    }
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setSortActive(false);
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
      <div className="filters__search grid__item--desktop-1-4 grid__item--tablet-1-3">
        <input 
          type="text" 
          className='filters__search-input'
          placeholder='Шукати' 
          value={query}
          onChange={handleQueryChange}
        />
        <img src={searchIco} alt="search" className='filters__serch-ico'/>
      </div>

      <div 
        className={classNames("filters__filter grid__item--desktop-5-6 grid__item--tablet-4-5", {
          'filters__filter--active': sortActive === true
        })} 
        ref={sortRef}
      >
        <button 
          className="filters__filter-header"
          onClick={() => setSortActive(!sortActive)}
        >
          <div className="filters__filter-left">
            <img src={sortIco} alt="filter" />
            <p className="filters__filter-title">
              Сорт
            </p>
            <p className="filters__filter-placeholder">
              {placeholder}
            </p>
          </div>
          <img 
            src={arrowIco} 
            alt="arrow" 
            className={classNames("filters__filter-arrow", {
              "filters__filter-arrow-active": sortActive === false 
            })} 
          />
        </button>

        {sortActive === true && (
          <div className="filters__filter-list">
            {sortVaribles.map(el =>
              <button
                key={el.id} 
                onClick={() => {
                  handleSortChange(el.value)
                  setPlaceholder(el.title)
                }} 
                className={classNames('filters__filter-item', {
                  "filters__filter-item--active": sort === el.value 
                })}
              >
                {el.title}
              </button>
            )}
          </div>
        )}
      </div>

      <div 
        className={classNames("filters__filter grid__item--desktop-7-8 grid__item--tablet-5-6", {
          'filters__filter--active': filterActive=== true
        })} 
        ref={filterRef}
      >
        <button 
          className="filters__filter-header"
          onClick={() => setFilterActive(!filterActive)}
        >
          <div className="filters__filter-left">
            <img src={filterIco} alt="filter" />
            <p className="filters__filter-title">Фільтер</p>
          </div>
          <img src={arrowIco} alt="" className={classNames("filters__filter-arrow", { "filters__filter-arrow-active": filterActive === false })} />
        </button>

        {filterActive === true && (
          <div className="filters__filter-list">
            {category.map(el =>
              <button key={el.id} onClick={() => handleFilterChange(el.id.toString())} className={classNames('filters__filter-item', { "filters__filter-item--active": filter.includes(el.id.toString()) })}>
                {el.title}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
