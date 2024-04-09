import React, { useCallback, useState } from 'react';
import './NewPochta.scss';
import { debounce } from 'lodash';
import arrow from '../../assets/icons/arrow.svg';
import axios from 'axios';

const NewPochta = () => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [optionsCity, setoptionsCity] = useState<string[]>([]);
  const [optionsWarehouse, setoptionsWarehouse] = useState<string[]>([]);

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
    <div className="buy__newp">
      <button className="buy-form__np-select">
        <p>Доставка Новою Поштою</p>
        <img src={arrow} alt="" />
      </button>

      <p>
        Номер телефону 
        <span style={{color: '#DD2525'}}>*</span>
      </p>
      <input 
        type="text" 
        name="телефон" 
        value={phone}
        onChange={handleChangePhone}
        placeholder='Введи свій телефон'
      />

      <div>
        <div>
          <p>
            Місто
            <span style={{color: '#DD2525'}}>*</span>
            </p>
          <input
            type="text"
            value={city}
            name="населений пункт" 
            onChange={handleChangeCity}
            placeholder="Введи своє місто"
            onBlur={() => setTimeout(() => {
              setoptionsCity([]);
            }, 100)}
          />

          <div className="options-container">
            <ul className="options-list">
              {optionsCity.map((option, index) => (
                <li key={index} onClick={() => handleSelectCity(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p>
            Відділення пошти 
            <span style={{color: '#DD2525'}}>*</span>
          </p>
          <input
            type="text"
            value={warehouse}
            name="відділення" 
            onChange={handleChangeWarehouse}
            onFocus={handleChangeWarehouse}
            placeholder="Введи своє відділення"
            onBlur={() => setTimeout(() => {
              setoptionsWarehouse([]);
            }, 100)}
          />

          <div className="options-container">
            <ul className="options-list">
              {optionsWarehouse.map((option, index) => (
                <li key={index} onClick={() => handleSelectWarehouse(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export default NewPochta
