import React, { useState } from 'react';
import '../../styles/style/PasswordReset.scss';
import classNames from 'classnames';
import { client } from '../../services/httpClient';


export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState('');
  
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(true);

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
        <div className="password-reset__container grid__item--desktop-3-6 grid__item--tablet-2-5">
          <p className='password-reset__title'>Відновлення паролю</p>

          <p className='password-reset__info'>
            Для відновлення парою введи свою почту, на неї ми відправимо посилання за яким ти зможеш перейти та створити новий пароль.
            Прибуття може зайняти хвилину.
          </p>
          
          <div className="password-reset__box">
            <p className='password-reset__text'>
              Пошта
            </p>

            <input
              className={classNames('password-reset__input', {
                'password-reset__input--is-danger': hasEmailError,
                'password-reset__input--is-ok': !hasEmailError && email
              })}
              name="email" 
              placeholder="Введи свою почту"
              autoComplete='off'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {hasEmailError ? (
              <p className='password-reset__input-error'>{hasEmailError}</p>
            ) : (
              <p className='password-reset__input-noerror'></p>
            )}
          </div>


          <button className="password-reset__button" disabled={disable} onClick={handleClick}>
            {loader ? 'Відправка...' : 'Відправити'}
          </button>
          
          {message ? (
              <p className='password-reset__input-error'>{message}</p>
            ) : (
              <p className='password-reset__input-noerror'></p>
            )}
        </div>
      </div>
  )
}
