import React, { useCallback, useEffect, useState } from 'react';
import './NewPochta.scss';
import { debounce } from 'lodash';
import arrow from '../../assets/icons/arrow.svg';
import axios from 'axios';
import classNames from 'classnames';

const NewPochta = () => {
  const [phone, setPhone] = useState(sessionStorage.getItem('phone') || '');
  const [city, setCity] = useState(sessionStorage.getItem('city') || '');
  const [warehouse, setWarehouse] = useState(sessionStorage.getItem('warehouse') || '');
  const [optionsCity, setoptionsCity] = useState<string[]>([]);
  const [optionsWarehouse, setoptionsWarehouse] = useState<string[]>([]);
  const [button, setButton] = useState(false);

  const saveToSessionStorage = useCallback(() => {
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('warehouse', warehouse);
  }, [phone, city, warehouse]);

  useEffect(() => {
    saveToSessionStorage();
  }, [saveToSessionStorage]);

  const debouncedSearchCity = useCallback(
    debounce(async (text: string) => {
      try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: '58e6d3503795f576e4c10b198a4b5bea',
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {
            FindByString: text,
          },
        });

        if (response.data.success) {
          const cities = response.data.data.map((city: any) => city.Description);
          setoptionsCity(cities);
        } else {
          console.error('Помилка отримання даних про населені пункти:', response.data.errors);
        }
      } catch (error) {
        console.error('Помилка:', error);
      }
    }, 1000), 
    []
  );

  const debouncedSearchWarehouse = useCallback(
    debounce(async (text: string) => {
      try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: '58e6d3503795f576e4c10b198a4b5bea',
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityName: city,
            FindByString: text,
          },
        });

        if (response.data.success) {
          const branches = response.data.data.map((branch: any) => branch.Description);
          setoptionsWarehouse(branches);
        } else {
          console.error('Помилка отримання даних про відділення:', response.data.errors);
        }
      } catch (error) {
        console.error('Помилка:', error);
      }
    }, 1000), 
    [city]
  );

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setPhone(newText);
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCity(newText);
    debouncedSearchCity(newText);
  };

  const handleSelectCity = (option: string) => {
    setCity(option);
    setoptionsCity([]);
    setWarehouse('');
    setoptionsWarehouse([]);
  };


  const handleChangeWarehouse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setWarehouse(newText);
    debouncedSearchWarehouse(newText);
  };

  const handleSelectWarehouse = (option: string) => {
    setWarehouse(option);
    setoptionsWarehouse([]);
  };

  return (
    <div className="newp">
      <button className="newp__select" onClick={() => setButton(!button)}>
        <p className="newp__title">Доставка Новою Поштою</p>
        <img 
          src={arrow} alt=""
          className={classNames("newp__arrow", {
              "newp__arrow-active": button === false 
            })} />
      </button>
      

        <div className={`newp__info ${button === true ? 'newp__info--visible' : ''}`}>
          <div className="newp__box">
            <p className="newp__text">
              Номер телефону 
              <span style={{color: '#DD2525'}}>*</span>
            </p>
            <input 
              className="newp__input"
              type="text" 
              name="телефон" 
              value={phone}
              onChange={handleChangePhone}
              placeholder='Введи свій телефон'
              autoComplete='off'
            />
          </div>

          <div className="newp__container">
            <div className="newp__box">
              <p className="newp__text">
                Місто
                <span style={{color: '#DD2525'}}>*</span>
              </p>
              <input
                autoComplete='off'
                className="newp__input"
                type="text"
                value={city}
                name="населений пункт" 
                onChange={handleChangeCity}
                placeholder="Введи своє місто"
                onBlur={() => setTimeout(() => {
                  setoptionsCity([]);
                }, 100)}
              />

              <div className="newp__options">
                <ul className="newp__options-list">
                  {optionsCity.map((option, index) => (
                    <li className="newp__option" key={index} onClick={() => handleSelectCity(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="newp__box">
              <p className="newp__text">
                Відділення пошти 
                <span style={{color: '#DD2525'}}>*</span>
              </p>
              <input
                className="newp__input"
                type="text"
                value={warehouse}
                name="відділення"
                autoComplete='off' 
                onChange={handleChangeWarehouse}
                onFocus={handleChangeWarehouse}
                placeholder="Введи своє відділення"
                onBlur={() => setTimeout(() => {
                  setoptionsWarehouse([]);
                }, 100)}
              />

              <div className="newp__options">
                <ul className="newp__options-list">
                  {optionsWarehouse.map((option, index) => (
                    <li className="newp__option" key={index} onClick={() => handleSelectWarehouse(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default NewPochta
