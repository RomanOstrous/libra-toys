/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import './NewPochta.scss';
import { debounce } from 'lodash';
import arrow from '../../assets/icons/arrow.svg';
import axios from 'axios';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hook';
import { actions } from '../../app/Slices/buySlice';

const NewPochta = () => {
  const [firstName, setFirstName] = useState(sessionStorage.getItem('first') || '');
  const [firstError, setFirstEror] =useState(false);

  const [lastName, setLastName] = useState(sessionStorage.getItem('last') || '');
  const [lastError, setLastEror] =useState(false);

  const [midleName, setMidleName] = useState(sessionStorage.getItem('midle') || '');
  const [midleError, setMidleEror] =useState(false);

  const [phone, setPhone] = useState(sessionStorage.getItem('phone') || '');
  const [phoneError, setPhoneEror] =useState(false);

  const [city, setCity] = useState(sessionStorage.getItem('city') || '');
  const [cityError, setCityEror] =useState(false);

  const [warehouse, setWarehouse] = useState(sessionStorage.getItem('warehouse') || '');
  const [warehouseError, setWarehouseEror] =useState(false);

  const [optionsCity, setoptionsCity] = useState<string[]>([]);
  const [optionsWarehouse, setoptionsWarehouse] = useState<string[]>([]);
  const [button, setButton] = useState(false);

  const dispatch = useAppDispatch();

  const saveToSessionStorage = useCallback(() => {
    sessionStorage.setItem('first', firstName);
    sessionStorage.setItem('last', lastName);
    sessionStorage.setItem('midle', midleName);
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('warehouse', warehouse);
  }, [phone, city, warehouse, firstName, lastName, midleName]);

  const validation = firstName && lastName && midleName && phone && city && warehouse; 

  useEffect(() => {
    saveToSessionStorage();
  }, [saveToSessionStorage]);

  useEffect(() => {
    if(validation) {
      dispatch(actions.valid())
    } else {dispatch(actions.notValid())}
  }, [validation]);

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

  const handleChangeLast = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setLastName(newText);
    setLastEror(false);
  };

  const handleChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setFirstName(newText);
    setFirstEror(false);
  };

  const handleChangeMidle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setMidleName(newText);
    setMidleEror(false);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setPhone(newText);
    setPhoneEror(false);
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCity(newText);
    debouncedSearchCity(newText);
    setCityEror(false);
  };

  const handleSelectCity = (option: string) => {
    setCity(option);
    setoptionsCity([]);
    setWarehouse('');
    setoptionsWarehouse([]);
    setCityEror(false);
  };

  const handleChangeWarehouse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setWarehouse(newText);
    debouncedSearchWarehouse(newText);
    setWarehouseEror(false);
  };

  const handleSelectWarehouse = (option: string) => {
    setWarehouse(option);
    setoptionsWarehouse([]);
    setWarehouseEror(false);

  };

  const handleLastBlur = () => {
    if (!lastName) {
      setLastEror(true);
    } 
  };

  const handleFirstBlur = () => {
    if (!firstName) {
      setFirstEror(true);
    } 
  };

  const handleMidleBlur = () => {
    if (!midleName) {
      setMidleEror(true);
    } 
  };

  const handlePhoneBlur = () => {
    if (!phone) {
      setPhoneEror(true);
    } 
  };

  const handleCityBlur = () => {
    if (!city) {
      setCityEror(true);
    } 

    setTimeout(() => {
      setoptionsCity([]);
    }, 100)
  };

  const handleWarehouseBlur = () => {
    if (!warehouse) {
      setWarehouseEror(true);
    }

    setTimeout(() => {
      setoptionsWarehouse([]);
    }, 100)
  };

  return (
    <div className="newp">
      <button className="newp__select" onClick={() => setButton(!button)}>
        <p className="newp__title">Доставка Новою Поштою</p>
        <img 
          src={arrow} alt="стрілка"
          className={classNames("newp__arrow", {
              "newp__arrow-active": button === false 
            })} />
      </button>
      
      <div className={`newp__info ${button === true ? 'newp__info--visible' : ''}`}>
        <div className="newp__box">
          <p className={`${lastError === false ? 'newp__text' : 'newp__text--red'}`}>
            Прізвище
            <span style={{color: '#DD2525'}}>*</span>
          </p>

          <input 
            className="newp__input"
            type="text" 
            name="прізвище" 
            value={lastName}
            onChange={handleChangeLast}
            placeholder='Введи своє прізвище'
            autoComplete='off'
            onBlur={() => handleLastBlur()}
          />
        </div>

        <div className="newp__box">
          <p className={`${firstError === false ? 'newp__text' : 'newp__text--red'}`}>
            Ім&apos;я
            <span style={{color: '#DD2525'}}>*</span>
          </p>

          <input 
            className="newp__input"
            type="text" 
            name="Ім'я" 
            value={firstName}
            onChange={handleChangeFirst}
            placeholder="Введи свіоє ім'я"
            autoComplete='off'
            onBlur={() => handleFirstBlur()}
          />
        </div>

        <div className="newp__box">
          <p className={`${midleError === false ? 'newp__text' : 'newp__text--red'}`}>
            Ім&apos;я по батькові
            <span style={{color: '#DD2525'}}>*</span>
          </p>

          <input 
            className="newp__input"
            type="text"
            name="ім'я по батькові"
            value={midleName}
            onChange={handleChangeMidle}
            placeholder="Введи своє ім'я по батькові"
            autoComplete='off'
            onBlur={() => handleMidleBlur()}
          />
        </div>

        <div className="newp__box">
          <p className={`${phoneError === false ? 'newp__text' : 'newp__text--red'}`}>
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
            onBlur={() => handlePhoneBlur()}
          />
        </div>

        <div className="newp__container">
          <div className="newp__box">
            <p className={`${cityError === false ? 'newp__text' : 'newp__text--red'}`}>
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
              onBlur={() => handleCityBlur()}
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
            <p className={`${warehouseError === false ? 'newp__text' : 'newp__text--red'}`}>
              Відділення 
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
              onBlur={() => handleWarehouseBlur()}
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
