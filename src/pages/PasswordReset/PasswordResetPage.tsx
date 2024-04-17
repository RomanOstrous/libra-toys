import React, { useState } from 'react';
import './PasswordResetPage.scss';
import classNames from 'classnames';
import { client } from '../../services/httpClient';


export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setHasEmailError('');
    setDisable(false);

    if (value.length < 0) {
      setDisable(true);
    }
  };

  const handleEmailBlur = () => {
    if (!email.includes('@')) {
      setHasEmailError('Введіть коректну адресу електронної пошти');
      setDisable(true);
    }
  };

  const handleClick = () => {
    setLoader(true);

    client.post('user/password_reset/', {
      email: email,
    })
    .then((response: any) => {
      setLoader(false);
      setMessage('Посилання успішно надіслано');
      console.log(response);
    })
    .catch((err: any) => {
      setLoader(false);
      setMessage('Сталась помилка, спробуй ще раз');
      console.log(err);
    })
  }

  return (
    <div className="password container grid">
        <div className="login__container grid__item--desktop-3-6 grid__item--tablet-2-5">
          <p className='login__title'>Відновлення паролю</p>

          <p className='login__form-text'>
            Для відновлення парою введи свою почту, на неї ми відправимо посилання за яким ти зможеш перейти та створити новий пароль.
            Прибуття може зайняти хвилину.
          </p>
          
          <p className='login__form-text'>
            Пошта
          </p>

            <input
              className={classNames('login__input', {
                'login__input--is-danger': hasEmailError,
                'login__input--is-ok': !hasEmailError && email
              })}
              name="email" 
              placeholder="Введи свою почту"
              autoComplete='off'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {hasEmailError ? (
              <p className='login__input-error'>{hasEmailError}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}


          <button className="login__button" disabled={disable} onClick={handleClick}>
            {loader ? 'Відправка...' : 'Відправити'}
          </button>
          
          {message ? (
              <p className='login__input-error'>{message}</p>
            ) : (
              <p className='login__input-noerror'></p>
            )}
        </div>
      </div>
  )
}
