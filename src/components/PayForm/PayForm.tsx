/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../styles/style/NewPochta.scss';
import arrow from '../../assets/icons/arrow.svg';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hook';
import { actions } from '../../app/Slices/buySlice';

const PayForm = () => {
  const [button, setButton] = useState(false);
  const [check, setCheck] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstError, setFirstEror] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastError, setLastEror] = useState(false);
  const [card, setCard] = useState('');
  const [cardError, setCardEror] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateEror] = useState(false);
  const [CVV, setCVV] = useState('');
  const [CVVError, setCVVEror] = useState(false);

  const validName = (name: string) => {
    return name.charAt(0) !== name.charAt(0).toUpperCase();
  };

  const dispatch = useAppDispatch();
  const validation = firstName && lastName && card && date && check === true && CVV; 

  useEffect(() => {
    if(validation) {
      dispatch(actions.valid())
    } else {dispatch(actions.notValid())}
  }, [validation]);

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

  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;

    const cardNumber = newText.replace(/\s/g, '');
    const formattedCardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();

    setCard(formattedCardNumber);
    setCardEror(false);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const cardDate = newText.replace(/\s/g, '');
    const formattedDate = cardDate.replace(/(\d{2})(?=\d{2})/g, '$1.').trim();
    setDate(formattedDate);
    setDateEror(false);
  };

  const handleChangeCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setCVV(newText);
    setCVVEror(false);
  };

  const handleLastBlur = () => {
    if (!lastName || validName(lastName)) {
      setLastEror(true);
    } 
  };

  const handleFirstBlur = () => {
    if (!firstName || validName(firstName)) {
      setFirstEror(true);
    } 
  };

  const handleCardBlur = () => {
    if (card.length < 19) {
      setCardEror(true);
    } 
  };

  const handleDateBlur = () => {
    if (date.length < 8) {
      setDateEror(true);
    } 
  };

  const handleCVVBlur = () => {
    if (CVV.length < 3) {
      setCVVEror(true);
    } 
  };

  return (
    <div className="newp">
      <button className="newp__select" onClick={() => setButton(!button)}>
        <p className="newp__title">Кредитна/Дебетова карта</p>
        <img 
          src={arrow} alt="стрілка"
          className={classNames("newp__arrow", {
              "newp__arrow-active": button === false 
            })} />
      </button>
      
      <div className={`newp__info ${button === true ? 'newp__info--visible' : ''}`}>
        <div className="newp__container">
          <div className="newp__box">
            <p className={`${firstError === false ? 'newp__text' : 'newp__text--red'}`}>
              Ім&apos;я
            </p>

            <input 
              className="newp__input"
              type="text" 
              name="Ім'я" 
              value={firstName}
              onChange={handleChangeFirst}
              placeholder="Ім'я"
              autoComplete='off'
              onBlur={() => handleFirstBlur()}
            />
          </div>

          <div className="newp__box">
            <p className={`${lastError === false ? 'newp__text' : 'newp__text--red'}`}>
              Прізвище
            </p>

            <input 
              className="newp__input"
              type="text" 
              name="прізвище" 
              value={lastName}
              onChange={handleChangeLast}
              placeholder='Прізвище'
              autoComplete='off'
              onBlur={() => handleLastBlur()}
            />
          </div>
        </div>

        <div className="newp__box">
          <p className={`${cardError === false ? 'newp__text' : 'newp__text--red'}`}>
            Номер карти
          </p>

          <input 
            className="newp__input"
            type="text"  
            name="номер карти" 
            value={card}
            maxLength={19}
            onChange={handleChangeCard}
            placeholder='0000 0000 0000 0000'
            autoComplete='off'
            onBlur={() => handleCardBlur()}
          />
        </div>

        <div className="newp__container">
          <div className="newp__box">
            <p className={`${dateError === false ? 'newp__text' : 'newp__text--red'}`}>
              Exp. Date
            </p>

            <input
              autoComplete='off'
              className="newp__input"
              type="text" 
              value={date}
              name="дата" 
              maxLength={8}
              onChange={handleChangeDate}
              placeholder="DD.MM.YY"
              onBlur={() => handleDateBlur()}
            />
          </div>

          <div className="newp__box">
            <p className={`${CVVError === false ? 'newp__text' : 'newp__text--red'}`}>
              CVV 
            </p>

            <input
              className="newp__input"
              type="password"
              value={CVV}
              name="відділення"
              autoComplete='off' 
              maxLength={3}
              onChange={handleChangeCVV}
              placeholder="CVV"
              onBlur={() => handleCVVBlur()}
            />
          </div>
        </div>

        <div className="newp__cont">
          <p className='newp__text'>
            Я прочитав та згоден-(на) з правилами купівлі та конфіденційності
          </p>

          <input
            className="newp__check"
            type="checkbox"
            checked={check}
            onChange={() => setCheck(!check)}
            placeholder="CVV"
          />
        </div>
      </div>
    </div>
  )
}

export default PayForm;
